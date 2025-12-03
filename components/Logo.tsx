import React from 'react';

export const TiensLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex justify-center ${className}`}>
        <svg width="140" height="50" viewBox="0 0 145 50" xmlns="http://www.w3.org/2000/svg" aria-label="TIENS Logo">
            <title>TIENS Logo</title>
            <style>
              {`.logo-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font-size: 42px; font-weight: bold; fill: #000000; letter-spacing: -1px; }`}
            </style>
            <text x="0" y="40" className="logo-text">T</text>
            {/* 'i' stem */}
            <rect x="34" y="22" width="7" height="18" fill="#000000"/>
            {/* Green dot for 'i' */}
            <circle cx="37.5" cy="12" r="6" fill="#009A44"/>
            <text x="48" y="40" className="logo-text">ens</text>
        </svg>
    </div>
);