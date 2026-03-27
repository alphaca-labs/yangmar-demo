'use client'

import { useState } from 'react'
import { getProductById, MAX_STOCK } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useDonationStore } from '@/store/donation'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function ProductDetail({ id }: { id: string }) {
  const product = getProductById(id)
  const addItem = useCartStore(state => state.addItem)
  const sales = useDonationStore(state => state.sales)

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <a href={`${basePath}/products/`} className="btn-primary inline-block">
          상품 목록으로
        </a>
      </div>
    )
  }

  const sold = sales[product.color]
  const remaining = MAX_STOCK - sold
  const isSoldOut = remaining <= 0
  const isLow = remaining > 0 && remaining <= 50
  const maxQty = Math.min(remaining, 20)

  const totalPrice = product.price * quantity

  const handleAddToCart = () => {
    if (isSoldOut) return
    addItem({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      color: product.color,
      price: product.price,
      quantity,
      image: product.images[0]
    })
    window.location.href = `${basePath}/cart/`
  }

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* 상품 이미지 */}
        <div className="aspect-square rounded-lg flex items-center justify-center relative" style={{
          backgroundColor: product.color === 'white' ? '#F5F5F5' : '#1A1A1A'
        }}>
          <span className="text-[120px]">{product.color === 'white' ? '🤍' : '🖤'}</span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
              <span className="text-white text-3xl font-bold tracking-widest">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div>
          <p className="text-2xl tracking-wide mb-1">{product.nameEn}</p>
          <p className="text-sm text-[#666] mb-6">{product.description}</p>

          <p className="text-3xl font-bold mb-6">{product.price.toLocaleString()}원</p>

          {/* 재고 표시 */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E0E0E0]">
            <span className="text-sm text-[#666]">남은 수량</span>
            <span className="text-sm font-bold">{remaining} / {MAX_STOCK}</span>
            {isLow && <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full">마감 임박!</span>}
          </div>

          {/* 수량 선택 */}
          {!isSoldOut && (
            <div className="mb-6">
              <label className="block text-sm text-[#666] mb-3">수량</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#E0E0E0] rounded-lg font-bold hover:bg-[#F5F5F5] transition-colors"
                >-</button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  className="w-10 h-10 border border-[#E0E0E0] rounded-lg font-bold hover:bg-[#F5F5F5] transition-colors"
                >+</button>
              </div>
            </div>
          )}

          {/* 기부 안내 */}
          {!isSoldOut && (
            <div className="mb-8 p-5 bg-[#F5F5F5] rounded-xl text-center">
              <p className="text-sm text-[#666] mb-1">이 주문으로</p>
              <p className="text-2xl font-bold mb-1">{quantity}켤레</p>
              <p className="text-sm text-[#666]">기부됩니다</p>
            </div>
          )}

          {/* 장바구니 담기 */}
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
              isSoldOut
                ? 'bg-[#E0E0E0] text-[#999] cursor-not-allowed'
                : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
            }`}
          >
            {isSoldOut ? 'SOLD OUT' : `장바구니 담기 · ${totalPrice.toLocaleString()}원`}
          </button>

          {/* 상품 정보 */}
          <div className="mt-10 pt-8 border-t border-[#E0E0E0]">
            <h3 className="text-sm font-bold mb-4 text-[#666] uppercase tracking-wider">product info</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="w-20 text-[#999]">소재</dt>
                <dd>{product.material}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#999]">사이즈</dt>
                <dd>{product.size}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#999]">세탁법</dt>
                <dd>{product.washingInstructions}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#999]">원산지</dt>
                <dd>{product.madeIn}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
