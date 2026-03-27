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
        <h3 className="font-pixel text-[10px] mb-6 text-[#FF69B4] uppercase tracking-wider text-center neon-pulse">
          &#9733; MILESTONES &#9733;
        </h3>
      )}
      <div className="space-y-3">
        {milestones.map((ms, i) => {
          const isAchieved = totalDonated >= ms.target
          const isActive = !isAchieved && (i === 0 || totalDonated >= milestones[i - 1].target)
          const progress = isAchieved ? 100 : Math.min(100, Math.round((totalDonated / ms.target) * 100))
          const isSecret = ms.secret && !isAchieved

          return (
            <motion.div
              key={ms.target}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, type: 'spring' }}
              className={`p-4 transition-all border-2 ${
                isAchieved
                  ? 'border-[#39FF14] bg-[#111]'
                  : isActive
                    ? 'border-[#FF69B4] bg-[#111] rainbow-border'
                    : 'border-[#333] bg-[#0a0a0a] opacity-50'
              }`}
              style={isAchieved ? { boxShadow: '0 0 10px rgba(57,255,20,0.2)' } : undefined}
            >
              <div className="flex items-start gap-3">
                <span className="font-pixel text-sm flex-shrink-0 mt-0.5">
                  {isAchieved ? (
                    <span className="text-[#39FF14]">[OK]</span>
                  ) : isActive ? (
                    <span className="text-[#FF69B4] neon-pulse">[ ]</span>
                  ) : (
                    <span className="text-[#555]">[X]</span>
                  )}
                </span>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${isAchieved ? 'line-through text-[#39FF14]' : 'text-white'}`}>
                      {ms.target.toLocaleString()}켤레
                    </span>
                    {isAchieved && (
                      <span className="font-pixel text-[8px] text-[#39FF14]">CLEAR!</span>
                    )}
                  </div>
                  <p className={`text-sm ${isAchieved ? 'text-[#666]' : 'text-[#999]'}`}>
                    {isSecret ? '??? HIDDEN EVENT ???' : ms.reward}
                  </p>
                  {!compact && !isSecret && (
                    <p className="text-xs text-[#555] mt-0.5">{ms.description}</p>
                  )}

                  {isActive && !isAchieved && (
                    <div className="mt-3">
                      <div className="h-3 bg-[#222] border border-[#333] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full"
                          style={{
                            background: 'linear-gradient(90deg, #39FF14, #00FFFF)',
                            boxShadow: '0 0 10px rgba(57,255,20,0.5)',
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="font-pixel text-[8px] text-[#39FF14]">{progress}%</span>
                        <span className="text-xs text-[#666]">{totalDonated.toLocaleString()}/{ms.target.toLocaleString()}</span>
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
