import { ExternalLink } from 'lucide-react'
import { quickLinks } from '@/lib/quickLinks'

export default function QuickLinks() {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-500">바로가기</h2>
      <ul className="grid grid-cols-2 gap-2">
        {quickLinks.map((link, index) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} 새 탭에서 열기`}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 transition-colors hover:bg-gray-100 active:bg-gray-200"
            >
              <span className="text-lg">{link.emoji}</span>
              <span className="flex-1 truncate text-sm font-medium text-gray-700">{link.label}</span>
              <ExternalLink size={13} className="shrink-0 text-gray-300" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
