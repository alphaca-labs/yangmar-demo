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
          transition={{ duration: 0.5 }}
          className="border border-[#1A1A1A] rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🖤</span>
            <span className="text-sm font-bold">블랙팀 공약</span>
            {winner === 'black' && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm"
              >
                🔥
              </motion.span>
            )}
          </div>
          <p className="text-sm text-[#666] leading-relaxed mb-4">
            &ldquo;{blackPledge.description}&rdquo;
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold">현재 {blackPercent}%</span>
            {winner === 'black' && (
              <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full">리딩</span>
            )}
          </div>
          <StaticLink
            href="/products/black-socks"
            className="block text-center text-sm py-2.5 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#333] transition-colors"
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
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-[#E0E0E0] rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🤍</span>
            <span className="text-sm font-bold">화이트팀 공약</span>
            {winner === 'white' && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm"
              >
                🔥
              </motion.span>
            )}
          </div>
          <p className="text-sm text-[#666] leading-relaxed mb-4">
            &ldquo;{whitePledge.description}&rdquo;
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold">현재 {whitePercent}%</span>
            {winner === 'white' && (
              <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full">리딩</span>
            )}
          </div>
          <StaticLink
            href="/products/white-socks"
            className="block text-center text-sm py-2.5 border border-[#1A1A1A] rounded-xl hover:bg-[#F5F5F5] transition-colors"
          >
            화이트 양말 사러가기 →
          </StaticLink>
        </motion.div>
      )}

      {/* 카운트다운 */}
      <div className="sm:col-span-2 text-center">
        <p className="text-xs text-[#999]">
          공약 마감까지 <span className="font-bold text-[#1A1A1A]">D-{daysLeft}</span> 남음
        </p>
      </div>
    </div>
  )
}
