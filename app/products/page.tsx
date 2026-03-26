import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">전체 상품</h1>
        <p className="text-gray-600">
          양마르의 모든 양말을 만나보세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
