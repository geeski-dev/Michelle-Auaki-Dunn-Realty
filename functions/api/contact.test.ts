import { describe, expect, it } from 'vitest';
import { parseContactPayload } from './contact';

const validPayload = {
  name: 'Jane Buyer',
  email: 'jane@example.com',
  phone: '',
  intent: 'buying',
  message: 'Looking for a waterfront home.',
  company: '',
};

describe('parseContactPayload', () => {
  it('accepts a fully-formed payload', () => {
    const result = parseContactPayload(validPayload);
    expect(result.ok).toBe(true);
  });

  it('rejects a missing name', () => {
    const result = parseContactPayload({ ...validPayload, name: '' });
    expect(result.ok).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = parseContactPayload({ ...validPayload, email: 'not-an-email' });
    expect(result.ok).toBe(false);
  });

  it('rejects an invalid intent', () => {
    const result = parseContactPayload({ ...validPayload, intent: 'curious' });
    expect(result.ok).toBe(false);
  });

  it('rejects a non-object body', () => {
    const result = parseContactPayload('not an object');
    expect(result.ok).toBe(false);
  });

  it('accepts an honeypot-filled payload as valid (rejection happens separately)', () => {
    const result = parseContactPayload({ ...validPayload, company: 'I am a bot' });
    expect(result.ok).toBe(true);
  });
});
