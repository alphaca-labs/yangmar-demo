import StaticLink from '@/components/StaticLink'
import { Product, MAX_STOCK } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  const sold = MAX_STOCK - product.stock
  const remaining = product.stock - sold
  const isSoldOut = remaining <= 0
  const isLow = remaining > 0 && remaining <= 50

  const isWhite = product.color === 'white'
  const accentColor = isWhite ? '#00FFFF' : '#FF69B4'

  return (
    <StaticLink href={`/products/${product.id}`} className="group block">
      <div
        className="border-2 overflow-hidden hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all bg-[#111]"
        style={{ borderColor: accentColor }}
      >
        <div className="aspect-square relative flex items-center justify-center" style={{
          backgroundColor: isWhite ? '#0a0a0a' : '#111',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}>
          <span className="text-8xl">{isWhite ? '🤍' : '🖤'}</span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="font-pixel text-[#FF69B4] text-sm tracking-widest">SOLD OUT</span>
            </div>
          )}
          {isLow && !isSoldOut && (
            <span
              className="absolute top-3 right-3 text-black text-xs px-3 py-1 font-bold font-pixel text-[8px]"
              style={{ backgroundColor: accentColor }}
            >
              LOW STOCK!
            </span>
          )}
        </div>
        <div className="p-6 text-center border-t-2" style={{ borderColor: accentColor }}>
          <p className="font-pixel text-[10px] tracking-wide mb-2 group-hover:text-[#39FF14] transition-colors" style={{ color: accentColor }}>
            {product.nameEn.toUpperCase()}
          </p>
          <p className="text-xs text-[#666] mb-3">{product.description}</p>
          <p className="text-xl font-bold text-white mb-2">{product.price.toLocaleString()}원</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-pixel text-[7px] text-[#555]">STOCK</span>
            <span className="font-pixel text-[8px] text-[#39FF14]">{remaining}/{MAX_STOCK}</span>
          </div>
        </div>
      </div>
    </StaticLink>
  )
}
