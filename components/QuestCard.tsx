import type { Quest } from '@/lib/types'
import Badge from '@/components/ui/Badge'
import { Lock, ChevronRight } from 'lucide-react'

interface QuestCardProps {
  quest: Quest
  onClick?: () => void
}

export default function QuestCard({ quest, onClick }: QuestCardProps) {
  const isLocked = quest.status === 'locked'
  const isCompleted = quest.status === 'completed'

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-sm text-left transition-all ${
        isLocked
          ? 'opacity-50 cursor-not-allowed'
          : 'active:scale-[0.98] hover:shadow-md cursor-pointer'
      } ${isCompleted ? 'border border-green-100' : ''}`}
      aria-label={`${quest.title} — ${quest.status}`}
    >
      {/* 상태 아이콘 */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
        isCompleted ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-blue-50'
      }`}>
        {isLocked ? (
          <Lock size={18} className="text-gray-400" />
        ) : isCompleted ? (
          <span className="text-lg">✅</span>
        ) : (
          <span className="text-lg">🎯</span>
        )}
      </div>

      {/* 텍스트 */}
      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
          {quest.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Badge status={quest.status} />
          <span className="text-xs text-gray-400">+{quest.rewardPoints}P</span>
        </div>
      </div>

      {/* 화살표 */}
      {!isLocked && !isCompleted && (
        <ChevronRight size={18} className="shrink-0 text-gray-300" />
      )}
    </button>
  )
}
