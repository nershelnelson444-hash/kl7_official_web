import React from 'react';

/**
 * Same arrow path already used in StretchButton.tsx. Reused here (not a new
 * icon design) so the trailing-arrow Button pattern is consistent everywhere.
 */
export default function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  );
}