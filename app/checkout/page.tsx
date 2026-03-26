'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { useDonationStore } from '@/store/donation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalDonation, getTotalPrice, clearCart } = useCartStore()
  const incrementDonation = useDonationStore(state => state.incrementDonation)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  })

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 기부량 업데이트
    incrementDonation(getTotalDonation())
    
    // 주문 완료 페이지로 이동
    router.push('/order-complete')
    
    // 장바구니 비우기
    clearCart()
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">주문하기</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 배송 정보 */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">배송 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">이름 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">배송 주소 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  placeholder="서울시 강남구..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">배송 메시지</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                  rows={3}
                  placeholder="배송 시 요청사항을 입력해주세요"
                />
              </div>
            </div>
          </div>

          {/* 결제 */}
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">결제 방법</h2>
            <div className="bg-gray-50 p-4 text-center text-gray-600">
              <p>데모 버전입니다</p>
              <p className="text-sm mt-1">실제 결제는 진행되지 않습니다</p>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">
            ₩{getTotalPrice().toLocaleString()} 결제하기
          </button>
        </form>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <div className="border-2 border-black p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">주문 내역</h2>
            
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₩{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">배송비</span>
                <span className="font-semibold">무료</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">총 결제금액</span>
                <span className="text-xl font-bold">₩{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-black text-white p-4 text-center">
              <p className="text-sm mb-1">이 주문으로</p>
              <p className="text-2xl font-bold">
                🎁 {getTotalDonation()}켤레
              </p>
              <p className="text-sm mt-1">기부됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
