'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import type { QuestCategory } from '@/lib/types'
import CategoryTabs from '@/components/CategoryTabs'
import QuestCard from '@/components/QuestCard'

const DEFAULT_CATEGORY: QuestCategory = 'hr-beginner'

function QuestListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quests = useGameStore((s) => s.quests)

  const rawCategory = searchParams.get('category')
  const validCategories: QuestCategory[] = [
    'hr-beginner',
    'role-specific',
    'daily-monthly',
    'pre-boarding',
    'day-one',
    'mandatory-training',
    'company-culture',
  ]
  const activeCategory: QuestCategory = validCategories.includes(rawCategory as QuestCategory)
    ? (rawCategory as QuestCategory)
    : DEFAULT_CATEGORY

  const filtered = quests.filter((q) => q.category === activeCategory)
  const completedCount = filtered.filter((q) => q.status === 'completed').length

  return (
    <div className="flex flex-col gap-4 px-4 pt-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">퀘스트 로드맵</h1>
        <p className="text-sm text-gray-400">미션을 완료하고 트리니티 펫을 키워보세요!</p>
      </div>

      <CategoryTabs activeCategory={activeCategory} />

      <div className="text-xs text-gray-400">
        {completedCount}/{filtered.length} 완료
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onClick={() => router.push(`/quests/${quest.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default function QuestsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center pt-20 text-gray-400">
        로딩 중...
      </div>
    }>
      <QuestListContent />
    </Suspense>
  )
}
