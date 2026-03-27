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

  const doubled = [...cheerMessages, ...cheerMessages]

  return (
    <div className="w-full">
      <h3 className="font-pixel text-[10px] mb-4 text-[#00FFFF] uppercase tracking-wider text-center neon-pulse">
        &#9733; CHEER BOARD &#9733;
      </h3>

      {/* 90s chatroom window frame */}
      <div className="border-2 border-[#333] bg-[#0a0a0a]">
        {/* Title bar */}
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#8B00FF] px-3 py-1.5 flex items-center justify-between">
          <span className="font-pixel text-[8px] text-white">yangmar_chat.exe</span>
          <div className="flex gap-1">
            <span className="w-3 h-3 border border-white/50 text-white text-[8px] flex items-center justify-center">_</span>
            <span className="w-3 h-3 border border-white/50 text-white text-[8px] flex items-center justify-center">X</span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="h-[300px] overflow-hidden p-3 space-y-1"
        >
          {doubled.map((msg, i) => (
            <motion.div
              key={`${msg.id}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i < cheerMessages.length ? i * 0.03 : 0 }}
              className="flex items-center gap-2 py-1 border-b border-[#1a1a1a]"
            >
              <span className="text-lg flex-shrink-0">{msg.emoji}</span>
              <span className={`font-pixel text-[8px] flex-shrink-0 ${msg.team === 'white' ? 'text-[#00FFFF]' : 'text-[#FF69B4]'}`}>
                {msg.team === 'white' ? 'WHT' : 'BLK'}
              </span>
              <span className="text-sm text-[#ccc] truncate">{msg.text}</span>
              <span className="text-[10px] text-[#555] flex-shrink-0 ml-auto">anon</span>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <div className="border-t border-[#333] px-3 py-1 flex items-center justify-between">
          <span className="font-pixel text-[7px] text-[#39FF14]">ONLINE: {cheerMessages.length}</span>
          <span className="font-pixel text-[7px] text-[#555]">v2.2</span>
        </div>
      </div>
    </div>
  )
}
