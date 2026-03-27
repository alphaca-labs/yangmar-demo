'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDonationStore } from '@/store/donation'

const EMOJI_PRESETS = ['🧦', '🤍', '❤️', '🔥', '✨', '👍']
const MESSAGE_PRESETS = [
  '따뜻한 겨울 보내세요!',
  '양말 한 켤레의 기적 🧦',
  '함께라서 가능한 나눔',
  '작은 선물, 큰 따뜻함',
]

export default function CheerInput() {
  const addCheerMessage = useDonationStore(state => state.addCheerMessage)
  const getWinner = useDonationStore(state => state.getWinner)
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState('🧦')
  const [submitted, setSubmitted] = useState(false)

  const winner = getWinner()
  const team = winner === 'tie' ? 'white' : winner

  const handleSubmit = () => {
    if (!text.trim()) return
    addCheerMessage({ text: text.trim(), emoji, team })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-2 border-[#39FF14] p-6 text-center bg-[#111]"
        style={{ boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}
      >
        <div className="font-pixel text-[#39FF14] text-lg mb-3">[OK]</div>
        <p className="text-sm font-bold text-white mb-1">메시지가 등록되었어요!</p>
        <p className="text-xs text-[#666]">기부현황 페이지에서 확인할 수 있습니다</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-2 border-[#333] p-6 bg-[#111]"
    >
      <p className="font-pixel text-[10px] text-[#FF69B4] mb-4">
        &#9654; LEAVE MSG <span className="text-[#555]">(optional)</span>
      </p>

      {/* 프리셋 메시지 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MESSAGE_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => setText(preset)}
            className={`text-xs px-3 py-1.5 border-2 transition-all ${
              text === preset
                ? 'border-[#39FF14] bg-[#39FF14] text-black font-bold'
                : 'border-[#333] text-[#888] hover:border-[#666]'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* 텍스트 입력 */}
      <div className="relative mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 20))}
          placeholder="따뜻한 겨울 보내세요!"
          maxLength={20}
          className="w-full border-2 border-[#333] bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39FF14] transition-colors placeholder:text-[#555]"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-pixel text-[8px] text-[#555]">
          {text.length}/20
        </span>
      </div>

      {/* 이모지 선택 */}
      <div className="flex items-center gap-3 mb-5">
        {EMOJI_PRESETS.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            className={`text-xl w-10 h-10 flex items-center justify-center transition-all border-2 ${
              emoji === e
                ? 'border-[#FF69B4] bg-[#1a1a1a] shadow-[0_0_10px_rgba(255,105,180,0.4)] scale-110'
                : 'border-[#333] hover:border-[#555]'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* 제출 */}
      <AnimatePresence>
        {text.trim() && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            onClick={handleSubmit}
            className="w-full py-3 bg-[#39FF14] text-black font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all"
          >
            SEND MESSAGE
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
