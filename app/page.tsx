import SockDropHero from '@/components/SockDropHero'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import RatioBar from '@/components/RatioBar'
import StaticLink from '@/components/StaticLink'
import PledgeCards from '@/components/PledgeCards'
import MilestoneProgress from '@/components/MilestoneProgress'
import SockRelay from '@/components/SockRelay'

export default function Home() {
  return (
    <>
      {/* 히어로 */}
      <SockDropHero />

      {/* 양말 릴레이 배너 */}
      <section className="py-6 bg-[#0a0a0a]">
        <div className="container-custom max-w-2xl">
          <SockRelay variant="banner" />
        </div>
      </section>

      {/* 흑/백 점유율 비율 바 */}
      <section className="py-12 bg-[#111] checker-pattern">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-6">
            <p className="font-pixel text-[8px] text-[#888] mb-2">WHITE vs BLACK</p>
            <h2 className="text-xl font-bold text-white">지금 어떤 팀이 이기고 있을까?</h2>
          </div>
          <RatioBar />
          <p className="text-center font-pixel text-[7px] text-[#555] mt-4">
            REAL-TIME UPDATE
          </p>

          {/* 공약 카드 */}
          <div className="mt-8">
            <PledgeCards />
          </div>
        </div>
      </section>

      {/* 마일스톤 */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="container-custom max-w-2xl">
          <MilestoneProgress compact />
        </div>
      </section>

      {/* 상품 2종 */}
      <section className="py-16 md:py-24 bg-[#111] dot-pattern">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="font-pixel text-[8px] text-[#FF69B4] mb-2 tracking-widest uppercase neon-pulse">PICK YOUR SIDE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">당신은 어떤 팀?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 티저 */}
      <section className="py-16 md:py-24 border-t-2 border-[#333] bg-[#0a0a0a]">
        <div className="container-custom text-center max-w-2xl">
          <p className="font-pixel text-[8px] text-[#00FFFF] mb-4 tracking-widest uppercase neon-pulse">OUR STORY</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            왜 양마르인가?
          </h2>
          <p className="text-[#888] mb-8 leading-relaxed">
            우리는 단순히 양말을 파는 것이 아닙니다.<br />
            당신의 소비가 누군가의 따뜻함이 되는 경험을 만듭니다.
          </p>
          <StaticLink href="/story" className="btn-secondary inline-block">
            우리 이야기 더 보기
          </StaticLink>
        </div>
      </section>
    </>
  )
}
