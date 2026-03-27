'use client'

import { useDonationStore } from '@/store/donation'

export default function RatioBar() {
  const sales = useDonationStore(state => state.sales)
  const getWhitePercent = useDonationStore(state => state.getWhitePercent)
  const getBlackPercent = useDonationStore(state => state.getBlackPercent)

  const whitePercent = getWhitePercent()
  const blackPercent = getBlackPercent()

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-3">
        <div className="text-center">
          <span className="text-sm text-[#666]">white socks</span>
        </div>
        <p className="text-xs text-[#666]">지금 더 인기있는 색은?</p>
        <div className="text-center">
          <span className="text-sm text-[#666]">black socks</span>
        </div>
      </div>

      <div className="flex h-10 rounded-full overflow-hidden border border-[#E0E0E0]">
        <div
          className="bg-[#F5F5F5] flex items-center justify-center transition-all duration-700 ease-out"
          style={{ width: `${whitePercent}%` }}
        >
          <span className="text-sm font-bold text-[#1A1A1A]">
            {whitePercent}%
          </span>
        </div>
        <div
          className="bg-[#1A1A1A] flex items-center justify-center transition-all duration-700 ease-out"
          style={{ width: `${blackPercent}%` }}
        >
          <span className="text-sm font-bold text-white">
            {blackPercent}%
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-[#666]">{sales.white.toLocaleString()}켤레 판매</span>
        <span className="text-xs text-[#666]">{sales.black.toLocaleString()}켤레 판매</span>
      </div>
    </div>
  )
}
