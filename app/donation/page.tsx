'use client'

import { useDonationStore } from '@/store/donation'
import { recipients } from '@/data/donations'
import RatioBar from '@/components/RatioBar'

export default function DonationPage() {
  const sales = useDonationStore(state => state.sales)
  const getTotalDonated = useDonationStore(state => state.getTotalDonated)
  const getWinner = useDonationStore(state => state.getWinner)
  const dailyHistory = useDonationStore(state => state.dailyHistory)
  const recentPurchases = useDonationStore(state => state.recentPurchases)

  const winner = getWinner()
  const totalDonated = getTotalDonated()
  const maxDaily = Math.max(...dailyHistory.map(d => Math.max(d.white, d.black)))

  return (
    <div className="py-12 md:py-16">
      {/* 히어로 */}
      <section className="container-custom text-center mb-16">
        <p className="text-sm text-[#666] mb-2 tracking-widest uppercase">donation status</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">기부 현황</h1>
        <p className="text-[#666]">
          여러분의 따뜻한 마음이 모이고 있습니다
        </p>
        <div className="mt-8">
          <p className="text-5xl md:text-6xl font-bold">{totalDonated.toLocaleString()}</p>
          <p className="text-sm text-[#666] mt-2">켤레 기부 완료</p>
        </div>
      </section>

      {/* 흑/백 비율 바 */}
      <section className="container-custom max-w-2xl mb-16">
        <RatioBar />
      </section>

      {/* 오늘의 승자 */}
      <section className="bg-[#F5F5F5] py-12 mb-16">
        <div className="container-custom text-center">
          <p className="text-sm text-[#666] mb-2 tracking-widest uppercase">today&apos;s winner</p>
          <div className="text-5xl mb-3">
            {winner === 'white' ? '🤍' : winner === 'black' ? '🖤' : '🤝'}
          </div>
          <p className="text-2xl font-bold">
            {winner === 'white' ? 'white socks' : winner === 'black' ? 'black socks' : '무승부!'}
          </p>
          <p className="text-sm text-[#666] mt-2">
            {winner !== 'tie' ? `${sales[winner].toLocaleString()}켤레 판매` : ''}
          </p>
        </div>
      </section>

      {/* 일별 추세 차트 */}
      <section className="container-custom max-w-3xl mb-16">
        <h2 className="text-sm font-bold mb-6 text-[#666] uppercase tracking-wider text-center">daily trend</h2>
        <div className="space-y-4">
          {dailyHistory.map((day) => (
            <div key={day.date} className="flex items-center gap-4">
              <span className="text-xs text-[#999] w-10 flex-shrink-0">{day.date}</span>
              <div className="flex-grow flex gap-1">
                <div className="flex-1 flex justify-end">
                  <div
                    className="h-6 bg-[#E0E0E0] rounded-l-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(day.white / maxDaily) * 100}%` }}
                  >
                    <span className="text-[10px] text-[#666]">{day.white}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="h-6 bg-[#1A1A1A] rounded-r-full flex items-center pl-2 transition-all"
                    style={{ width: `${(day.black / maxDaily) * 100}%` }}
                  >
                    <span className="text-[10px] text-white">{day.black}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E0E0E0]"></div>
            <span className="text-xs text-[#666]">white</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
            <span className="text-xs text-[#666]">black</span>
          </div>
        </div>
      </section>

      {/* 누적 판매량 비교 */}
      <section className="container-custom max-w-2xl mb-16">
        <h2 className="text-sm font-bold mb-6 text-[#666] uppercase tracking-wider text-center">total sales</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-[#E0E0E0] rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🤍</div>
            <p className="text-sm text-[#666] mb-1">white socks</p>
            <p className="text-3xl font-bold">{sales.white.toLocaleString()}</p>
            <p className="text-xs text-[#999] mt-1">/ 750켤레</p>
          </div>
          <div className="border border-[#E0E0E0] rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🖤</div>
            <p className="text-sm text-[#666] mb-1">black socks</p>
            <p className="text-3xl font-bold">{sales.black.toLocaleString()}</p>
            <p className="text-xs text-[#999] mt-1">/ 750켤레</p>
          </div>
        </div>
      </section>

      {/* 최근 구매 피드 */}
      <section className="bg-[#F5F5F5] py-12 mb-16">
        <div className="container-custom max-w-lg">
          <h2 className="text-sm font-bold mb-6 text-[#666] uppercase tracking-wider text-center">recent purchases</h2>
          <div className="space-y-3">
            {recentPurchases.map((purchase, i) => (
              <div key={i} className="bg-white rounded-xl px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>{purchase.color === 'white' ? '🤍' : '🖤'}</span>
                  <span className="text-sm">
                    {purchase.color} socks x{purchase.quantity}
                  </span>
                </div>
                <span className="text-xs text-[#999]">{purchase.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기부처 */}
      <section className="container-custom max-w-3xl mb-16">
        <h2 className="text-sm font-bold mb-6 text-[#666] uppercase tracking-wider text-center">donation partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="border border-[#E0E0E0] rounded-xl p-6">
              <h3 className="font-bold mb-2">{recipient.name}</h3>
              <p className="text-sm text-[#666] mb-3">{recipient.description}</p>
              <a
                href={recipient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#999] hover:text-[#1A1A1A] transition-colors"
              >
                홈페이지 방문 →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
