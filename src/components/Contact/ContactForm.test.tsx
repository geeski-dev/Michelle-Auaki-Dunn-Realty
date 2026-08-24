import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }))),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /let's talk about your move/i }));

    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits to /api/contact once required fields are filled in', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Jane Buyer');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.selectOptions(screen.getByLabelText("I'm..."), 'buying');
    await user.type(screen.getByLabelText('Message'), 'Looking for a waterfront home.');

    await user.click(screen.getByRole('button', { name: /let's talk about your move/i }));

    expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }));
  });

  it('shows a phone fallback when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(null, { status: 500 }))),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Jane Buyer');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.selectOptions(screen.getByLabelText("I'm..."), 'buying');
    await user.type(screen.getByLabelText('Message'), 'Looking for a waterfront home.');
    await user.click(screen.getByRole('button', { name: /let's talk about your move/i }));

    expect(await screen.findByText(/didn't go through/i)).toBeInTheDocument();
  });
});
