'use client'

import { motion } from 'framer-motion'
import { useDonationStore } from '@/store/donation'

export default function SockRelay({ variant = 'banner' }: { variant?: 'banner' | 'full' }) {
  const relayCount = useDonationStore(state => state.relayCount)

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-[#39FF14] bg-[#0a0a0a] p-4 cursor-pointer hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] text-[#39FF14] neon-pulse">&#9830;</span>
            <span className="text-sm text-white">
              현재 <span className="font-bold text-[#39FF14]">{relayCount}번째</span> 릴레이 진행 중
            </span>
          </div>
          <span className="font-pixel text-[8px] bg-[#39FF14] text-black px-3 py-1.5 hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all">
            10% OFF &#9654;
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.4 }}
      className="border-2 border-[#39FF14] bg-[#111] p-8 text-center"
      style={{ boxShadow: '0 0 25px rgba(57,255,20,0.3)' }}
    >
      <p className="font-pixel text-[10px] text-[#39FF14] mb-4 neon-pulse">
        &#9830; RELAY SUCCESS! &#9830;
      </p>

      <p className="text-sm text-[#ccc] leading-relaxed mb-4">
        &ldquo;당신의 구매로 다음 사람이 10% 할인을<br />
        받게 됩니다. 릴레이를 이어주셔서<br />
        고맙습니다!&rdquo;
      </p>

      <div className="border-2 border-[#333] bg-[#0a0a0a] p-4 mb-6 inline-block">
        <span className="font-pixel text-[8px] text-[#888]">RELAY #</span>
        <span className="font-pixel text-2xl text-[#39FF14] ml-2" style={{ textShadow: '0 0 20px rgba(57,255,20,0.5)' }}>
          {relayCount}
        </span>
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            const text = `양마르 양말 릴레이 ${relayCount}번째 참여! 🔗\n다음 사람에게 10% 할인을 전달했어요.\n#양마르릴레이 #1구매1기부`
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({ title: '양마르 릴레이', text }).catch(() => {})
            } else if (typeof navigator !== 'undefined') {
              navigator.clipboard.writeText(text).catch(() => {})
            }
          }}
          className="w-full py-3 bg-[#39FF14] text-black font-bold font-pixel text-[10px] uppercase hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all"
        >
          #양마르릴레이 SHARE
        </button>
      </div>
    </motion.div>
  )
}
