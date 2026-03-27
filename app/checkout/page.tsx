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
      <h1 className="text-2xl font-bold mb-8 text-white font-pixel text-sm">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="border-2 border-[#333] bg-[#111] p-6">
            <h2 className="font-pixel text-[8px] text-[#00FFFF] mb-4 uppercase tracking-wider">SHIPPING</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">이름 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-2 border-[#333] bg-[#0a0a0a] px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors placeholder:text-[#555]"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">연락처 *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border-2 border-[#333] bg-[#0a0a0a] px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors placeholder:text-[#555]"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">배송 주소 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border-2 border-[#333] bg-[#0a0a0a] px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors placeholder:text-[#555]"
                  placeholder="서울시 강남구..."
                />
              </div>

              <div>
                <label className="block text-sm text-[#888] mb-2">배송 메시지</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-2 border-[#333] bg-[#0a0a0a] px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors placeholder:text-[#555]"
                  rows={3}
                  placeholder="배송 시 요청사항을 입력해주세요"
                />
              </div>
            </div>
          </div>

          <div className="border-2 border-[#333] bg-[#111] p-6">
            <h2 className="font-pixel text-[8px] text-[#FF69B4] mb-4 uppercase tracking-wider">PAYMENT</h2>
            <div className="border-2 border-[#333] bg-[#0a0a0a] p-4 text-center">
              <p className="text-sm text-[#888]">데모 버전입니다</p>
              <p className="font-pixel text-[7px] text-[#555] mt-1">NO REAL PAYMENT</p>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary text-lg py-4">
            {getTotalPrice().toLocaleString()}원 결제하기
          </button>
        </form>

        <div className="lg:col-span-1">
          <div className="border-2 border-[#333] bg-[#111] p-6 sticky top-20">
            <h2 className="font-pixel text-[8px] text-[#FF69B4] mb-4 uppercase tracking-wider">ORDER SUMMARY</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#888]">
                    {item.nameEn} x {item.quantity}
                  </span>
                  <span className="text-white">
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pt-4 border-t border-[#333]">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">배송비</span>
                <span className="text-[#39FF14]">무료</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-white">합계</span>
                <span className="text-xl font-bold text-[#39FF14]">{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>

            <div className="border-2 border-[#39FF14] bg-[#0a0a0a] p-4 text-center" style={{ boxShadow: '0 0 10px rgba(57,255,20,0.2)' }}>
              <p className="font-pixel text-[7px] text-[#888] mb-1">DONATION</p>
              <p className="text-xl font-bold text-[#39FF14]">{getTotalDonation()}켤레</p>
              <p className="font-pixel text-[7px] text-[#888] mt-1">DONATED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
