'use client'

import dynamic from 'next/dynamic'
import { recipients, getActiveSeason } from '@/data/donations'

const DonationGlobe = dynamic(() => import('@/components/DonationGlobe'), {
  ssr: false
})

export default function DonationPage() {
  const activeSeason = getActiveSeason()

  return (
    <div className="py-12">
      {/* 히어로 */}
      <section className="container-custom text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          실시간 기부 현황
        </h1>
        <p className="text-lg text-gray-600">
          여러분의 따뜻한 마음이 모이고 있습니다
        </p>
      </section>

      {/* 3D 기부통 풀사이즈 */}
      <section className="container-custom mb-12">
        <DonationGlobe sockCount={80} className="h-[500px] md:h-[700px]" />
      </section>

      {/* 현재 시즌 */}
      {activeSeason && (
        <section className="bg-gray-50 py-12 mb-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {activeSeason.name}
              </h2>
              <div className="bg-white border-2 border-black p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">목표</span>
                    <span className="font-bold">{activeSeason.goal.toLocaleString()}켤레</span>
                  </div>
                  <div className="w-full bg-gray-200 h-4">
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{
                        width: `${Math.min((activeSeason.current / activeSeason.goal) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>현재 {activeSeason.current.toLocaleString()}켤레</span>
                    <span>{Math.round((activeSeason.current / activeSeason.goal) * 100)}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  기간: {activeSeason.startDate} ~ {activeSeason.endDate}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 기부처 */}
      <section className="container-custom mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">기부처</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="border border-gray-200 p-6 hover:border-black transition-colors">
              <div className="w-16 h-16 bg-gray-100 mb-4 flex items-center justify-center text-3xl">
                🏛️
              </div>
              <h3 className="text-xl font-bold mb-2">{recipient.name}</h3>
              <p className="text-gray-600 mb-4">{recipient.description}</p>
              <a
                href={recipient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:text-gray-600"
              >
                홈페이지 방문하기 →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 타임라인 */}
      <section className="bg-black text-white py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">기부 타임라인</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { date: '2026-03', count: 3420, desc: '2026년 3월 기부' },
              { date: '2026-02', count: 4681, desc: '2026년 2월 기부' },
              { date: '2026-01', count: 4746, desc: '2026년 1월 기부' },
              { date: '2025-12', count: 5234, desc: '2025년 12월 기부' },
            ].map((item) => (
              <div key={item.date} className="flex items-center gap-6">
                <div className="w-24 text-gray-400 text-sm">{item.date}</div>
                <div className="flex-grow">
                  <div className="bg-white bg-opacity-10 h-2 rounded">
                    <div
                      className="bg-white h-full rounded"
                      style={{ width: `${(item.count / 6000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-32 text-right font-bold">{item.count.toLocaleString()}켤레</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
