import React from 'react'

export const VeriBackLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main Hexagonal Shield */}
      <path
        d="M16 3L6 8.5V23.5L16 29L26 23.5V8.5L16 3Z"
        stroke="#00D4FF"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      />
      
      {/* Padlock Icon */}
      <rect
        x="12"
        y="14"
        width="8"
        height="6"
        rx="1"
        stroke="#00D4FF"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M14 14V11C14 9.34 15.34 8 17 8C18.66 8 20 9.34 20 11V14"
        stroke="#00D4FF"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Filecoin 'f' symbol in circle */}
      <circle
        cx="8"
        cy="12"
        r="3"
        stroke="#00D4FF"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M7 10H9M7 12H9M7 14H8"
        stroke="#00D4FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Connection line from Filecoin to shield */}
      <path
        d="M11 12L13 13"
        stroke="#00D4FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Data flow line from shield */}
      <path
        d="M22 18L24 20"
        stroke="#00D4FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="25"
        cy="21"
        r="1.5"
        fill="#00D4FF"
      />
    </svg>
  )
}
