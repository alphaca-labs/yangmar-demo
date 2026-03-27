'use client'

import React from 'react'

const Sock = React.forwardRef<SVGSVGElement, { color: 'white' | 'black' }>(
  ({ color }, ref) => {
    const fill = color === 'white' ? '#F5F5F5' : '#1A1A1A'
    const stroke = color === 'white' ? '#E0E0E0' : '#000000'

    return (
      <svg
        ref={ref}
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Ribbed cuff */}
          <rect x="25" y="10" width="30" height="4" fill={fill} stroke={stroke} strokeWidth="1"/>
          <rect x="25" y="16" width="30" height="4" fill={fill} stroke={stroke} strokeWidth="1"/>
          <rect x="25" y="22" width="30" height="4" fill={fill} stroke={stroke} strokeWidth="1"/>
          
          {/* Leg */}
          <path d="M25,28 V60 H55 V28 Z" fill={fill} stroke={stroke} strokeWidth="1" />
          
          {/* Foot */}
          <path d="M25,60 Q20,60 15,65 V85 H75 Q85,85 85,75 V60 H55" fill={fill} stroke={stroke} strokeWidth="1" />
          
          {/* Heel */}
          <path d="M25,60 Q35,55 55,60" fill={fill} stroke={stroke} strokeWidth="0.5" />
        </g>
      </svg>
    )
  }
)

Sock.displayName = 'Sock'

export default Sock
