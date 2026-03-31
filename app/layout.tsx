import type { Metadata, Viewport } from 'next'
import './globals.css'
import NavWrapper from '@/components/ui/NavWrapper'

export const metadata: Metadata = {
  title: 'Mega-Quest',
  description: '신입사원을 위한 게이미피케이션 온보딩',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 antialiased">
        <NavWrapper>{children}</NavWrapper>
      </body>
    </html>
  )
}
