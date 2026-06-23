import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

export interface ButtonProps {
  variant?: 'primary' | 'inverse';
  asLink?: boolean;
  to?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /** Set true for filter/tag pills that shouldn't show the trailing arrow circle. */
  hideIcon?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | React.MouseEventHandler<HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  asLink = false,
  to,
  children,
  icon,
  iconPosition = 'right',
  hideIcon = false,
  className = '',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseClass = variant === 'inverse' ? 'btn-inverse' : 'btn-primary';
  const combinedClass = `${baseClass} ${className}`;

  // Button.tsx already accepted an `icon` prop but nothing ever passed one,
  // so every button site-wide was rendering text-only. Default to the
  // standard trailing-arrow circle (styled in index.css as .btn-icon)
  // unless explicitly hidden (e.g. filter pills) or overridden.
  const resolvedIcon = hideIcon ? null : icon ?? (
    <span className="btn-icon">
      <ArrowIcon size={14} />
    </span>
  );

  const content = (
    <span className="btn-content">
      {iconPosition === 'left' && resolvedIcon}
      {children}
      {iconPosition === 'right' && resolvedIcon}
    </span>
  );

  if (asLink && to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClass} type={type} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} disabled={disabled}>
      {content}
    </button>
  );
}