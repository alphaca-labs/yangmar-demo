'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDonationStore } from '@/store/donation'

export default function CheerWall() {
  const cheerMessages = useDonationStore(state => state.cheerMessages)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.5

    const scroll = () => {
      scrollPos += speed
      if (scrollPos >= el.scrollHeight / 2) {
        scrollPos = 0
      }
      el.scrollTop = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    const handleEnter = () => cancelAnimationFrame(animationId)
    const handleLeave = () => { animationId = requestAnimationFrame(scroll) }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [cheerMessages])

  // 자동스크롤을 위해 메시지를 2번 복제
  const doubled = [...cheerMessages, ...cheerMessages]

  return (
    <div className="w-full">
      <h3 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider text-center">
        💬 응원 메시지
      </h3>
      <div
        ref={scrollRef}
        className="h-[320px] overflow-hidden rounded-2xl space-y-2"
      >
        {doubled.map((msg, i) => (
          <motion.div
            key={`${msg.id}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i < cheerMessages.length ? i * 0.05 : 0 }}
            className="bg-white border border-[#E0E0E0] rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <span className="text-lg flex-shrink-0">{msg.emoji}</span>
            <div className="flex-grow min-w-0">
              <p className="text-sm truncate">&ldquo;{msg.text}&rdquo;</p>
            </div>
            <span className="text-xs text-[#999] flex-shrink-0">익명</span>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-[#999] mt-3">
        최근 {cheerMessages.length}개 메시지
      </p>
    </div>
  )
}
