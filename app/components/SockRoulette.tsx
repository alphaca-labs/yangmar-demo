'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { recipients } from '@/data/donations'

const DONATION_PLACES = [
  { name: '따뜻한 보육원', emoji: '🏠', story: '서울 관악구의 아이들에게 따뜻함을 전합니다' },
  { name: '구세군', emoji: '🔔', story: '노숙인과 취약계층을 위한 지원 활동' },
  { name: '아름다운가게', emoji: '🌿', story: '나눔과 순환의 가치를 실천하는 사회적 기업' },
  { name: '하늘 양로원', emoji: '👵', story: '어르신들의 따뜻한 겨울을 위해' },
  { name: '별빛 지역아동센터', emoji: '⭐', story: '아이들의 건강한 성장을 응원합니다' },
  { name: '무지개 쉼터', emoji: '🌈', story: '모두에게 따뜻한 쉼이 되는 곳' },
]

export default function SockRoulette() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<typeof DONATION_PLACES[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantity] = useState(3)

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    let count = 0
    const totalSpins = 20 + Math.floor(Math.random() * 10)
    const finalIndex = Math.floor(Math.random() * DONATION_PLACES.length)

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % DONATION_PLACES.length)
      count++

      if (count >= totalSpins) {
        clearInterval(interval)
        setCurrentIndex(finalIndex)
        setResult(DONATION_PLACES[finalIndex])
        setSpinning(false)
      }
    }, spinning ? Math.min(50 + count * 8, 300) : 80)

    return () => clearInterval(interval)
  }, [spinning])

  return (
    <div className="border-2 border-[#FF69B4] bg-[#111] p-6" style={{ boxShadow: '0 0 20px rgba(255,105,180,0.2)' }}>
      <h3 className="font-pixel text-[10px] text-[#FF69B4] text-center mb-6 neon-pulse">
        &#9733; SOCK ROULETTE &#9733;
      </h3>
      <p className="text-center text-sm text-[#888] mb-6">당신의 양말은 어디로 갈까요?</p>

      {/* Roulette display */}
      <div className="relative border-2 border-[#333] bg-[#0a0a0a] p-8 mb-6 overflow-hidden">
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none scanlines" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: spinning ? 0.05 : 0.3 }}
            className="text-center"
          >
            <div className="text-5xl mb-3">{DONATION_PLACES[currentIndex].emoji}</div>
            <p className={`font-pixel text-sm ${spinning ? 'text-[#888]' : 'text-[#39FF14]'}`}>
              {DONATION_PLACES[currentIndex].name}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Side indicators */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[#FF69B4] text-xl">&#9654;</div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[#FF69B4] text-xl">&#9664;</div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && !spinning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="border-2 border-[#39FF14] bg-[#0a0a0a] p-6 mb-6 text-center"
            style={{ boxShadow: '0 0 25px rgba(57,255,20,0.3)' }}
          >
            <p className="font-pixel text-[10px] text-[#39FF14] mb-2">DESTINATION FOUND!</p>
            <div className="text-4xl mb-2">{result.emoji}</div>
            <p className="text-lg font-bold text-white mb-1">
              당신의 양말 {quantity}켤레는
            </p>
            <p className="text-xl font-bold text-neon-green mb-3">
              [{result.name}]
            </p>
            <p className="text-sm text-[#888]">(으)로 갑니다!</p>
            <p className="text-xs text-[#666] mt-3 border-t border-[#333] pt-3">{result.story}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spin button */}
      {!result && (
        <button
          onClick={spin}
          disabled={spinning}
          className={`w-full py-4 font-bold font-pixel text-sm uppercase tracking-wider transition-all ${
            spinning
              ? 'bg-[#333] text-[#666] cursor-not-allowed'
              : 'bg-[#FF69B4] text-black hover:shadow-[0_0_25px_rgba(255,105,180,0.6)]'
          }`}
        >
          {spinning ? '..SPINNING..' : 'STOP & REVEAL'}
        </button>
      )}
    </div>
  )
}
