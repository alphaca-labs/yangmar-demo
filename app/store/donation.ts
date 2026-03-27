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

interface DonationState {
  sales: SalesData
  dailyHistory: DailyData[]
  recentPurchases: { color: 'white' | 'black'; quantity: number; time: string }[]
  addSale: (color: 'white' | 'black', quantity: number) => void
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
