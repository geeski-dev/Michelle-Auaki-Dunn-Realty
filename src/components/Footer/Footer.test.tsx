import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { agent, brokerage } from '@/content/site';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows the brokerage name adjacent to contact info', () => {
    render(<Footer />);
    expect(screen.getByText(brokerage.name)).toBeInTheDocument();
  });

  it('shows the FL license number', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(agent.licenseNumber))).toBeInTheDocument();
  });

  it('shows the full legally licensed name', () => {
    render(<Footer />);
    expect(screen.getAllByText(new RegExp(agent.legalName)).length).toBeGreaterThan(0);
  });

  it('shows the Equal Housing Opportunity and REALTOR® marks', () => {
    render(<Footer />);
    expect(screen.getByText(/Equal Housing Opportunity/i)).toBeInTheDocument();
    expect(screen.getAllByText(/REALTOR/).length).toBeGreaterThan(0);
  });
});
