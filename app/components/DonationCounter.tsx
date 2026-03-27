'use client'

import { useEffect, useState } from 'react'
import { useDonationStore } from '@/store/donation'

export default function DonationCounter() {
  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const totalDonated = getTotalDonated()
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = totalDonated
    const duration = 1500
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayCount(end)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [totalDonated])

  return (
    <div className="bg-black border-b-2 border-neon-green py-2 sticky top-0 z-50 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex gap-12">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-sm flex items-center gap-3">
              <span className="text-neon-green font-pixel text-[10px]">&#9654;</span>
              <span className="text-[#39FF14]">
                {displayCount.toLocaleString()}켤레 기부 완료
              </span>
              <span className="text-[#FF69B4]">&#x2726;</span>
              <span className="text-[#00FFFF]">1구매 = 1기부</span>
              <span className="text-[#FF69B4]">&#x2726;</span>
              <span className="text-white">양말이 따뜻함이 됩니다</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
