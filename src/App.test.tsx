import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { hero } from './content/site';

describe('App', () => {
  it('renders the hero headline from site content without crashing', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: new RegExp(hero.headline) }),
    ).toBeInTheDocument();
  });

  it('renders exactly one h1', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
