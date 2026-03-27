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
          <span className="font-pixel text-[10px] text-[#00FFFF]">WHITE</span>
        </div>
        <p className="font-pixel text-[8px] text-[#FF69B4]">VS</p>
        <div className="text-center">
          <span className="font-pixel text-[10px] text-[#FF69B4]">BLACK</span>
        </div>
      </div>

      <div className="flex h-12 overflow-hidden border-2 border-[#333] relative">
        <div
          className="bg-gradient-to-r from-[#00FFFF] to-[#39FF14] flex items-center justify-center transition-all duration-700 ease-out relative"
          style={{
            width: `${whitePercent}%`,
            boxShadow: 'inset 0 0 20px rgba(0,255,255,0.3)',
          }}
        >
          <span className="text-sm font-bold text-black font-pixel text-[10px]">
            {whitePercent}%
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-[#FF69B4] to-[#8B00FF] flex items-center justify-center transition-all duration-700 ease-out"
          style={{
            width: `${blackPercent}%`,
            boxShadow: 'inset 0 0 20px rgba(255,105,180,0.3)',
          }}
        >
          <span className="text-sm font-bold text-white font-pixel text-[10px]">
            {blackPercent}%
          </span>
        </div>
        {/* Center divider glow */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"
          style={{ left: `${whitePercent}%` }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-[#00FFFF]">{sales.white.toLocaleString()}켤레</span>
        <span className="text-xs text-[#FF69B4]">{sales.black.toLocaleString()}켤레</span>
      </div>
    </div>
  )
}
