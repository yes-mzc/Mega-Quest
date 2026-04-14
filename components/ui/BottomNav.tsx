'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListChecks, ShoppingBag } from 'lucide-react'

const navItems = [
  { href: '/',       label: '홈',      Icon: Home },
  { href: '/quests', label: '퀘스트',   Icon: ListChecks },
  { href: '/shop',   label: '상점',    Icon: ShoppingBag },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-gray-200 bg-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="하단 네비게이션"
    >
      {navItems.map(({ href, label, Icon }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
