import StaticLink from '@/components/StaticLink'

export default function StoryPage() {
  return (
    <div className="py-12 md:py-16">
      {/* 히어로 */}
      <section className="py-16 md:py-24">
        <div className="container-custom text-center">
          <p className="font-pixel text-[8px] text-[#FF69B4] mb-4 tracking-widest uppercase neon-pulse">OUR STORY</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            1구매 = 1기부
          </h1>
          <p className="text-[#888] max-w-2xl mx-auto leading-relaxed">
            우리는 단순히 양말을 파는 것이 아닙니다.<br />
            당신의 소비가 누군가의 따뜻함이 되는 경험을 만듭니다.
          </p>
        </div>
      </section>

      {/* 스토리 1 */}
      <section className="border-t border-[#333] py-16">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">왜 양말인가?</h2>
          <div className="space-y-4 text-[#888] leading-relaxed">
            <p>
              양말은 작지만 강력한 도구입니다. 추운 겨울, 따뜻한 양말 한 켤레는
              단순히 발을 보호하는 것 이상의 의미를 갖습니다.
            </p>
            <p>
              노숙인과 취약계층에게 깨끗한 양말은 귀한 물품입니다.
              하지만 대부분의 기부는 옷이나 담요에 집중되어 있어,
              양말은 항상 부족합니다.
            </p>
            <p>
              우리는 이 간단하지만 중요한 필요를 채우고자 합니다.
              당신이 편안한 양말을 신는 순간, 누군가도 따뜻한 양말을 받게 됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 스토리 2 */}
      <section className="bg-[#111] py-16 checker-pattern">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">양마르의 시작</h2>
          <div className="space-y-4 text-[#888] leading-relaxed">
            <p>
              2024년 겨울, 우리는 물었습니다.
              &ldquo;어떻게 하면 소비를 더 의미있게 만들 수 있을까?&rdquo;
            </p>
            <p>
              복잡한 기부 절차도, 거창한 캠페인도 필요 없었습니다.
              그저 좋은 양말을 만들고, 구매할 때마다 자동으로 한 켤레가
              기부되는 구조. 그것이 전부였습니다.
            </p>
            <p>
              양마르는 이렇게 시작되었습니다.
              당신의 일상적인 구매가 자연스럽게 나눔으로 이어지는 브랜드.
            </p>
          </div>
        </div>
      </section>

      {/* 우리의 약속 */}
      <section className="py-16">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-bold mb-8 text-white">우리의 약속</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: '투명성', desc: '모든 기부는 추적 가능하며, 실시간으로 공개됩니다.' },
              { title: '품질', desc: '기부하는 양말도 당신이 신는 양말과 동일한 품질입니다.' },
              { title: '지속가능성', desc: '일회성 이벤트가 아닌, 지속 가능한 나눔 모델을 만듭니다.' },
              { title: '접근성', desc: '누구나 쉽게 참여할 수 있는 가격과 구조를 유지합니다.' },
            ].map((item) => (
              <div key={item.title} className="border-2 border-[#333] bg-[#111] p-6 hover:border-[#39FF14] transition-all">
                <h3 className="font-bold mb-2 text-[#39FF14]">{item.title}</h3>
                <p className="text-sm text-[#888]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#333] py-16">
        <div className="container-custom text-center max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">
            함께 만들어가요
          </h2>
          <p className="text-[#888] mb-8">
            양마르는 당신의 참여로 완성됩니다.
            오늘 하나 사면, 오늘 하나 기부됩니다.
          </p>
          <StaticLink href="/products" className="btn-primary inline-block">
            양말 둘러보기
          </StaticLink>
        </div>
      </section>
    </div>
  )
}
