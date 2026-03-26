'use client'

import { useEffect, useState } from 'react'
import { useDonationStore } from '@/store/donation'

export default function DonationCounter() {
  const totalDonated = useDonationStore(state => state.totalDonated)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = totalDonated
    const duration = 2000
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
    <div className="bg-black text-white py-2 sticky top-0 z-50">
      <div className="container-custom">
        <p className="text-center text-sm md:text-base">
          🧦 지금까지{' '}
          <span className="font-bold text-lg md:text-xl">
            {displayCount.toLocaleString()}
          </span>
          켤레 기부 완료
        </p>
      </div>
    </div>
  )
}
