import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <p className="text-sm text-[#666] mb-1 tracking-widest uppercase">shop</p>
        <h1 className="text-3xl font-bold mb-2">양마르 양말</h1>
        <p className="text-[#666]">
          원사이즈 · 각 750켤레 한정
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
