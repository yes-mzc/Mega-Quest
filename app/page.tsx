'use client'

import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import PetAvatar from '@/components/PetAvatar'
import PointsProgressBar from '@/components/PointsProgressBar'
import DailyQuestShortcut from '@/components/DailyQuestShortcut'
import QuickLinks from '@/components/QuickLinks'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const user = useGameStore((s) => s.user)
  const quests = useGameStore((s) => s.quests)

  const pendingDailyQuests = quests.filter(
    (q) => q.category === 'daily-monthly' && q.status !== 'completed'
  )

  return (
    <div className="flex flex-col gap-6 px-4 pt-8">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-400">안녕하세요 👋</p>
        <h1 className="text-xl font-bold text-gray-800">{user.name}님의 온보딩 퀘스트</h1>
        {user.title && (
          <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold text-yellow-700">
            🏆 {user.title}
          </span>
        )}
      </div>

      {/* 트리니티 펫 */}
      <div className="flex justify-center">
        <PetAvatar stage={user.petStage} />
      </div>

      {/* 포인트 프로그레스 바 */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-500">성장 현황</h2>
        <PointsProgressBar currentPoints={user.points} currentStage={user.petStage} />
      </div>

      {/* 바로가기 링크 */}
      <QuickLinks />

      {/* 일일 퀘스트 바로가기 */}
      <DailyQuestShortcut />

      {/* 미완료 일일 퀘스트 목록 */}
      {pendingDailyQuests.length > 0 ? (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500">오늘 남은 미션</h2>
            <span className="text-xs font-medium text-blue-500">{pendingDailyQuests.length}개</span>
          </div>
          <ul className="flex flex-col gap-2">
            {pendingDailyQuests.map((quest) => (
              <li key={quest.id}>
                <button
                  onClick={() => router.push(`/quests/${quest.id}`)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                  aria-label={`${quest.title} 미션 시작`}
                >
                  <span className="text-xl">🎯</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">{quest.title}</p>
                    <p className="text-xs text-blue-500">+{quest.rewardPoints}P</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-gray-300" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl bg-green-50 p-5 text-center">
          <p className="text-sm font-semibold text-green-600">🎉 오늘의 일일 미션을 모두 완료했어요!</p>
        </div>
      )}
    </div>
  )
}
