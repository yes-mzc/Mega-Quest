'use client'

import { useRouter } from 'next/navigation'
import GoogleIcon from '@/components/icons/GoogleIcon'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      {/* 로고 */}
      <div className="mb-8 flex flex-col items-center gap-2">
        <span className="text-5xl">🚀</span>
        <h1 className="text-xl font-extrabold text-gray-800">Mega-Quest</h1>
      </div>

      {/* 로그인 카드 */}
      <div className="w-full max-w-xs rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">로그인</h2>
        <p className="mt-1 text-sm text-gray-400">회사 계정으로 로그인하세요</p>

        <button
          onClick={() => router.push('/')}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all active:scale-95 hover:shadow-md"
          aria-label="Google 회사 계정으로 로그인"
        >
          <GoogleIcon size={20} />
          Google로 계속하기 (회사 계정)
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-300">© 2026 Mega-Quest. All rights reserved.</p>
    </div>
  )
}
