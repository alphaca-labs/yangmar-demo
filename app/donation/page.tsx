'use client'

import { useDonationStore } from '@/store/donation'
import { recipients } from '@/data/donations'
import RatioBar from '@/components/RatioBar'
import CheerWall from '@/components/CheerWall'
import MilestoneProgress from '@/components/MilestoneProgress'

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
        <p className="font-pixel text-[8px] text-[#FF69B4] mb-3 tracking-widest uppercase neon-pulse">DONATION STATUS</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">기부 현황</h1>
        <p className="text-[#888]">
          여러분의 따뜻한 마음이 모이고 있습니다
        </p>
        <div className="mt-8">
          <p className="text-5xl md:text-6xl font-bold text-neon-green"
            style={{ textShadow: '0 0 30px rgba(57,255,20,0.4)' }}>
            {totalDonated.toLocaleString()}
          </p>
          <p className="font-pixel text-[8px] text-[#888] mt-2">PAIRS DONATED</p>
        </div>
      </section>

      {/* 흑/백 비율 바 */}
      <section className="container-custom max-w-2xl mb-16">
        <RatioBar />
      </section>

      {/* 오늘의 승자 */}
      <section className="bg-[#111] py-12 mb-16 checker-pattern">
        <div className="container-custom text-center">
          <p className="font-pixel text-[8px] text-[#00FFFF] mb-3 tracking-widest uppercase neon-pulse">TODAY&apos;S WINNER</p>
          <div className="text-5xl mb-3">
            {winner === 'white' ? '🤍' : winner === 'black' ? '🖤' : '🤝'}
          </div>
          <p className="text-2xl font-bold text-white">
            {winner === 'white' ? 'WHITE SOCKS' : winner === 'black' ? 'BLACK SOCKS' : 'TIE!'}
          </p>
          <p className="text-sm mt-2" style={{ color: winner === 'white' ? '#00FFFF' : winner === 'black' ? '#FF69B4' : '#888' }}>
            {winner !== 'tie' ? `${sales[winner].toLocaleString()}켤레 판매` : ''}
          </p>
        </div>
      </section>

      {/* 마일스톤 */}
      <section className="container-custom max-w-2xl mb-16">
        <MilestoneProgress />
      </section>

      {/* 응원 메시지 월 */}
      <section className="bg-[#111] py-12 mb-16">
        <div className="container-custom max-w-lg">
          <CheerWall />
        </div>
      </section>

      {/* 일별 추세 차트 */}
      <section className="container-custom max-w-3xl mb-16">
        <h2 className="font-pixel text-[10px] mb-6 text-[#FF69B4] uppercase tracking-wider text-center neon-pulse">DAILY TREND</h2>
        <div className="space-y-3">
          {dailyHistory.map((day) => (
            <div key={day.date} className="flex items-center gap-4">
              <span className="font-pixel text-[7px] text-[#555] w-10 flex-shrink-0">{day.date}</span>
              <div className="flex-grow flex gap-1">
                <div className="flex-1 flex justify-end">
                  <div
                    className="h-6 flex items-center justify-end pr-2 transition-all"
                    style={{
                      width: `${(day.white / maxDaily) * 100}%`,
                      background: 'linear-gradient(90deg, transparent, #00FFFF)',
                    }}
                  >
                    <span className="font-pixel text-[7px] text-black">{day.white}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="h-6 flex items-center pl-2 transition-all"
                    style={{
                      width: `${(day.black / maxDaily) * 100}%`,
                      background: 'linear-gradient(90deg, #FF69B4, transparent)',
                    }}
                  >
                    <span className="font-pixel text-[7px] text-black">{day.black}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00FFFF]"></div>
            <span className="font-pixel text-[7px] text-[#888]">WHITE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF69B4]"></div>
            <span className="font-pixel text-[7px] text-[#888]">BLACK</span>
          </div>
        </div>
      </section>

      {/* 누적 판매량 비교 */}
      <section className="container-custom max-w-2xl mb-16">
        <h2 className="font-pixel text-[10px] mb-6 text-[#00FFFF] uppercase tracking-wider text-center neon-pulse">TOTAL SALES</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-[#00FFFF] bg-[#111] p-6 text-center" style={{ boxShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
            <div className="text-3xl mb-2">🤍</div>
            <p className="font-pixel text-[8px] text-[#00FFFF] mb-1">WHITE</p>
            <p className="text-3xl font-bold text-white">{sales.white.toLocaleString()}</p>
            <p className="font-pixel text-[7px] text-[#555] mt-1">/ 750</p>
          </div>
          <div className="border-2 border-[#FF69B4] bg-[#111] p-6 text-center" style={{ boxShadow: '0 0 10px rgba(255,105,180,0.2)' }}>
            <div className="text-3xl mb-2">🖤</div>
            <p className="font-pixel text-[8px] text-[#FF69B4] mb-1">BLACK</p>
            <p className="text-3xl font-bold text-white">{sales.black.toLocaleString()}</p>
            <p className="font-pixel text-[7px] text-[#555] mt-1">/ 750</p>
          </div>
        </div>
      </section>

      {/* 최근 구매 피드 */}
      <section className="bg-[#111] py-12 mb-16">
        <div className="container-custom max-w-lg">
          <h2 className="font-pixel text-[10px] mb-6 text-[#39FF14] uppercase tracking-wider text-center neon-pulse">RECENT BUYS</h2>
          <div className="space-y-2">
            {recentPurchases.map((purchase, i) => (
              <div key={i} className="border border-[#333] bg-[#0a0a0a] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>{purchase.color === 'white' ? '🤍' : '🖤'}</span>
                  <span className="text-sm text-[#ccc]">
                    {purchase.color} socks x{purchase.quantity}
                  </span>
                </div>
                <span className="font-pixel text-[7px] text-[#555]">{purchase.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기부처 */}
      <section className="container-custom max-w-3xl mb-16">
        <h2 className="font-pixel text-[10px] mb-6 text-[#FF69B4] uppercase tracking-wider text-center neon-pulse">PARTNERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="border-2 border-[#333] bg-[#111] p-6 hover:border-[#39FF14] transition-all">
              <h3 className="font-bold text-white mb-2">{recipient.name}</h3>
              <p className="text-sm text-[#888] mb-3">{recipient.description}</p>
              <a
                href={recipient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[8px] text-[#00FFFF] hover:text-[#39FF14] transition-colors"
              >
                VISIT SITE &#9654;
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
