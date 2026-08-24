import type { AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-coral-500 text-white hover:bg-coral-600',
  secondary: 'bg-white text-navy-900 ring-1 ring-inset ring-navy-900/15 hover:bg-sand-100',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <a
      className={`focus-visible:outline-seaglass-600 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
