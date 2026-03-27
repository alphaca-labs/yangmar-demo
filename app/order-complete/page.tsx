'use client'

import StaticLink from '@/components/StaticLink'
import { useCartStore } from '@/store/cart'

export default function OrderCompletePage() {
  const getTotalDonation = useCartStore(state => state.getTotalDonation)
  const donationCount = getTotalDonation()

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
            ✓
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            주문이 완료되었습니다!
          </h1>
          <p className="text-gray-600">
            주문번호: YANGMAR-{Date.now().toString().slice(-8)}
          </p>
        </div>

        {/* 기부 인증서 카드 */}
        <div className="border-4 border-black p-8 mb-8 bg-white">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-2xl font-bold mb-2">기부 인증서</h2>
            <p className="text-gray-600">당신의 따뜻한 마음에 감사드립니다</p>
          </div>

          <div className="bg-gray-50 p-6 mb-6">
            <p className="text-4xl font-bold mb-2">{donationCount}켤레</p>
            <p className="text-gray-600">기부 완료</p>
          </div>

          <div className="text-sm text-gray-600">
            <p>{new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
        </div>

        {/* SNS 공유 */}
        <div className="mb-8">
          <p className="font-semibold mb-4">나의 착한 소비를 자랑해보세요</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition-colors">
              카카오톡 공유
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded hover:opacity-90 transition-opacity">
              인스타그램 스토리
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <StaticLink href="/donation" className="block btn-primary">
            기부 현황 보기
          </StaticLink>
          <StaticLink href="/products" className="block btn-secondary">
            계속 쇼핑하기
          </StaticLink>
        </div>

        {/* 배송 안내 */}
        <div className="mt-12 p-6 bg-gray-50 text-left">
          <h3 className="font-semibold mb-3">배송 안내</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 주문하신 상품은 영업일 기준 2-3일 내 배송됩니다</li>
            <li>• 배송 조회는 이메일로 발송된 링크에서 확인 가능합니다</li>
            <li>• 기부 양말은 2주 이내에 기부처로 전달됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
