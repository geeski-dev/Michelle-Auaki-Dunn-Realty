"""Contact form endpoint for the Aukai Dunn landing page.

Deployed as a file-based Vercel Function (api/contact.py -> POST /api/contact),
per https://vercel.com/docs/functions/runtimes/python/api-directory — the
current docs' supported pattern for a single-file BaseHTTPRequestHandler
function, which fits a one-endpoint form handler better than a full ASGI app.

Phase 1 scope: validate the payload, reject honeypot-filled submissions,
apply a best-effort in-memory rate limit, and log the lead. No database, no
outbound notification yet — see the TODO below.
"""

from __future__ import annotations

import json
import logging
import time
from collections import defaultdict
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, ValidationError

logger = logging.getLogger("contact")
logger.setLevel(logging.INFO)

RATE_LIMIT_MAX_REQUESTS = 5
RATE_LIMIT_WINDOW_SECONDS = 10 * 60

# Best-effort only: each serverless instance has its own memory, and a cold
# start resets it. Fine as a phase-1 stopgap against basic abuse; a durable
# store (e.g. Redis/Upstash) would be needed for a real guarantee.
_request_log: dict[str, list[float]] = defaultdict(list)


class ContactPayload(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(default="", max_length=40)
    intent: Literal["buying", "selling", "just-looking"]
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot: real visitors never see or fill this field in. Any non-empty
    # value here means a bot submitted the form.
    company: str = Field(default="", max_length=200)


def _client_ip(headers: dict[str, str], fallback: str) -> str:
    forwarded_for = headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return fallback


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECONDS
    recent_requests = [t for t in _request_log[ip] if t >= window_start]
    _request_log[ip] = recent_requests
    if len(recent_requests) >= RATE_LIMIT_MAX_REQUESTS:
        return True
    recent_requests.append(now)
    return False


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status: HTTPStatus, body: dict[str, object]) -> None:
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_POST(self) -> None:  # noqa: N802 — required BaseHTTPRequestHandler name
        ip = _client_ip(dict(self.headers), self.client_address[0])

        if _is_rate_limited(ip):
            self._send_json(HTTPStatus.TOO_MANY_REQUESTS, {"ok": False, "error": "rate_limited"})
            return

        content_length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_length) if content_length else b""

        try:
            data = json.loads(raw_body or b"{}")
        except json.JSONDecodeError:
            self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "invalid_json"})
            return

        try:
            payload = ContactPayload.model_validate(data)
        except ValidationError as exc:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"ok": False, "error": "invalid_payload", "details": exc.errors()},
            )
            return

        if payload.company.strip():
            # Honeypot tripped. Report success so the bot doesn't learn it
            # was caught; do not log or process it as a real lead.
            self._send_json(HTTPStatus.OK, {"ok": True})
            return

        logger.info(
            "New lead: name=%r email=%r phone=%r intent=%r ip=%r",
            payload.name,
            payload.email,
            payload.phone,
            payload.intent,
            ip,
        )

        # TODO: send notification (email via Resend, or SMS via Twilio) so
        # Aukai actually hears about the lead instead of it living only in
        # the function log.

        self._send_json(HTTPStatus.OK, {"ok": True})

    def do_GET(self) -> None:  # noqa: N802 — required BaseHTTPRequestHandler name
        self._send_json(HTTPStatus.METHOD_NOT_ALLOWED, {"ok": False, "error": "method_not_allowed"})
