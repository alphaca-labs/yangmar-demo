'use client'

import StaticLink from '@/components/StaticLink'
import dynamic from 'next/dynamic'
import { getBestSellers } from '@/data/products'
import ProductCard from '@/components/ProductCard'

const DonationGlobe = dynamic(() => import('@/components/DonationGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[600px] bg-gray-100 flex items-center justify-center">
      <p className="text-gray-400">기부통 로딩중...</p>
    </div>
  )
})

export default function Home() {
  const bestSellers = getBestSellers()

  return (
    <>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            한 켤레를 사면,<br />한 켤레가 기부됩니다
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            양마르와 함께하는 따뜻한 나눔
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StaticLink href="/products" className="btn-primary">
              양말 구경하기
            </StaticLink>
            <StaticLink href="/story" className="btn-secondary">
              브랜드 스토리
            </StaticLink>
          </div>
        </div>
      </section>

      {/* 3D 기부통 */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">실시간 기부 현황</h2>
            <p className="text-gray-600">
              투명한 기부통에 쌓이는 양말들을 확인하세요
            </p>
          </div>
          <DonationGlobe sockCount={50} />
          <div className="text-center mt-8">
            <StaticLink href="/donation" className="btn-secondary">
              자세히 보기
            </StaticLink>
          </div>
        </div>
      </section>

      {/* 베스트 상품 */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">베스트셀러</h2>
            <p className="text-gray-600">
              많은 분들이 선택한 양마르 인기 상품
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <StaticLink href="/products" className="btn-primary">
              전체 상품 보기
            </StaticLink>
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 티저 */}
      <section className="py-12 md:py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            왜 양마르인가?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            우리는 단순히 양말을 파는 것이 아닙니다.<br />
            당신의 소비가 누군가의 따뜻함이 되는 경험을 만듭니다.
          </p>
          <StaticLink href="/story" className="inline-block bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
            우리 이야기 더 보기
          </StaticLink>
        </div>
      </section>
    </>
  )
}
