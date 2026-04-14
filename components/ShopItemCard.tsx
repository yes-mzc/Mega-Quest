'use client'

import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import type { ShopItem } from '@/lib/types'
import { CheckCircle2, Coins } from 'lucide-react'

interface Props {
  item: ShopItem
  isPurchased: boolean
  currentPoints: number
}

export default function ShopItemCard({ item, isPurchased, currentPoints }: Props) {
  const purchaseItem = useGameStore((s) => s.purchaseItem)
  const [showConfirm, setShowConfirm] = useState(false)
  const [justPurchased, setJustPurchased] = useState(false)

  const canAfford = currentPoints >= item.pointCost
  const alreadyOwned = isPurchased || justPurchased

  function handlePurchase() {
    const success = purchaseItem(item.id, item.pointCost)
    if (success) {
      setJustPurchased(true)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <div
        className={`relative flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm transition-opacity ${
          alreadyOwned ? 'opacity-60' : ''
        }`}
      >
        {/* 상단: 이모지 + 이름 */}
        <div className="flex items-start gap-3">
          <span className="text-3xl">{item.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400">{item.brand}</p>
            <p className="text-sm font-bold text-gray-800 leading-tight">{item.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
          </div>
        </div>

        {/* 하단: 포인트 + 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Coins size={14} />
            <span className="text-sm font-bold">{item.pointCost}P</span>
          </div>

          {alreadyOwned ? (
            <div className="flex items-center gap-1 text-green-500">
              <CheckCircle2 size={14} />
              <span className="text-xs font-semibold">구매 완료</span>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!canAfford}
              className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${
                canAfford
                  ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canAfford ? '교환하기' : '포인트 부족'}
            </button>
          )}
        </div>
      </div>

      {/* 구매 확인 모달 */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-8">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-4 text-center">
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="mt-2 text-base font-bold text-gray-800">
                {item.brand} {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-yellow-500">
                <Coins size={15} />
                <span className="text-sm font-bold">{item.pointCost}P 차감</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                잔여: {currentPoints}P → {currentPoints - item.pointCost}P
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600"
              >
                교환하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
