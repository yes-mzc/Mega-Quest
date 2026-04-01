'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import QRScannerUI from '@/components/QRScannerUI'
import MissionConfirmUI from '@/components/MissionConfirmUI'
import CompletionModal from '@/components/CompletionModal'
import { ArrowLeft } from 'lucide-react'

const QR_QUEST_ID = 'meeting-room-qr'

export default function QuestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const quests = useGameStore((s) => s.quests)
  const completeQuest = useGameStore((s) => s.completeQuest)

  const quest = quests.find((q) => q.id === params.id)

  // QR 퀘스트 상태
  const [isScanning, setIsScanning] = useState(false)
  // 일반 미션 확인 상태
  const [isMissionLoading, setIsMissionLoading] = useState(false)
  const [isMissionConfirmed, setIsMissionConfirmed] = useState(false)
  // 공통 완료 모달
  const [showModal, setShowModal] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current)
    }
  }, [])

  // 퀘스트 없음
  if (!quest) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-20 px-4 text-center">
        <p className="text-gray-500">퀘스트를 찾을 수 없습니다.</p>
        <button onClick={() => router.push('/quests')} className="text-blue-600 font-semibold">
          퀘스트 목록으로
        </button>
      </div>
    )
  }

  // 잠긴 퀘스트
  if (quest.status === 'locked') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 pt-20 px-6 text-center">
        <span className="text-6xl">🔒</span>
        <div>
          <h2 className="text-xl font-bold text-gray-800">아직 잠긴 퀘스트예요</h2>
          <p className="mt-1 text-sm text-gray-400">{quest.title}</p>
        </div>
        <button
          onClick={() => router.push('/quests')}
          className="w-full max-w-xs rounded-xl bg-gray-200 py-3 font-bold text-gray-600"
        >
          퀘스트 목록으로
        </button>
      </div>
    )
  }

  // 이미 완료된 퀘스트
  if (quest.status === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 pt-20 px-6 text-center">
        <span className="text-6xl">✅</span>
        <div>
          <h2 className="text-xl font-bold text-gray-800">이미 완료한 퀘스트입니다</h2>
          <p className="mt-1 text-sm text-gray-400">{quest.title}</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-full max-w-xs rounded-xl bg-blue-600 py-3 font-bold text-white"
        >
          홈으로
        </button>
      </div>
    )
  }

  // QR 퀘스트 핸들러
  const handleScan = () => {
    if (isScanning) return
    setIsScanning(true)
    scanTimerRef.current = setTimeout(() => {
      completeQuest(quest.id)
      setIsScanning(false)
      setShowModal(true)
    }, 2000)
  }

  // 일반 미션 확인 핸들러: 로딩(2초) → 확인됨(1초) → 완료 모달
  const handleMissionConfirm = () => {
    if (isMissionLoading || isMissionConfirmed) return
    setIsMissionLoading(true)
    timerRef.current = setTimeout(() => {
      setIsMissionLoading(false)
      setIsMissionConfirmed(true)
      timerRef.current = setTimeout(() => {
        completeQuest(quest.id)
        setIsMissionConfirmed(false)
        setShowModal(true)
      }, 1000)
    }, 2000)
  }

  const handleConfirm = () => {
    setShowModal(false)
    router.push('/')
  }

  const isQrQuest = quest.id === QR_QUEST_ID

  return (
    <>
      {/* 헤더 */}
      <div className={`flex items-center gap-3 px-4 pt-4 pb-2 ${isQrQuest ? 'bg-black' : 'bg-white border-b border-gray-100'}`}>
        <button
          onClick={() => router.back()}
          className={`p-1 ${isQrQuest ? 'text-white' : 'text-gray-600'}`}
          aria-label="뒤로가기"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="min-w-0">
          <h1 className={`truncate font-bold ${isQrQuest ? 'text-white' : 'text-gray-800'}`}>
            {quest.title}
          </h1>
          <p className={`text-xs ${isQrQuest ? 'text-gray-400' : 'text-blue-500'}`}>
            +{quest.rewardPoints}P 획득
          </p>
        </div>
      </div>

      {/* 퀘스트 타입별 UI */}
      {isQrQuest ? (
        <QRScannerUI isScanning={isScanning} onScan={handleScan} />
      ) : (
        <MissionConfirmUI
          quest={quest}
          isLoading={isMissionLoading}
          isConfirmed={isMissionConfirmed}
          onConfirm={handleMissionConfirm}
        />
      )}

      <CompletionModal
        isOpen={showModal}
        quest={quest}
        onConfirm={handleConfirm}
      />
    </>
  )
}
