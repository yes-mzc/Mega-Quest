import ProgressBar from '@/components/ui/ProgressBar'
import { getProgressPercent, getNextStagePoints } from '@/lib/utils'

interface PointsProgressBarProps {
  currentPoints: number
  currentStage: 1 | 2 | 3
}

export default function PointsProgressBar({ currentPoints, currentStage }: PointsProgressBarProps) {
  const percent = getProgressPercent(currentPoints, currentStage)
  const nextStagePoints = getNextStagePoints(currentStage)

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-gray-800">
          <span className="text-2xl font-extrabold text-blue-600">{currentPoints}</span>
          <span className="ml-1 text-gray-500">P</span>
        </span>
        {nextStagePoints !== null ? (
          <span className="text-gray-400">
            다음 단계까지 <span className="font-semibold text-gray-600">{nextStagePoints - currentPoints}P</span>
          </span>
        ) : (
          <span className="font-semibold text-green-600">최고 단계 달성! 🎉</span>
        )}
      </div>
      <ProgressBar percent={percent} />
    </div>
  )
}
