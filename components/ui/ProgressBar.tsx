interface ProgressBarProps {
  percent: number
  className?: string
}

export default function ProgressBar({ percent, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div className={`h-3 w-full rounded-full bg-gray-200 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
