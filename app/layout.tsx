import type { Metadata } from 'next'
import './globals.css'
import DonationCounter from '@/components/DonationCounter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '양마르 - 한 켤레를 사면, 한 켤레가 기부됩니다',
  description: '캐주얼 양말 브랜드 양마르. 1구매 = 1기부로 따뜻한 나눔을 실천합니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-[#0a0a0a]">
        <DonationCounter />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
