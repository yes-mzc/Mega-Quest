import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Quest } from '@/lib/types'
import { initialUser, initialQuests } from '@/lib/mockData'
import { getPetStage } from '@/lib/utils'

interface GameStore {
  user: User
  quests: Quest[]
  purchasedItems: string[]
  completeQuest: (questId: string) => void
  purchaseItem: (itemId: string, pointCost: number) => boolean
  resetGame: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: initialUser,
      quests: initialQuests,
      purchasedItems: [],

      completeQuest: (questId: string) =>
        set((state) => {
          const quest = state.quests.find((q) => q.id === questId)
          if (!quest || quest.status !== 'available') return state

          const newPoints = state.user.points + quest.rewardPoints
          const newStage = getPetStage(newPoints)

          return {
            user: { ...state.user, points: newPoints, petStage: newStage },
            quests: state.quests.map((q) =>
              q.id === questId ? { ...q, status: 'completed' as const } : q
            ),
          }
        }),

      purchaseItem: (itemId: string, pointCost: number) => {
        const state = get()
        if (state.user.points < pointCost) return false
        set({
          user: { ...state.user, points: state.user.points - pointCost },
          purchasedItems: [...state.purchasedItems, itemId],
        })
        return true
      },

      resetGame: () =>
        set({ user: { ...initialUser }, quests: [...initialQuests], purchasedItems: [] }),
    }),
    {
      name: 'mega-quest-storage',
      version: 6, // mockData 변경 시 버전 올리면 localStorage 자동 초기화
    }
  )
)
