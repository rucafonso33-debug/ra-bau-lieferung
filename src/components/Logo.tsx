import React from 'react';

interface LogoProps {
  className?: string;
  invert?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", invert = false }) => {
  const blueColor = invert ? "#004b87" : "#004b87"; // Keep the brand blue consistent
  const darkColor = invert ? "#ffffff" : "#18181b"; // white or zinc-900

  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg 
        viewBox="0 0 350 100" 
        className="h-8 sm:h-12 md:h-[50px] w-auto transition-all" 
        fill="none" 
        style={{ contentVisibility: 'auto' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left bold "RA" */}
        <text 
          x="10" 
          y="74" 
          fill={blueColor} 
          fontSize="72" 
          fontWeight="900" 
          fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif"
          letterSpacing="-0.04em"
        >
          RA
        </text>

        {/* Stacked "BAU" and "LIEFERUNG" */}
        <text 
          x="115" 
          y="42" 
          fill={darkColor} 
          fontSize="26" 
          fontWeight="800" 
          fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif"
          letterSpacing="0.04em"
        >
          BAU
        </text>

        <text 
          x="115" 
          y="72" 
          fill={darkColor} 
          fontSize="23" 
          fontWeight="800" 
          fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif"
          letterSpacing="0.04em"
        >
          LIEFERUNG
        </text>

        {/* Motion truck graphic on the right */}
        <g stroke={blueColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          {/* 3 speed/motion lines on the left of the truck */}
          <line x1="240" y1="36" x2="252" y2="36" stroke={blueColor} strokeWidth="2.8" />
          <line x1="235" y1="45" x2="252" y2="45" stroke={blueColor} strokeWidth="2.8" />
          <line x1="242" y1="54" x2="252" y2="54" stroke={blueColor} strokeWidth="2.8" />
          
          {/* Main Truck Body Container (hollow rectangle) */}
          <path d="M256 26 H304 V56 H256 Z" fill="none" strokeWidth="2.8" />
          
          {/* Truck Cabin */}
          <path d="M304 36 H315 L324 45 V56 H304 Z" fill="none" strokeWidth="2.8" />
          
          {/* Window in Cabin */}
          <path d="M308 40 H314 L318 44 H308 Z" fill="none" strokeWidth="1.8" />
          
          {/* Wheels (filled circles with backgrounds to hide overlaying truck edges if any) */}
          <circle cx="270" cy="62" r="6.5" fill={invert ? "#09090b" : "#ffffff"} stroke={blueColor} strokeWidth="2.8" />
          <circle cx="311" cy="62" r="6.5" fill={invert ? "#09090b" : "#ffffff"} stroke={blueColor} strokeWidth="2.8" />
        </g>
      </svg>
    </div>
  );
};
