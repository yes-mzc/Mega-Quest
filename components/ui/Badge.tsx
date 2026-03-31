import type { QuestStatus } from '@/lib/types'

interface BadgeProps {
  status: QuestStatus
}

const statusConfig: Record<QuestStatus, { label: string; className: string }> = {
  locked:    { label: '잠김',   className: 'bg-gray-200 text-gray-500' },
  available: { label: '도전 가능', className: 'bg-blue-100 text-blue-600' },
  completed: { label: '완료',   className: 'bg-green-100 text-green-600' },
}

export default function Badge({ status }: BadgeProps) {
  const { label, className } = statusConfig[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
