'use client'

import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { shopItems } from '@/lib/shopItems'
import ShopItemCard from '@/components/ShopItemCard'
import { Coins, CheckCircle2 } from 'lucide-react'

type Tab = 'shop' | 'purchased'

export default function ShopPage() {
  const user = useGameStore((s) => s.user)
  const purchasedItems = useGameStore((s) => s.purchasedItems)
  const [activeTab, setActiveTab] = useState<Tab>('shop')

  const purchasedItemDetails = shopItems.filter((item) =>
    purchasedItems.includes(item.id)
  )

  return (
    <div className="flex flex-col gap-6 px-4 pt-8 pb-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">포인트 상점</h1>
        <p className="text-sm text-gray-400">퀘스트로 모은 포인트로 기프트콘을 교환하세요!</p>
      </div>

      {/* 보유 포인트 */}
      <div className="flex items-center justify-between rounded-2xl bg-yellow-50 px-5 py-4">
        <div>
          <p className="text-xs font-medium text-yellow-600">보유 포인트</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Coins size={18} className="text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-700">{user.points}P</span>
          </div>
        </div>
        <span className="text-3xl">💰</span>
      </div>

      {/* 탭 */}
      <div className="flex rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            activeTab === 'shop'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          전체 상품
        </button>
        <button
          onClick={() => setActiveTab('purchased')}
          className={`relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
            activeTab === 'purchased'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          구매 내역
          {purchasedItems.length > 0 && (
            <span className="absolute right-3 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
              {purchasedItems.length}
            </span>
          )}
        </button>
      </div>

      {/* 전체 상품 탭 */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-2 gap-3">
          {shopItems.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              isPurchased={purchasedItems.includes(item.id)}
              currentPoints={user.points}
            />
          ))}
        </div>
      )}

      {/* 구매 내역 탭 */}
      {activeTab === 'purchased' && (
        <>
          {purchasedItemDetails.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-12 shadow-sm">
              <span className="text-4xl">🛍️</span>
              <p className="text-sm font-medium text-gray-500">아직 교환한 기프트콘이 없어요</p>
              <button
                onClick={() => setActiveTab('shop')}
                className="mt-1 rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                상품 보러가기
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {purchasedItemDetails.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{item.brand}</p>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-gray-400 line-through">
                      <Coins size={12} />
                      <span className="text-xs">{item.pointCost}P</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-semibold">교환 완료</span>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-center text-xs text-gray-400 mt-2">
                구매한 기프트콘은 HR팀에 문의하여 수령하세요.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
