'use client'

import React from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const Sock = React.forwardRef<HTMLDivElement, { color: 'white' | 'black' }>(
  ({ color }, ref) => {
    const src = color === 'white'
      ? `${basePath}/images/sock-white-photo.png`
      : `${basePath}/images/sock-black-photo.png`

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          willChange: 'transform',
          transformOrigin: 'center center',
          pointerEvents: 'none',
        }}
      >
        <img
          src={src}
          alt={`${color} sock`}
          width={80}
          height={80}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.15))',
          }}
          draggable={false}
        />
      </div>
    )
  }
)

Sock.displayName = 'Sock'

export default Sock
