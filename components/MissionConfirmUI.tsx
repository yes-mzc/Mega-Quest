'use client'

import { Loader2, CheckCircle2 } from 'lucide-react'
import type { Quest } from '@/lib/types'

interface MissionConfirmUIProps {
  quest: Quest
  isLoading: boolean
  isConfirmed: boolean
  onConfirm: () => void
}

export default function MissionConfirmUI({
  quest,
  isLoading,
  isConfirmed,
  onConfirm,
}: MissionConfirmUIProps) {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-between px-6 py-10">
      {/* 퀘스트 정보 */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <span className="text-4xl">🎯</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{quest.title}</h2>
        <p className="text-sm text-gray-400">{quest.description}</p>
        <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
          +{quest.rewardPoints}P 획득 예정
        </span>
      </div>

      {/* 상태 표시 영역 */}
      <div className="flex flex-col items-center gap-3">
        {isLoading && (
          <>
            <Loader2 size={40} className="animate-spin text-blue-500" />
            <p className="text-sm font-medium text-gray-500">확인하는 중...</p>
          </>
        )}
        {isConfirmed && !isLoading && (
          <>
            <CheckCircle2 size={48} className="text-green-500" />
            <p className="text-lg font-bold text-green-600">확인되었습니다! ✅</p>
          </>
        )}
        {!isLoading && !isConfirmed && (
          <p className="text-base font-semibold text-gray-600">달성하셨나요?</p>
        )}
      </div>

      {/* 확인 버튼 */}
      <button
        onClick={onConfirm}
        disabled={isLoading || isConfirmed}
        className={`w-full max-w-xs rounded-2xl py-4 text-lg font-bold transition-all ${
          isLoading || isConfirmed
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 active:scale-95 hover:bg-blue-700'
        }`}
        aria-label="미션 달성 확인"
      >
        {isLoading ? '확인 중...' : isConfirmed ? '처리 중...' : '확인'}
      </button>
    </div>
  )
}
