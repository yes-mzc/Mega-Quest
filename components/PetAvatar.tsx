'use client'

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
        <span className="text-7xl select-none transition-all duration-700" role="img" aria-label={label}>
          {emoji}
        </span>
      </div>
      <span className="text-sm font-semibold text-blue-600">{label}</span>
    </div>
  )
}
