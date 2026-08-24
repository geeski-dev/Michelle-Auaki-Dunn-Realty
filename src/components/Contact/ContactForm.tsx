import { useState } from 'react';
import type { FormEvent } from 'react';
import { contact, team } from '@/content/site';

type Intent = 'buying' | 'selling' | 'just-looking';

type FormState = {
  name: string;
  email: string;
  phone: string;
  intent: Intent | '';
  message: string;
  /** Honeypot — real visitors never see or fill this in. */
  company: string;
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  intent: '',
  message: '',
  company: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setForm(INITIAL_STATE);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-seaglass-500/30 bg-seaglass-500/10 text-navy-900 rounded-2xl border p-6">
        <p className="font-semibold">Thanks — that's on its way to Aukai.</p>
        <p className="text-ink-700 mt-1">She'll get back to you as soon as she can.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative space-y-4">
        {/* Honeypot field — hidden from sighted and screen-reader users, left open for bots. */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden" tabIndex={-1}>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="name" className="text-navy-900 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="border-navy-900/20 focus-visible:outline-seaglass-600 mt-1 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-navy-900 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="border-navy-900/20 focus-visible:outline-seaglass-600 mt-1 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-navy-900 block text-sm font-medium">
            Phone <span className="text-ink-700 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="border-navy-900/20 focus-visible:outline-seaglass-600 mt-1 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2"
          />
        </div>

        <div>
          <label htmlFor="intent" className="text-navy-900 block text-sm font-medium">
            I'm...
          </label>
          <select
            id="intent"
            name="intent"
            required
            value={form.intent}
            onChange={(event) => setForm({ ...form, intent: event.target.value as Intent })}
            className="border-navy-900/20 focus-visible:outline-seaglass-600 mt-1 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="buying">Buying</option>
            <option value="selling">Selling</option>
            <option value="just-looking">Just looking</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="text-navy-900 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            className="border-navy-900/20 focus-visible:outline-seaglass-600 mt-1 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-coral-500 hover:bg-coral-600 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white transition-colors disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : "Let's talk about your move"}
        </button>

        {status === 'error' && (
          <div className="border-coral-500/40 bg-coral-500/10 text-navy-900 rounded-lg border p-4 text-sm">
            <p className="font-semibold">That didn't go through.</p>
            <p className="mt-1">
              Call or text {team.name} directly at{' '}
              <a href={team.phoneHref} className="underline">
                {team.phone}
              </a>
              {contact.email && (
                <>
                  {' '}
                  or email{' '}
                  <a href={`mailto:${contact.email}`} className="underline">
                    {contact.email}
                  </a>
                </>
              )}
              .
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
