# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # type-check only (no test suite exists)
```

Demo entry point: `http://localhost:3000/onboarding`

## Architecture

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Zustand 5 + persist

**No backend.** All data lives in `lib/mockData.ts` (35 quests, initial user) and `lib/shopItems.ts` (8 shop items). State is persisted to `localStorage` via Zustand's `persist` middleware under the key `mega-quest-storage`.

### State — `store/gameStore.ts`

Single global store (`useGameStore`) with three fields:
- `user: User` — holds `points` and `petStage`
- `quests: Quest[]` — each quest has `status: 'locked' | 'available' | 'completed'`
- `purchasedItems: string[]` — IDs of shop items the user has exchanged

Actions:
- `completeQuest(questId)` — adds points, recalculates `petStage`
- `purchaseItem(itemId, pointCost)` — deducts points, appends to `purchasedItems`, returns `false` if insufficient points
- `resetGame()` — wipes all state back to initial values

`petStage` is **derived**, not stored independently. `completeQuest(questId)` recalculates it via `getPetStage(newPoints)` from `lib/utils.ts` every time a quest is completed.

**Zustand store version:** currently `6` in `gameStore.ts`. Bump this whenever the store shape or `mockData.ts` changes to wipe user `localStorage` automatically.

### Page Flow

```
/onboarding → /login → / (home) → /quests → /quests/[id]
                                 → /shop
```

| Route | File | Notes |
|---|---|---|
| `/onboarding` | `app/onboarding/page.tsx` | Intro screen |
| `/login` | `app/login/page.tsx` | Mock Google login (no real auth) |
| `/` | `app/page.tsx` | Home dashboard — PetAvatar, points, quick links, daily quest shortcut |
| `/quests` | `app/quests/page.tsx` | Quest roadmap with 7 category tabs |
| `/quests/[id]` | `app/quests/[id]/page.tsx` | Mission detail — QR or confirm flow |
| `/shop` | `app/shop/page.tsx` | Point shop — "전체 상품" / "구매 내역" tabs |

### Shop — `app/shop/page.tsx`

Two tabs: **전체 상품** (all items grid) and **구매 내역** (purchased items list). The purchased-items tab badge shows the count of items bought.

Shop items are defined in `lib/shopItems.ts` as `ShopItem[]`. Each item has `id`, `name`, `brand`, `description`, `pointCost`, `emoji`, `category`. Add new items there — no store changes needed.

`ShopItemCard` handles the purchase flow: afford check → confirm modal (shows point delta) → `purchaseItem()` → "교환 완료" state. Items can only be purchased once per ID.

### Quick Links — `components/QuickLinks.tsx`

Static Server Component (no `'use client'`). Link data lives in `lib/quickLinks.ts` as `QuickLink[]`. Rendered on the home dashboard between the points progress bar and the daily quest shortcut. All links open `target="_blank" rel="noopener noreferrer"`.

### Quest Data Shape

`Quest` has an optional `helpUrl?: string` field — a link to the Megaone help center article for that quest. When present, shown as a reference link in the mission detail UI.

### Quest Detail Branching (`/quests/[id]`)

Only `id === 'meeting-room-qr'` renders `QRScannerUI` (2-second scan simulation). All other quests use `MissionConfirmUI` (loading 1s → confirmed 1s → completion modal).

### `useSearchParams` + Suspense

`app/quests/page.tsx` wraps its inner component in `<Suspense>` because `useSearchParams` requires it in Next.js 14 App Router. Do not remove that wrapper.

### Pet Evolution Thresholds

Defined in `lib/mockData.ts` as `petStageConfig`:
- Stage 1 🥚: 0–9P
- Stage 2 🐣: 10–14P
- Stage 3 ✨: 15P+

### `'use client'` Requirement

Any component using `useRouter`, `useGameStore`, `useState`, or other client hooks must have `'use client'` at the top of the file. Missing this directive causes a server-component error.

### Category Tab Order

Tabs follow the real onboarding journey sequence:
`pre-boarding` → `day-one` → `mandatory-training` → `company-culture` → `hr-beginner` → `role-specific` → `daily-monthly`

The active tab auto-focuses to the first category that still has `available` quests.
