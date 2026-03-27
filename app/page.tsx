import SockDropHero from '@/components/SockDropHero'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import RatioBar from '@/components/RatioBar'
import StaticLink from '@/components/StaticLink'

export default function Home() {
  return (
    <>
      {/* 히어로 */}
      <SockDropHero />

      {/* 흑/백 점유율 비율 바 */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-6">
            <p className="text-sm text-[#666] mb-1">white vs black</p>
            <h2 className="text-xl font-bold">지금 어떤 팀이 이기고 있을까?</h2>
          </div>
          <RatioBar />
          <p className="text-center text-xs text-[#999] mt-4">
            구매할 때마다 실시간 반영됩니다
          </p>
        </div>
      </section>

      {/* 상품 2종 */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm text-[#666] mb-1 tracking-widest uppercase">pick your side</p>
            <h2 className="text-2xl md:text-3xl font-bold">당신은 어떤 팀?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 티저 */}
      <section className="py-16 md:py-24 border-t border-[#E0E0E0]">
        <div className="container-custom text-center max-w-2xl">
          <p className="text-sm text-[#666] mb-4 tracking-widest uppercase">our story</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            왜 양마르인가?
          </h2>
          <p className="text-[#666] mb-8 leading-relaxed">
            우리는 단순히 양말을 파는 것이 아닙니다.<br />
            당신의 소비가 누군가의 따뜻함이 되는 경험을 만듭니다.
          </p>
          <StaticLink href="/story" className="btn-secondary">
            우리 이야기 더 보기
          </StaticLink>
        </div>
      </section>
    </>
  )
}
