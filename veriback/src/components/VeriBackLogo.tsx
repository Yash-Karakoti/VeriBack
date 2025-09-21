import React from 'react'

export const VeriBackLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with glow effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      
      {/* Filecoin 'f' circle */}
      <circle
        cx="25"
        cy="50"
        r="15"
        fill="url(#shieldGradient)"
        filter="url(#glow)"
      />
      <text
        x="25"
        y="58"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="white"
        fontFamily="system-ui, sans-serif"
      >
        f
      </text>
      
      {/* Hexagonal shield */}
      <path
        d="M50 15 L70 25 L70 45 L50 55 L30 45 L30 25 Z"
        fill="url(#shieldGradient)"
        filter="url(#glow)"
      />
      
      {/* Lock inside shield */}
      <rect
        x="42"
        y="35"
        width="16"
        height="12"
        rx="2"
        fill="url(#lockGradient)"
      />
      <path
        d="M45 35 L45 30 Q45 25 50 25 Q55 25 55 30 L55 35"
        stroke="url(#lockGradient)"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="50"
        cy="41"
        r="2"
        fill="white"
      />
      
      {/* Connection lines */}
      <path
        d="M40 50 Q45 45 50 50"
        stroke="url(#shieldGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      />
      <path
        d="M70 50 Q75 45 80 50"
        stroke="url(#shieldGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      />
      
      {/* Network nodes */}
      <circle
        cx="20"
        cy="50"
        r="3"
        fill="url(#shieldGradient)"
        filter="url(#glow)"
      />
      <circle
        cx="80"
        cy="50"
        r="3"
        fill="url(#shieldGradient)"
        filter="url(#glow)"
      />
    </svg>
  )
}
