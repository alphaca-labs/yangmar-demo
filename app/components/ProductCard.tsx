import StaticLink from '@/components/StaticLink'
import { Product, MAX_STOCK } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  const sold = MAX_STOCK - product.stock
  const remaining = product.stock - sold
  const isSoldOut = remaining <= 0
  const isLow = remaining > 0 && remaining <= 50

  return (
    <StaticLink href={`/products/${product.id}`} className="group block">
      <div className="border-2 border-[#1A1A1A] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative flex items-center justify-center" style={{
          backgroundColor: product.color === 'white' ? '#F5F5F5' : '#1A1A1A'
        }}>
          <span className="text-8xl">{product.color === 'white' ? '🤍' : '🖤'}</span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-2xl font-bold tracking-widest">SOLD OUT</span>
            </div>
          )}
          {isLow && !isSoldOut && (
            <span className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-xs px-3 py-1 rounded-full font-semibold">
              마감 임박!
            </span>
          )}
        </div>
        <div className="p-6 text-center">
          <p className="text-lg tracking-wide mb-1 group-hover:underline">{product.nameEn}</p>
          <p className="text-xs text-[#666] mb-3">{product.description}</p>
          <p className="text-xl font-bold mb-2">{product.price.toLocaleString()}원</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-[#666]">남은 수량</span>
            <span className="text-xs font-bold">{remaining}/{MAX_STOCK}</span>
          </div>
        </div>
      </div>
    </StaticLink>
  )
}
