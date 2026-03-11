const TatarDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center py-4 ${className}`}>
    <svg
      viewBox="0 0 320 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs h-8 text-primary"
    >
      {/* Center tulip */}
      <g transform="translate(160,16)">
        {/* Petals */}
        <path d="M0,-12 C3,-10 5,-6 4,-2 C3,1 1,3 0,4 C-1,3 -3,1 -4,-2 C-5,-6 -3,-10 0,-12Z" fill="currentColor" opacity="0.7" />
        <path d="M0,-10 C6,-8 8,-3 6,0 C5,2 3,3 0,4" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M0,-10 C-6,-8 -8,-3 -6,0 C-5,2 -3,3 0,4" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        {/* Left petal wing */}
        <path d="M-3,-8 C-7,-9 -9,-6 -8,-3 C-7,-1 -5,0 -3,0Z" fill="currentColor" opacity="0.4" />
        {/* Right petal wing */}
        <path d="M3,-8 C7,-9 9,-6 8,-3 C7,-1 5,0 3,0Z" fill="currentColor" opacity="0.4" />
        {/* Stem */}
        <line x1="0" y1="4" x2="0" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Leaves */}
        <path d="M0,7 C-4,5 -6,7 -5,9 C-4,10 -2,9 0,7Z" fill="currentColor" opacity="0.35" />
        <path d="M0,7 C4,5 6,7 5,9 C4,10 2,9 0,7Z" fill="currentColor" opacity="0.35" />
      </g>

      {/* Left side ornamental line with small tulips */}
      <line x1="20" y1="16" x2="130" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
      <g transform="translate(75,16) scale(0.6)">
        <path d="M0,-10 C2,-8 4,-5 3,-1 C2,1 1,2 0,3 C-1,2 -2,1 -3,-1 C-4,-5 -2,-8 0,-10Z" fill="currentColor" opacity="0.3" />
      </g>
      <g transform="translate(40,16) scale(0.4)">
        <path d="M0,-10 C2,-8 4,-5 3,-1 C2,1 1,2 0,3 C-1,2 -2,1 -3,-1 C-4,-5 -2,-8 0,-10Z" fill="currentColor" opacity="0.2" />
      </g>

      {/* Right side ornamental line with small tulips */}
      <line x1="190" y1="16" x2="300" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
      <g transform="translate(245,16) scale(0.6)">
        <path d="M0,-10 C2,-8 4,-5 3,-1 C2,1 1,2 0,3 C-1,2 -2,1 -3,-1 C-4,-5 -2,-8 0,-10Z" fill="currentColor" opacity="0.3" />
      </g>
      <g transform="translate(280,16) scale(0.4)">
        <path d="M0,-10 C2,-8 4,-5 3,-1 C2,1 1,2 0,3 C-1,2 -2,1 -3,-1 C-4,-5 -2,-8 0,-10Z" fill="currentColor" opacity="0.2" />
      </g>

      {/* Corner dots */}
      <circle cx="15" cy="16" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="305" cy="16" r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  </div>
);

export default TatarDivider;
