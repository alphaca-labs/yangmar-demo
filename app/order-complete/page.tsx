'use client'

import { useState, useEffect } from 'react'
import StaticLink from '@/components/StaticLink'
import { useDonationStore } from '@/store/donation'
import CheerInput from '@/components/CheerInput'
import SockRoulette from '@/components/SockRoulette'
import SockRelay from '@/components/SockRelay'

export default function OrderCompletePage() {
  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const getWinner = useDonationStore(state => state.getWinner)
  const incrementRelay = useDonationStore(state => state.incrementRelay)
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    setOrderNumber(`YM-${Date.now().toString().slice(-6)}`)
    incrementRelay()
  }, [incrementRelay])

  const winner = getWinner()
  const teamName = winner === 'white' ? '#화이트팀' : '#블랙팀'
  const teamEmoji = winner === 'white' ? '🤍' : '🖤'
  const teamColor = winner === 'white' ? '#00FFFF' : '#FF69B4'

  const shareText = `나는 ${teamName} ${teamEmoji}\n양마르에서 양말 사면 1:1 기부! 지금까지 ${getTotalDonated().toLocaleString()}켤레 기부 완료\n#양마르 #1구매1기부 ${teamName}`

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: '양마르 기부 인증',
        text: shareText,
      }).catch(() => {})
    } else {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(shareText).catch(() => {})
      }
    }
  }

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <div
            className="w-16 h-16 border-2 flex items-center justify-center mx-auto mb-4 text-2xl font-pixel"
            style={{ borderColor: teamColor, color: teamColor, boxShadow: `0 0 20px ${teamColor}40` }}
          >
            OK
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">
            주문 완료!
          </h1>
          <p className="font-pixel text-[8px] text-[#666]">
            ORDER# {orderNumber}
          </p>
        </div>

        {/* 기부 인증서 */}
        <div className="border-2 border-[#333] bg-[#111] p-8 mb-8 pixel-border">
          <p className="font-pixel text-[8px] text-[#FF69B4] tracking-widest mb-4">DONATION CERT</p>
          <div className="text-5xl mb-3">{teamEmoji}</div>
          <p className="text-sm text-[#888] mb-6">당신의 따뜻한 마음에 감사드립니다</p>

          <div className="border-2 border-[#333] bg-[#0a0a0a] p-5 mb-4">
            <p className="font-pixel text-[7px] text-[#888] mb-1">MY TEAM</p>
            <p className="text-xl font-bold" style={{ color: teamColor }}>{teamName}</p>
          </div>

          <p className="text-xs text-[#555]">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* 한 줄 메시지 입력 */}
        <div className="mb-8">
          <CheerInput />
        </div>

        {/* 양말 룰렛 */}
        <div className="mb-8">
          <SockRoulette />
        </div>

        {/* 양말 릴레이 */}
        <div className="mb-8">
          <SockRelay variant="full" />
        </div>

        {/* SNS 공유 */}
        <div className="mb-8">
          <p className="font-pixel text-[8px] text-[#888] mb-4">SHARE YOUR TEAM</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleShare}
              className="w-full py-3 font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: teamColor,
                color: '#000',
                boxShadow: `0 0 15px ${teamColor}50`,
              }}
            >
              {teamName} 공유하기
            </button>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border-2 border-[#333] text-sm text-[#888] hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all text-center"
              >
                X (Twitter)
              </a>
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined') {
                    navigator.clipboard.writeText(shareText).catch(() => {})
                  }
                }}
                className="flex-1 py-3 border-2 border-[#333] text-sm text-[#888] hover:border-[#FF69B4] hover:text-[#FF69B4] transition-all"
              >
                텍스트 복사
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <StaticLink href="/donation" className="block btn-primary text-center">
            기부 현황 보기
          </StaticLink>
          <StaticLink href="/products" className="block btn-secondary text-center">
            계속 쇼핑하기
          </StaticLink>
        </div>

        {/* 배송 안내 */}
        <div className="mt-10 p-5 border-2 border-[#333] bg-[#111] text-left">
          <h3 className="font-pixel text-[8px] text-[#FF69B4] mb-3">SHIPPING INFO</h3>
          <ul className="space-y-2 text-xs text-[#666]">
            <li className="flex items-start gap-2">
              <span className="text-[#39FF14]">&#9654;</span>
              영업일 기준 2-3일 내 배송됩니다
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#39FF14]">&#9654;</span>
              배송 조회는 이메일로 발송된 링크에서 확인 가능합니다
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#39FF14]">&#9654;</span>
              기부 양말은 2주 이내에 기부처로 전달됩니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
