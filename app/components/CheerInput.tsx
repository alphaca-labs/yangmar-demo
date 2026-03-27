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
        className="border border-[#E0E0E0] rounded-2xl p-6 text-center"
      >
        <div className="text-3xl mb-3">💬</div>
        <p className="text-sm font-bold mb-1">메시지가 등록되었어요!</p>
        <p className="text-xs text-[#666]">기부현황 페이지에서 확인할 수 있습니다</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-[#E0E0E0] rounded-2xl p-6"
    >
      <p className="text-sm font-bold mb-4">💬 한 마디 남기기 <span className="font-normal text-[#999]">(선택)</span></p>

      {/* 프리셋 메시지 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MESSAGE_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => setText(preset)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              text === preset
                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                : 'border-[#E0E0E0] hover:border-[#999]'
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
          className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#999]">
          {text.length}/20
        </span>
      </div>

      {/* 이모지 선택 */}
      <div className="flex items-center gap-3 mb-5">
        {EMOJI_PRESETS.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            className={`text-xl w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              emoji === e ? 'bg-[#F5F5F5] scale-110 ring-2 ring-[#1A1A1A]' : 'hover:bg-[#F5F5F5]'
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
            className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-semibold hover:bg-[#333] transition-colors"
          >
            메시지 남기기
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
