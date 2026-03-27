'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useDonationStore } from '@/store/donation'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function CheckoutPage() {
  const { items, getTotalDonation, getTotalPrice, clearCart } = useCartStore()
  const addSale = useDonationStore(state => state.addSale)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  })

  if (items.length === 0) {
    if (typeof window !== 'undefined') {
      window.location.href = `${basePath}/cart/`
    }
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    items.forEach(item => {
      addSale(item.color, item.quantity)
    })

    clearCart()
    window.location.href = `${basePath}/order-complete/`
  }

  return (
    <div className="container-custom py-12 md:py-16">
      <h1 className="text-2xl font-bold mb-8">checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="border border-[#E0E0E0] rounded-xl p-6">
            <h2 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider">shipping</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#666] mb-2">이름 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 focus:border-[#1A1A1A] focus:outline-none"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm text-[#666] mb-2">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 focus:border-[#1A1A1A] focus:outline-none"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm text-[#666] mb-2">배송 주소 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 focus:border-[#1A1A1A] focus:outline-none"
                  placeholder="서울시 강남구..."
                />
              </div>

              <div>
                <label className="block text-sm text-[#666] mb-2">배송 메시지</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 focus:border-[#1A1A1A] focus:outline-none"
                  rows={3}
                  placeholder="배송 시 요청사항을 입력해주세요"
                />
              </div>
            </div>
          </div>

          <div className="border border-[#E0E0E0] rounded-xl p-6">
            <h2 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider">payment</h2>
            <div className="bg-[#F5F5F5] rounded-xl p-4 text-center text-[#666]">
              <p className="text-sm">데모 버전입니다</p>
              <p className="text-xs mt-1">실제 결제는 진행되지 않습니다</p>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary text-lg py-4">
            {getTotalPrice().toLocaleString()}원 결제하기
          </button>
        </form>

        <div className="lg:col-span-1">
          <div className="border border-[#E0E0E0] rounded-xl p-6 sticky top-20">
            <h2 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider">order summary</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#666]">
                    {item.nameEn} x {item.quantity}
                  </span>
                  <span>
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pt-4 border-t border-[#E0E0E0]">
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">배송비</span>
                <span>무료</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">합계</span>
                <span className="text-xl font-bold">{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl p-4 text-center">
              <p className="text-xs text-[#666] mb-1">이 주문으로</p>
              <p className="text-xl font-bold">{getTotalDonation()}켤레</p>
              <p className="text-xs text-[#666] mt-1">기부됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
