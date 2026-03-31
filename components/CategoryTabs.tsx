'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { QuestCategory } from '@/lib/types'

const TABS: { value: QuestCategory; label: string }[] = [
  { value: 'hr-beginner',    label: 'HR 초보자' },
  { value: 'role-specific',  label: '직군별 전직' },
  { value: 'daily-monthly',  label: '일일/월간' },
]

interface CategoryTabsProps {
  activeCategory: QuestCategory
}

export default function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = (category: QuestCategory) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', category)
    router.replace(`/quests?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="퀘스트 카테고리">
      {TABS.map(({ value, label }) => {
        const isActive = activeCategory === value
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(value)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
