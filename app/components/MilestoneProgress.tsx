'use client'

import { motion } from 'framer-motion'
import { useDonationStore } from '@/store/donation'

export default function MilestoneProgress({ compact = false }: { compact?: boolean }) {
  const milestones = useDonationStore(state => state.milestones)
  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const totalDonated = getTotalDonated()

  return (
    <div className="w-full">
      {!compact && (
        <h3 className="text-sm font-bold mb-6 text-[#666] uppercase tracking-wider text-center">
          🎯 마일스톤
        </h3>
      )}
      <div className="space-y-4">
        {milestones.map((ms, i) => {
          const isAchieved = totalDonated >= ms.target
          const isActive = !isAchieved && (i === 0 || totalDonated >= milestones[i - 1].target)
          const progress = isAchieved ? 100 : Math.min(100, Math.round((totalDonated / ms.target) * 100))
          const isSecret = ms.secret && !isAchieved

          return (
            <motion.div
              key={ms.target}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-xl p-4 transition-colors ${
                isAchieved
                  ? 'bg-[#F5F5F5] border border-[#E0E0E0]'
                  : isActive
                    ? 'border border-[#1A1A1A]'
                    : 'border border-[#E0E0E0] opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {isAchieved ? '✅' : isActive ? '🔓' : '🔒'}
                </span>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${isAchieved ? 'line-through text-[#999]' : ''}`}>
                      {ms.target.toLocaleString()}켤레
                    </span>
                    {isAchieved && (
                      <span className="text-xs text-[#22C55E] font-bold">달성!</span>
                    )}
                  </div>
                  <p className={`text-sm ${isAchieved ? 'text-[#999]' : 'text-[#666]'}`}>
                    {isSecret ? '시크릿 이벤트 ??' : ms.reward}
                  </p>
                  {!compact && !isSecret && (
                    <p className="text-xs text-[#999] mt-0.5">{ms.description}</p>
                  )}

                  {/* 진행중 프로그레스 바 */}
                  {isActive && !isAchieved && (
                    <div className="mt-3">
                      <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-[#1A1A1A] rounded-full"
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-[#999]">{progress}%</span>
                        <span className="text-xs text-[#999]">{totalDonated.toLocaleString()}/{ms.target.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
