'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDonationStore } from '@/store/donation'
import StaticLink from '@/components/StaticLink'

export default function PledgeCards() {
  const pledges = useDonationStore(state => state.pledges)
  const deadline = useDonationStore(state => state.deadline)
  const getWhitePercent = useDonationStore(state => state.getWhitePercent)
  const getBlackPercent = useDonationStore(state => state.getBlackPercent)
  const getWinner = useDonationStore(state => state.getWinner)

  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const diff = new Date(deadline).getTime() - Date.now()
    setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))))
  }, [deadline])

  const winner = getWinner()
  const whitePercent = getWhitePercent()
  const blackPercent = getBlackPercent()

  const blackPledge = pledges.find(p => p.team === 'black')
  const whitePledge = pledges.find(p => p.team === 'white')

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 블랙팀 공약 */}
      {blackPledge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="border-2 border-[#FF69B4] p-6 relative overflow-hidden bg-[#111]"
          style={{ boxShadow: '0 0 15px rgba(255,105,180,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-pixel text-[10px] text-[#FF69B4]">BLK</span>
            <span className="text-sm font-bold text-white">블랙팀 공약</span>
            {winner === 'black' && (
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-sm"
              >
                🔥
              </motion.span>
            )}
          </div>
          <p className="text-sm text-[#999] leading-relaxed mb-4">
            &ldquo;{blackPledge.description}&rdquo;
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[#FF69B4]">현재 {blackPercent}%</span>
            {winner === 'black' && (
              <span className="font-pixel text-[8px] bg-[#FF69B4] text-black px-3 py-1">LEADING</span>
            )}
          </div>
          <StaticLink
            href="/products/black-socks"
            className="block text-center text-sm py-2.5 bg-[#FF69B4] text-black font-bold hover:shadow-[0_0_20px_rgba(255,105,180,0.5)] transition-all"
          >
            블랙 양말 사러가기 →
          </StaticLink>
        </motion.div>
      )}

      {/* 화이트팀 공약 */}
      {whitePledge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.4 }}
          className="border-2 border-[#00FFFF] p-6 relative overflow-hidden bg-[#111]"
          style={{ boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-pixel text-[10px] text-[#00FFFF]">WHT</span>
            <span className="text-sm font-bold text-white">화이트팀 공약</span>
            {winner === 'white' && (
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-sm"
              >
                🔥
              </motion.span>
            )}
          </div>
          <p className="text-sm text-[#999] leading-relaxed mb-4">
            &ldquo;{whitePledge.description}&rdquo;
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[#00FFFF]">현재 {whitePercent}%</span>
            {winner === 'white' && (
              <span className="font-pixel text-[8px] bg-[#00FFFF] text-black px-3 py-1">LEADING</span>
            )}
          </div>
          <StaticLink
            href="/products/white-socks"
            className="block text-center text-sm py-2.5 border-2 border-[#00FFFF] text-[#00FFFF] font-bold hover:bg-[#00FFFF] hover:text-black transition-all"
          >
            화이트 양말 사러가기 →
          </StaticLink>
        </motion.div>
      )}

      {/* 카운트다운 */}
      <div className="sm:col-span-2 text-center">
        <p className="font-pixel text-[8px] text-[#888]">
          DEADLINE <span className="text-[#39FF14] neon-pulse">D-{daysLeft}</span>
        </p>
      </div>
    </div>
  )
}
