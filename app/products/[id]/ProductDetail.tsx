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
        <h1 className="text-2xl font-bold mb-4 text-white">상품을 찾을 수 없습니다</h1>
        <a href={`${basePath}/products/`} className="btn-primary inline-block">
          상품 목록으로
        </a>
      </div>
    )
  }

  const isWhite = product.color === 'white'
  const accentColor = isWhite ? '#00FFFF' : '#FF69B4'
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
        <div className="aspect-square border-2 flex items-center justify-center relative dot-pattern" style={{
          backgroundColor: '#0a0a0a',
          borderColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}20`,
        }}>
          <span className="text-[120px]">{isWhite ? '🤍' : '🖤'}</span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="font-pixel text-[#FF69B4] text-lg tracking-widest">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div>
          <p className="font-pixel text-xs tracking-wide mb-1" style={{ color: accentColor }}>{product.nameEn.toUpperCase()}</p>
          <p className="text-sm text-[#888] mb-6">{product.description}</p>

          <p className="text-3xl font-bold mb-6 text-white">{product.price.toLocaleString()}원</p>

          {/* 재고 표시 */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#333]">
            <span className="font-pixel text-[7px] text-[#888]">STOCK</span>
            <span className="font-pixel text-[8px] text-[#39FF14]">{remaining} / {MAX_STOCK}</span>
            {isLow && (
              <span className="font-pixel text-[7px] px-2 py-0.5" style={{ backgroundColor: accentColor, color: '#000' }}>
                LOW!
              </span>
            )}
          </div>

          {/* 수량 선택 */}
          {!isSoldOut && (
            <div className="mb-6">
              <label className="block font-pixel text-[7px] text-[#888] mb-3">QTY</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-[#333] text-white font-bold hover:border-[#39FF14] transition-colors"
                >-</button>
                <span className="text-xl font-semibold w-12 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                  className="w-10 h-10 border-2 border-[#333] text-white font-bold hover:border-[#39FF14] transition-colors"
                >+</button>
              </div>
            </div>
          )}

          {/* 기부 안내 */}
          {!isSoldOut && (
            <div className="mb-8 p-5 border-2 border-[#39FF14] bg-[#0a0a0a] text-center" style={{ boxShadow: '0 0 15px rgba(57,255,20,0.2)' }}>
              <p className="font-pixel text-[7px] text-[#888] mb-1">DONATION EFFECT</p>
              <p className="text-2xl font-bold mb-1 text-[#39FF14]">{quantity}켤레</p>
              <p className="font-pixel text-[7px] text-[#888]">DONATED</p>
            </div>
          )}

          {/* 장바구니 담기 */}
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`w-full py-4 font-bold text-lg transition-all ${
              isSoldOut
                ? 'bg-[#333] text-[#666] cursor-not-allowed border-2 border-[#333]'
                : 'bg-[#39FF14] text-black border-2 border-[#39FF14] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]'
            }`}
          >
            {isSoldOut ? 'SOLD OUT' : `장바구니 담기 · ${totalPrice.toLocaleString()}원`}
          </button>

          {/* 상품 정보 */}
          <div className="mt-10 pt-8 border-t border-[#333]">
            <h3 className="font-pixel text-[8px] text-[#FF69B4] mb-4 uppercase tracking-wider">PRODUCT INFO</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="w-20 text-[#666]">소재</dt>
                <dd className="text-[#ccc]">{product.material}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#666]">사이즈</dt>
                <dd className="text-[#ccc]">{product.size}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#666]">세탁법</dt>
                <dd className="text-[#ccc]">{product.washingInstructions}</dd>
              </div>
              <div className="flex">
                <dt className="w-20 text-[#666]">원산지</dt>
                <dd className="text-[#ccc]">{product.madeIn}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
