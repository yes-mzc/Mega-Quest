import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function DailyQuestShortcut() {
  return (
    <Link
      href="/quests?category=daily-monthly"
      className="flex w-full items-center justify-between rounded-xl bg-blue-600 px-5 py-4 text-white shadow-md active:bg-blue-700 transition-colors"
      aria-label="오늘의 일일 퀘스트 바로가기"
    >
      <div className="flex items-center gap-3">
        <Zap size={20} className="text-yellow-300" fill="currentColor" />
        <span className="font-semibold">오늘의 일일 퀘스트</span>
      </div>
      <span className="text-blue-200">→</span>
    </Link>
  )
}
