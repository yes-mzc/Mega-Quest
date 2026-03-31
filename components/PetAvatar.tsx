import Image from 'next/image'
import { petStageConfig } from '@/lib/mockData'

interface PetAvatarProps {
  stage: 1 | 2 | 3
}

export default function PetAvatar({ stage }: PetAvatarProps) {
  const config = petStageConfig.find((s) => s.stage === stage)
  const emoji = config?.emoji ?? '🥚'
  const label = config?.label ?? '알'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-blue-50 shadow-inner transition-all duration-700">
        {/* 실제 이미지가 있으면 표시, 없으면 이모지 폴백 */}
        <Image
          src={`/pets/stage-${stage}.png`}
          alt={label}
          width={120}
          height={120}
          className="object-contain transition-all duration-700"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          priority
        />
        {/* 이모지 폴백 — 이미지 로드 실패 시 CSS로 표시 */}
        <span
          className="absolute text-7xl select-none transition-all duration-700"
          aria-hidden="true"
          style={{ display: 'none' }}
          data-fallback
        >
          {emoji}
        </span>
      </div>
      <span className="text-sm font-semibold text-blue-600">{label}</span>
    </div>
  )
}
