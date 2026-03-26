export interface DonationRecipient {
  id: string
  name: string
  logo: string
  description: string
  website: string
}

export interface Season {
  id: string
  name: string
  startDate: string
  endDate: string
  goal: number
  current: number
  recipients: string[]
  isActive: boolean
}

export const recipients: DonationRecipient[] = [
  {
    id: 'salvation-army',
    name: '구세군',
    logo: '/images/recipient-salvation-army.png',
    description: '노숙인과 취약계층을 위한 지원 활동',
    website: 'https://www.salvationarmy.or.kr'
  },
  {
    id: 'beautiful-store',
    name: '아름다운가게',
    logo: '/images/recipient-beautiful-store.png',
    description: '나눔과 순환의 가치를 실천하는 사회적 기업',
    website: 'https://www.beautifulstore.org'
  }
]

export const seasons: Season[] = [
  {
    id: 'winter-2026',
    name: '2026 겨울 따뜻한 발걸음',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    goal: 20000,
    current: 12847,
    recipients: ['salvation-army', 'beautiful-store'],
    isActive: true
  },
  {
    id: 'fall-2025',
    name: '2025 가을 나눔 캠페인',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    goal: 15000,
    current: 18234,
    recipients: ['salvation-army'],
    isActive: false
  }
]

export const getActiveSeason = () => seasons.find(s => s.isActive)
export const getRecipientById = (id: string) => recipients.find(r => r.id === id)
