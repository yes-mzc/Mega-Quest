import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Quest } from '@/lib/types'
import { initialUser, initialQuests } from '@/lib/mockData'
import { getPetStage } from '@/lib/utils'

interface GameStore {
  user: User
  quests: Quest[]
  completeQuest: (questId: string) => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      user: initialUser,
      quests: initialQuests,

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

      resetGame: () =>
        set({ user: { ...initialUser }, quests: [...initialQuests] }),
    }),
    {
      name: 'mega-quest-storage',
      version: 2, // mockData 변경 시 버전 올리면 localStorage 자동 초기화
    }
  )
)
