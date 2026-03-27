import { create } from 'zustand'

interface SalesData {
  white: number
  black: number
}

interface DailyData {
  date: string
  white: number
  black: number
}

export interface Pledge {
  team: 'white' | 'black'
  title: string
  description: string
  deadline: string
}

export interface CheerMessage {
  id: string
  text: string
  emoji: string
  team: 'white' | 'black'
  createdAt: number
}

export interface Milestone {
  target: number
  reward: string
  description: string
  achieved: boolean
  secret?: boolean
}

interface DonationState {
  sales: SalesData
  dailyHistory: DailyData[]
  recentPurchases: { color: 'white' | 'black'; quantity: number; time: string }[]
  pledges: Pledge[]
  cheerMessages: CheerMessage[]
  milestones: Milestone[]
  deadline: string
  addSale: (color: 'white' | 'black', quantity: number) => void
  addCheerMessage: (msg: Omit<CheerMessage, 'id' | 'createdAt'>) => void
  getTotalDonated: () => number
  getWhitePercent: () => number
  getBlackPercent: () => number
  getWinner: () => 'white' | 'black' | 'tie'
}

export const useDonationStore = create<DonationState>((set, get) => ({
  sales: { white: 350, black: 320 },

  dailyHistory: [
    { date: '3/21', white: 42, black: 38 },
    { date: '3/22', white: 55, black: 48 },
    { date: '3/23', white: 38, black: 52 },
    { date: '3/24', white: 61, black: 44 },
    { date: '3/25', white: 47, black: 56 },
    { date: '3/26', white: 58, black: 42 },
    { date: '3/27', white: 49, black: 40 },
  ],

  recentPurchases: [
    { color: 'white', quantity: 2, time: '3분 전' },
    { color: 'black', quantity: 1, time: '7분 전' },
    { color: 'white', quantity: 3, time: '12분 전' },
    { color: 'black', quantity: 2, time: '18분 전' },
    { color: 'black', quantity: 1, time: '25분 전' },
  ],

  pledges: [
    {
      team: 'black',
      title: '추가 100켤레 아동센터 기부',
      description: '블랙이 이기면 추가 100켤레를 아동센터에 기부합니다',
      deadline: '2026-04-10',
    },
    {
      team: 'white',
      title: '지역 양로원 직접 방문 전달',
      description: '화이트가 이기면 지역 양로원에 직접 방문 전달합니다',
      deadline: '2026-04-10',
    },
  ],

  cheerMessages: [
    { id: '1', text: '따뜻한 겨울 보내세요!', emoji: '🧦', team: 'white', createdAt: Date.now() - 60000 },
    { id: '2', text: '블랙팀 파이팅!', emoji: '🔥', team: 'black', createdAt: Date.now() - 120000 },
    { id: '3', text: '양말 한 켤레의 기적', emoji: '🧦', team: 'white', createdAt: Date.now() - 180000 },
    { id: '4', text: '함께라서 가능한 나눔', emoji: '✨', team: 'black', createdAt: Date.now() - 240000 },
    { id: '5', text: '작은 선물, 큰 따뜻함', emoji: '🤍', team: 'white', createdAt: Date.now() - 300000 },
    { id: '6', text: '화이트팀 화이팅!', emoji: '❤️', team: 'white', createdAt: Date.now() - 360000 },
    { id: '7', text: '기부는 사랑입니다', emoji: '✨', team: 'black', createdAt: Date.now() - 420000 },
    { id: '8', text: '모두 힘내요!', emoji: '👍', team: 'white', createdAt: Date.now() - 480000 },
    { id: '9', text: '블랙 양말 최고!', emoji: '🔥', team: 'black', createdAt: Date.now() - 540000 },
    { id: '10', text: '따뜻한 마음 전합니다', emoji: '🤍', team: 'white', createdAt: Date.now() - 600000 },
  ],

  milestones: [
    { target: 100, reward: '무료배송 이벤트', description: '전 구매자 무료배송 적용', achieved: true },
    { target: 300, reward: '한정판 스티커 동봉', description: '양마르 한정 스티커 전원 증정', achieved: true },
    { target: 500, reward: '양마르 에코백 증정', description: '500켤레 달성 시 에코백 전원 증정', achieved: false },
    { target: 750, reward: '시크릿 이벤트 ??', description: '완판 달성 시 특별 이벤트', achieved: false, secret: true },
  ],

  deadline: '2026-04-10',

  addSale: (color, quantity) => set((state) => ({
    sales: {
      ...state.sales,
      [color]: state.sales[color] + quantity,
    },
    recentPurchases: [
      { color, quantity, time: '방금 전' },
      ...state.recentPurchases.slice(0, 9),
    ],
  })),

  addCheerMessage: (msg) => set((state) => ({
    cheerMessages: [
      { ...msg, id: Date.now().toString(), createdAt: Date.now() },
      ...state.cheerMessages.slice(0, 19),
    ],
  })),

  getTotalDonated: () => {
    const { sales } = get()
    return sales.white + sales.black
  },

  getWhitePercent: () => {
    const { sales } = get()
    const total = sales.white + sales.black
    if (total === 0) return 50
    return Math.round((sales.white / total) * 100)
  },

  getBlackPercent: () => {
    const { sales } = get()
    const total = sales.white + sales.black
    if (total === 0) return 50
    return Math.round((sales.black / total) * 100)
  },

  getWinner: () => {
    const { sales } = get()
    if (sales.white > sales.black) return 'white'
    if (sales.black > sales.white) return 'black'
    return 'tie'
  },
}))
