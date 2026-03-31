# Mega-Quest — Copilot Instructions

## Project Overview
Mega-Quest is a **mobile-first onboarding web app** (MVP) for new employees. It gamifies onboarding through a quest system and a virtual mascot ("트리니티 펫") that evolves as the user earns points. The core demo flow is: access → view quest list → select quest → simulate QR check-in → earn points → pet evolves.

## Tech Stack
- **Framework:** Next.js 14 (App Router), responsive/mobile-first design
- **Styling:** Tailwind CSS (mobile-optimized UI)
- **State Management:** Zustand with `persist` middleware (localStorage) — manages global `points`, `petStage`, and quest `status`
- **Language:** TypeScript (strict mode)
- **Icons:** lucide-react
- **Backend:** MVP uses mock/hardcoded data only — no real backend
- **Optional AI:** Gemini API for a Slack-style Q&A interface (out of scope for MVP)

## Data Models

```ts
// User (camelCase throughout the codebase)
interface User {
  id: string;
  name: string;
  type: string;
  points: number;
  petStage: 1 | 2 | 3;
  title: string;
}

// Quest
interface Quest {
  id: string;           // e.g. 'meeting-room-qr'
  category: 'hr-beginner' | 'role-specific' | 'daily-monthly';
  title: string;
  description: string;
  rewardPoints: number;
  status: 'locked' | 'available' | 'completed';
}

// Pet stage thresholds (configurable constants in lib/mockData.ts)
// Stage 1: 0–9P | Stage 2: 10–14P | Stage 3: 15P+
// Available quests total 17P → Stage 3 is reachable in demo
```

## Key Architecture Decisions
- **Global state (Zustand + persist):** `useGameStore` holds `user` (points, petStage) and `quests[]`. Persisted to `localStorage` so demo state survives page refresh.
- **`petStage` is derived**, not stored independently — `completeQuest()` recalculates via `getPetStage(newPoints)` after every update.
- **Pet evolution thresholds:** Stage 1 (0–9P 🥚), Stage 2 (10–14P 🐣), Stage 3 (15P+ ✨). Defined as constants in `lib/mockData.ts`.
- **QR scan is simulated:** the QR screen shows a fake camera UI; clicking "스캔하기" triggers a 2-second animation then `completeQuest(questId)` → status `completed`, global points `+rewardPoints`.
- **`useSearchParams` requires `<Suspense>`** in Next.js 14 App Router — `CategoryTabs` must be wrapped in `<Suspense>` in `app/quests/page.tsx`.
- All data is mock — quests, user info, and point history are defined in `lib/mockData.ts`.

## UI Components

| Component | Route/Tab | Description |
|---|---|---|
| Main Dashboard (Home) | `/` | Shows 트리니티 펫 visual, level/progress bar, daily quest shortcut |
| Quest Roadmap | Quest tab | Category tabs (HR초보자 / 직군별전직 / 일일월간), quest list with status icons |
| QR Mission Simulator | Quest detail | Fake camera UI + scan button → completion modal + point update |

## Quest Content Categories
- **HR-초보자:** 인사제도 확인, 오피스 투어, 프로필 설정
- **직군별-전직:** 슬랙/지라 권한 신청, MSP 기초 교육, CTU 소개
- **일일/월간:** 메일 확인, 전자결재 확인, 회의실 매너 준수

## Design System
- **Primary color:** Tailwind `blue-500` / `blue-600` (버튼, 활성 탭, available 배지)
- **Success color:** `green-500` (completed 배지, 완료 모달 체크)
- **Disabled color:** `gray-300` / `gray-400` (locked 퀘스트)
- **Background:** `gray-50` (전체 배경), `white` (카드)
- **Deployment:** 로컬 전용 (`npm run dev`) — 데모 영상 시연용, Vercel 배포 불필요

## Reward System
- Points are non-monetary; they accumulate and can reset periodically
- Completing quests awards points and may grant time-limited honorary titles (`title` field on user)
- Pet stage is the primary visual feedback for progress
