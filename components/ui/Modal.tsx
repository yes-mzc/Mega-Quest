'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // 모달 열릴 때 콘텐츠 영역으로 포커스 이동
      contentRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape 키로 닫기
  useEffect(() => {
    if (!isOpen || !onClose) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
