import Modal from '@/components/ui/Modal'
import type { Quest } from '@/lib/types'

interface CompletionModalProps {
  isOpen: boolean
  quest: Quest | null
  onConfirm: () => void
}

export default function CompletionModal({ isOpen, quest, onConfirm }: CompletionModalProps) {
  if (!quest) return null

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">✅</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">미션 완료!</h2>
          <p className="mt-1 text-sm text-gray-500">{quest.title}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2">
          <span className="text-2xl font-extrabold text-blue-600">+{quest.rewardPoints}P</span>
          <span className="text-sm text-blue-400">획득</span>
        </div>
        <button
          onClick={onConfirm}
          className="mt-2 w-full rounded-xl bg-blue-600 py-3 font-bold text-white active:bg-blue-700 transition-colors"
          aria-label="확인하고 홈으로 이동"
        >
          확인
        </button>
      </div>
    </Modal>
  )
}
