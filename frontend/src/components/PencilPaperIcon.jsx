const PencilPaperIcon = ({ size = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    width={size}
    height={size}
  >
    <defs>
      <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f0f9ff' }} />
        <stop offset="100%" style={{ stopColor: '#e0e7ff' }} />
      </linearGradient>
      <linearGradient id="pencilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fbbf24' }} />
        <stop offset="100%" style={{ stopColor: '#f59e0b' }} />
      </linearGradient>
      <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.25)" />
      </filter>
      <filter id="pencilShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.3)" />
      </filter>
    </defs>

    {/* Paper / Document */}
    <rect
      x="8" y="6" width="34" height="44" rx="4" ry="4"
      fill="url(#paperGrad)"
      filter="url(#paperShadow)"
    />

    {/* Folded top-right corner */}
    <path d="M34 6 L42 14 L34 14 Z" fill="#c7d2fe" />
    <path d="M34 6 L42 14 H34 Z" fill="#a5b4fc" />

    {/* Ruled lines on paper */}
    <line x1="14" y1="22" x2="32" y2="22" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="29" x2="34" y2="29" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="36" x2="30" y2="36" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="43" x2="26" y2="43" stroke="#c7d2fe" strokeWidth="1.8" strokeLinecap="round" />

    {/* Pencil body — rotated -45deg */}
    <g transform="rotate(-42, 46, 44)" filter="url(#pencilShadow)">
      {/* Eraser (pink top) */}
      <rect x="42" y="18" width="8" height="5" rx="1.5" fill="#f87171" />
      {/* Metal band */}
      <rect x="42" y="23" width="8" height="3" fill="#d1d5db" />
      {/* Pencil body (yellow) */}
      <rect x="42" y="26" width="8" height="22" fill="url(#pencilGrad)" />
      {/* Wood tip */}
      <path d="M42 48 L50 48 L46 56 Z" fill="#fde68a" />
      {/* Lead tip */}
      <path d="M44.5 53 L46 56 L47.5 53 Z" fill="#374151" />
    </g>
  </svg>
);

export default PencilPaperIcon;