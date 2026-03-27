import StaticLink from '@/components/StaticLink'
import { Product } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <StaticLink href={`/products/${product.id}`} className="group">
      <div className="border border-gray-200 hover:border-black transition-all overflow-hidden">
        <div className="aspect-square bg-gray-100 relative">
          {/* 이미지 플레이스홀더 - 실제 이미지가 없으므로 색상으로 표시 */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            <span className="text-6xl">🧦</span>
          </div>
          {product.bestSeller && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 font-semibold">
              BEST
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1 group-hover:underline">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="font-bold">₩{product.price.toLocaleString()}</p>
            <span className="text-xs bg-gray-100 px-2 py-1">1켤레 기부</span>
          </div>
        </div>
      </div>
    </StaticLink>
  )
}
