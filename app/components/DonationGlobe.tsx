'use client'

export default function DonationGlobe({ sockCount = 50, className = '' }: { sockCount?: number; className?: string }) {
  return (
    <div className={`w-full h-[400px] md:h-[600px] bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center rounded-lg ${className}`}>
      <div className="text-8xl mb-4 animate-bounce">🧦</div>
      <p className="text-gray-600 text-lg font-medium">기부통에 양말이 쌓이는 중...</p>
      <p className="text-gray-500 text-sm mt-2">{sockCount.toLocaleString()}켤레 기부 완료!</p>
    </div>
  )
}
