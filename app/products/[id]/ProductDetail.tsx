'use client'

import { useState } from 'react'
import { getProductById } from '@/data/products'
import { useCartStore } from '@/store/cart'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function ProductDetail({ id }: { id: string }) {
  const product = getProductById(id)
  const addItem = useCartStore(state => state.addItem)

  const [bundle, setBundle] = useState<1 | 3 | 5 | 10>(1)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <a href={`${basePath}/products/`} className="btn-primary">
          상품 목록으로
        </a>
      </div>
    )
  }

  const bundlePrices = {
    1: product.price,
    3: product.price * 3 * 0.95,
    5: product.price * 5 * 0.90,
    10: product.price * 10 * 0.85,
  }

  const totalDonation = bundle * quantity
  const totalPrice = bundlePrices[bundle] * quantity

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${bundle}`,
      name: `${product.name} (${bundle}켤레)`,
      price: bundlePrices[bundle],
      quantity,
      bundle,
      image: product.images[0]
    })
    window.location.href = `${basePath}/cart/`
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-200 flex items-center justify-center">
            <span className="text-9xl">🧦</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <label className="block font-semibold mb-3">번들 선택</label>
            <div className="grid grid-cols-4 gap-2">
              {([1, 3, 5, 10] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBundle(b)}
                  className={`py-3 border-2 font-semibold transition-all ${
                    bundle === b
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {b}켤레
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">묶음 가격</span>
              <span className="text-2xl font-bold">
                ₩{bundlePrices[bundle].toLocaleString()}
              </span>
            </div>
            {bundle > 1 && (
              <p className="text-sm text-green-600">
                개별 구매보다 {Math.round((1 - bundlePrices[bundle] / (product.price * bundle)) * 100)}% 저렴해요!
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-3">수량</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
              >-</button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
              >+</button>
            </div>
          </div>

          <div className="mb-8 p-6 bg-black text-white text-center">
            <p className="text-sm mb-2">이 주문으로</p>
            <p className="text-3xl font-bold mb-2">🎁 {totalDonation}켤레</p>
            <p className="text-sm">기부됩니다</p>
          </div>

          <div className="space-y-3">
            <button onClick={handleAddToCart} className="w-full btn-primary">
              장바구니 담기 · ₩{totalPrice.toLocaleString()}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-4">상품 정보</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex">
                <dt className="w-24 text-gray-600">소재</dt>
                <dd>{product.material}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-600">사이즈</dt>
                <dd>{product.size}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-600">세탁법</dt>
                <dd>{product.washingInstructions}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-600">원산지</dt>
                <dd>{product.madeIn}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
