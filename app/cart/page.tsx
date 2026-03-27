'use client'

import { useCartStore } from '@/store/cart'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalDonation, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">장바구니가 비어있습니다</h1>
        <p className="text-gray-600 mb-8">양마르의 따뜻한 양말을 만나보세요</p>
        <a href={`${basePath}/products/`} className="btn-primary">
          상품 보러가기
        </a>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-4xl">🧦</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.bundle}켤레 묶음 · 1세트당 ₩{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 border border-gray-300 hover:border-black"
                  >-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-gray-300 hover:border-black"
                  >+</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-sm text-gray-600 hover:text-black"
                  >삭제</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₩{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border-2 border-black p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">주문 요약</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">상품 금액</span>
                <span className="font-semibold">₩{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배송비</span>
                <span className="font-semibold">무료</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-bold">총 결제금액</span>
                <span className="text-2xl font-bold">₩{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-black text-white p-4 text-center mb-6">
              <p className="text-sm mb-1">이 주문으로</p>
              <p className="text-2xl font-bold">🎁 {getTotalDonation()}켤레</p>
              <p className="text-sm mt-1">기부됩니다</p>
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
