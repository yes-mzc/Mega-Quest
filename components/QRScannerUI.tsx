'use client'

interface QRScannerUIProps {
  isScanning: boolean
  onScan: () => void
}

export default function QRScannerUI({ isScanning, onScan }: QRScannerUIProps) {
  return (
    <div className="flex flex-col items-center justify-between bg-black min-h-[calc(100vh-10rem)] py-10 px-6">
      {/* 안내 텍스트 */}
      <p className="text-center text-sm text-gray-400">
        QR 코드를 프레임 안에 맞춰주세요
      </p>

      {/* QR 스캔 프레임 */}
      <div className="relative flex h-64 w-64 items-center justify-center">
        {/* 코너 마커 4개 */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <span
            key={i}
            className={`absolute h-8 w-8 border-white ${pos} ${
              i === 0 ? 'border-t-4 border-l-4 rounded-tl-md' :
              i === 1 ? 'border-t-4 border-r-4 rounded-tr-md' :
              i === 2 ? 'border-b-4 border-l-4 rounded-bl-md' :
                        'border-b-4 border-r-4 rounded-br-md'
            }`}
          />
        ))}

        {/* 스캔 라인 */}
        {isScanning ? (
          <div className="absolute h-0.5 w-56 bg-blue-400 animate-bounce opacity-90" />
        ) : (
          <div className="absolute h-0.5 w-56 bg-white/20" />
        )}

        {/* 중앙 아이콘 */}
        <span className="text-5xl opacity-30 select-none">⬛</span>
      </div>

      {/* 스캔 버튼 */}
      <button
        onClick={onScan}
        disabled={isScanning}
        className={`w-full max-w-xs rounded-2xl py-4 text-lg font-bold transition-all ${
          isScanning
            ? 'bg-blue-800 text-blue-400 cursor-not-allowed'
            : 'bg-blue-500 text-white active:scale-95 hover:bg-blue-600 shadow-lg shadow-blue-500/40'
        }`}
        aria-label="QR 스캔하기"
      >
        {isScanning ? '스캔 중...' : '스캔하기'}
      </button>
    </div>
  )
}
