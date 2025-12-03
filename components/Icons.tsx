import React from 'react';

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M15.164 2.135a.75.75 0 01.436 1.295l-1.436 2.872.002.001a4.5 4.5 0 01-5.332 0l-1.436-2.872a.75.75 0 01.872-1.059l1.436 2.871a3 3 0 003.556 0l1.436-2.871a.75.75 0 01.872.208zM12 7.5a3 3 0 013 3v.755c0 .414.336.75.75.75h2.25c.414 0 .75.336.75.75v3a.75.75 0 01-1.5 0v-2.25h-1.5a3 3 0 01-3-3v-.755a1.5 1.5 0 00-3 0v.755a3 3 0 01-3 3h-1.5v2.25a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75h2.25A.75.75 0 019 11.255V10.5a3 3 0 013-3z" clipRule="evenodd" />
    <path d="M12 15a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 15zM8.25 15a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018.25 15zM15.75 15a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75z" />
  </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.315 7.584C10.545 6.354 12.555 6.354 13.785 7.584l.707.707.707-.707a2.25 2.25 0 013.182 3.182l-.707.707.707.707a2.25 2.25 0 01-3.182 3.182l-.707-.707-.707.707a2.25 2.25 0 01-3.182-3.182l.707-.707-.707-.707A2.25 2.25 0 019.315 7.584z" clipRule="evenodd" />
    </svg>
);
