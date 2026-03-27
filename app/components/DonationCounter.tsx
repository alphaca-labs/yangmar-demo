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
    <div className="bg-[#1A1A1A] text-white py-2 sticky top-0 z-50">
      <div className="container-custom">
        <p className="text-center text-sm">
          양말 하나가 누군가를 따뜻하게 해요 ·{' '}
          <span className="font-bold">
            {displayCount.toLocaleString()}
          </span>
          켤레 기부 완료
        </p>
      </div>
    </div>
  )
}
