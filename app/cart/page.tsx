'use client'

import { useCartStore } from '@/store/cart'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalDonation, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-3 text-white">장바구니가 비어있습니다</h1>
        <p className="text-[#888] mb-8">양마르의 따뜻한 양말을 만나보세요</p>
        <a href={`${basePath}/products/`} className="btn-primary inline-block">
          상품 보러가기
        </a>
      </div>
    )
  }

  return (
    <div className="container-custom py-12 md:py-16">
      <h1 className="text-2xl font-bold mb-8 text-white font-pixel text-sm">CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-2 border-[#333] bg-[#111] p-5 flex gap-5">
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center border border-[#333]" style={{
                backgroundColor: item.color === 'white' ? '#0a0a0a' : '#1a1a1a'
              }}>
                <span className="text-3xl">{item.color === 'white' ? '🤍' : '🖤'}</span>
              </div>
              <div className="flex-grow">
                <p className="tracking-wide mb-1 text-white">{item.nameEn}</p>
                <p className="text-sm text-[#888] mb-3">
                  {item.price.toLocaleString()}원
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 border-2 border-[#333] text-sm text-white hover:border-[#39FF14] transition-colors"
                  >-</button>
                  <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border-2 border-[#333] text-sm text-white hover:border-[#39FF14] transition-colors"
                  >+</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-xs text-[#666] hover:text-[#FF69B4] transition-colors"
                  >삭제</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">{(item.price * item.quantity).toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border-2 border-[#333] bg-[#111] p-6 sticky top-20">
            <h2 className="font-pixel text-[8px] text-[#FF69B4] mb-4 uppercase tracking-wider">ORDER SUMMARY</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">상품 금액</span>
                <span className="text-white">{getTotalPrice().toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">배송비</span>
                <span className="text-[#39FF14]">무료</span>
              </div>
              <div className="pt-3 border-t border-[#333] flex justify-between">
                <span className="font-bold text-white">합계</span>
                <span className="text-xl font-bold text-[#39FF14]">{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>

            <div className="border-2 border-[#39FF14] bg-[#0a0a0a] p-4 text-center mb-6" style={{ boxShadow: '0 0 10px rgba(57,255,20,0.2)' }}>
              <p className="font-pixel text-[7px] text-[#888] mb-1">DONATION</p>
              <p className="text-xl font-bold text-[#39FF14]">{getTotalDonation()}켤레</p>
              <p className="font-pixel text-[7px] text-[#888] mt-1">DONATED</p>
            </div>

            <a href={`${basePath}/checkout/`} className="w-full btn-primary block text-center">
              주문하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
