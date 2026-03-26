import { create } from 'zustand'

interface DonationState {
  totalDonated: number
  incrementDonation: (amount: number) => void
}

export const useDonationStore = create<DonationState>((set) => ({
  totalDonated: 12847, // 초기 기부 누적량
  
  incrementDonation: (amount) => set((state) => ({
    totalDonated: state.totalDonated + amount
  }))
}))
