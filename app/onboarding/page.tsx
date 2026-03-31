'use client'

import { useRouter } from 'next/navigation'
import { Sword, Star, Trophy } from 'lucide-react'

const features = [
  { icon: Sword, text: '퀘스트를 수행하며 회사를 탐험해요' },
  { icon: Star,  text: '포인트를 모아 트리니티 펫을 키워요' },
  { icon: Trophy, text: '온보딩을 완료하고 명예 칭호를 획득해요' },
]

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-blue-600 to-blue-900 px-6 py-16">
      {/* 상단 타이틀 */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl">🚀</span>
        <h1 className="text-3xl font-extrabold text-white">Mega-Quest</h1>
        <p className="text-sm text-blue-200">신입사원을 위한 게이미피케이션 온보딩</p>
      </div>

      {/* 기능 설명 카드 */}
      <div className="w-full max-w-xs space-y-4">
        {features.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Icon size={20} className="text-white" />
            </div>
            <p className="text-sm font-medium text-white">{text}</p>
          </div>
        ))}
      </div>

      {/* 시작하기 버튼 */}
      <button
        onClick={() => router.push('/login')}
        className="w-full max-w-xs rounded-2xl bg-white py-4 text-lg font-bold text-blue-600 shadow-lg shadow-blue-900/30 active:scale-95 transition-transform"
        aria-label="온보딩 시작하기"
      >
        시작하기 →
      </button>
    </div>
  )
}
