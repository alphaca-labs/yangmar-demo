'use client'

import { useState, useEffect } from 'react'
import StaticLink from '@/components/StaticLink'
import { useDonationStore } from '@/store/donation'
import CheerInput from '@/components/CheerInput'

export default function OrderCompletePage() {
  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const getWinner = useDonationStore(state => state.getWinner)
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    setOrderNumber(`YM-${Date.now().toString().slice(-6)}`)
  }, [])

  const winner = getWinner()
  const teamName = winner === 'white' ? '#화이트팀' : '#블랙팀'
  const teamEmoji = winner === 'white' ? '🤍' : '🖤'

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
          <div className="w-16 h-16 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-2">
            주문 완료!
          </h1>
          <p className="text-sm text-[#666]">
            주문번호: {orderNumber}
          </p>
        </div>

        {/* 기부 인증서 */}
        <div className="border border-[#E0E0E0] rounded-2xl p-8 mb-8">
          <p className="text-xs text-[#666] uppercase tracking-widest mb-4">donation certificate</p>
          <div className="text-5xl mb-3">{teamEmoji}</div>
          <p className="text-sm text-[#666] mb-6">당신의 따뜻한 마음에 감사드립니다</p>

          <div className="bg-[#F5F5F5] rounded-xl p-5 mb-4">
            <p className="text-xs text-[#666] mb-1">나의 팀</p>
            <p className="text-xl font-bold">{teamName}</p>
          </div>

          <p className="text-xs text-[#999]">
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

        {/* SNS 공유 */}
        <div className="mb-8">
          <p className="text-sm text-[#666] mb-4">나의 팀을 자랑해보세요</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleShare}
              className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl font-semibold hover:bg-[#333] transition-colors"
            >
              {teamName} 공유하기
            </button>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-[#E0E0E0] rounded-xl text-sm hover:bg-[#F5F5F5] transition-colors text-center"
              >
                X (Twitter)
              </a>
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined') {
                    navigator.clipboard.writeText(shareText).catch(() => {})
                  }
                }}
                className="flex-1 py-3 border border-[#E0E0E0] rounded-xl text-sm hover:bg-[#F5F5F5] transition-colors"
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
        <div className="mt-10 p-5 bg-[#F5F5F5] rounded-xl text-left">
          <h3 className="text-sm font-bold mb-3">배송 안내</h3>
          <ul className="space-y-2 text-xs text-[#666]">
            <li>· 영업일 기준 2-3일 내 배송됩니다</li>
            <li>· 배송 조회는 이메일로 발송된 링크에서 확인 가능합니다</li>
            <li>· 기부 양말은 2주 이내에 기부처로 전달됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
