/**
 * Contact form endpoint for the Aukai Dunn landing page.
 *
 * Cloudflare Pages Function (functions/api/contact.ts -> POST /api/contact).
 * Pages Functions only run JavaScript/TypeScript — this replaces
 * api/contact.py, which targeted Vercel's Python runtime and cannot run
 * here. See https://developers.cloudflare.com/pages/functions/ for the
 * routing/handler conventions this file follows.
 *
 * Phase 1 scope: validate the payload, reject honeypot-filled submissions,
 * apply a best-effort in-memory rate limit, and log the lead. No database,
 * no outbound notification yet — see the TODO below.
 */

import type { PagesFunction } from '@cloudflare/workers-types';

type Intent = 'buying' | 'selling' | 'just-looking';

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  intent: Intent;
  message: string;
  /** Honeypot: real visitors never see or fill this field in. */
  company: string;
};

const INTENTS: Intent[] = ['buying', 'selling', 'just-looking'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Best-effort only, and weaker here than a typical server: Workers isolates
// are spun up and torn down per request across a globally distributed edge
// network, so this in-memory map often won't even persist between two
// requests from the same visitor. Fine as a phase-1 stopgap against basic
// abuse; a durable store (Cloudflare KV or Durable Objects) would be needed
// for a real guarantee.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestLog.get(ip) ?? []).filter((timestamp) => timestamp >= windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export type ParseResult = { ok: true; payload: ContactPayload } | { ok: false; errors: string[] };

export function parseContactPayload(value: unknown): ParseResult {
  if (!isRecord(value)) {
    return { ok: false, errors: ['request body must be a JSON object'] };
  }

  const errors: string[] = [];

  const name = typeof value.name === 'string' ? value.name.trim() : '';
  if (!name || name.length > 200) {
    errors.push('"name" must be a non-empty string up to 200 characters');
  }

  const email = typeof value.email === 'string' ? value.email.trim() : '';
  if (!EMAIL_PATTERN.test(email)) {
    errors.push('"email" must be a valid email address');
  }

  const phone = typeof value.phone === 'string' ? value.phone.trim() : '';
  if (phone.length > 40) {
    errors.push('"phone" must be 40 characters or fewer');
  }

  const intent = typeof value.intent === 'string' ? value.intent : '';
  if (!INTENTS.includes(intent as Intent)) {
    errors.push(`"intent" must be one of ${INTENTS.join(', ')}`);
  }

  const message = typeof value.message === 'string' ? value.message.trim() : '';
  if (!message || message.length > 5000) {
    errors.push('"message" must be a non-empty string up to 5000 characters');
  }

  const company = typeof value.company === 'string' ? value.company : '';

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    payload: { name, email, phone, intent: intent as Intent, message, company },
  };
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const onRequestPost: PagesFunction = async (context) => {
  const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';

  if (isRateLimited(ip)) {
    return jsonResponse({ ok: false, error: 'rate_limited' }, 429);
  }

  let data: unknown;
  try {
    data = await context.request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  const result = parseContactPayload(data);
  if (!result.ok) {
    return jsonResponse({ ok: false, error: 'invalid_payload', details: result.errors }, 400);
  }

  const { payload } = result;

  if (payload.company.trim()) {
    // Honeypot tripped. Report success so the bot doesn't learn it was
    // caught; do not log or process it as a real lead.
    return jsonResponse({ ok: true }, 200);
  }

  console.log('New lead:', {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    intent: payload.intent,
    ip,
  });

  // TODO: send notification (email via Resend, or SMS via Twilio) so Aukai
  // actually hears about the lead instead of it living only in the
  // Cloudflare Pages Function log.

  return jsonResponse({ ok: true }, 200);
};

export const onRequestGet: PagesFunction = async () => {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
};
