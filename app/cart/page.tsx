'use client'

import { useCartStore } from '@/store/cart'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalDonation, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-3">장바구니가 비어있습니다</h1>
        <p className="text-[#666] mb-8">양마르의 따뜻한 양말을 만나보세요</p>
        <a href={`${basePath}/products/`} className="btn-primary inline-block">
          상품 보러가기
        </a>
      </div>
    )
  }

  return (
    <div className="container-custom py-12 md:py-16">
      <h1 className="text-2xl font-bold mb-8">cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-[#E0E0E0] rounded-xl p-5 flex gap-5">
              <div className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center" style={{
                backgroundColor: item.color === 'white' ? '#F5F5F5' : '#1A1A1A'
              }}>
                <span className="text-3xl">{item.color === 'white' ? '🤍' : '🖤'}</span>
              </div>
              <div className="flex-grow">
                <p className="tracking-wide mb-1">{item.nameEn}</p>
                <p className="text-sm text-[#666] mb-3">
                  {item.price.toLocaleString()}원
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 border border-[#E0E0E0] rounded-lg text-sm hover:bg-[#F5F5F5]"
                  >-</button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-[#E0E0E0] rounded-lg text-sm hover:bg-[#F5F5F5]"
                  >+</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-xs text-[#999] hover:text-[#1A1A1A]"
                  >삭제</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{(item.price * item.quantity).toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-[#E0E0E0] rounded-xl p-6 sticky top-20">
            <h2 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider">order summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">상품 금액</span>
                <span>{getTotalPrice().toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">배송비</span>
                <span>무료</span>
              </div>
              <div className="pt-3 border-t border-[#E0E0E0] flex justify-between">
                <span className="font-bold">합계</span>
                <span className="text-xl font-bold">{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl p-4 text-center mb-6">
              <p className="text-xs text-[#666] mb-1">이 주문으로</p>
              <p className="text-xl font-bold">{getTotalDonation()}켤레</p>
              <p className="text-xs text-[#666] mt-1">기부됩니다</p>
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
