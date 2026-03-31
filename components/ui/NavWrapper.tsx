'use client'

import { usePathname } from 'next/navigation'
import BottomNav from '@/components/ui/BottomNav'

const HIDE_NAV_PATHS = ['/onboarding', '/login']

export default function NavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNav = HIDE_NAV_PATHS.includes(pathname)

  if (hideNav) {
    return <>{children}</>
  }

  return (
    <>
      <main className="mx-auto min-h-screen max-w-md pb-20">
        {children}
      </main>
      <BottomNav />
    </>
  )
}
