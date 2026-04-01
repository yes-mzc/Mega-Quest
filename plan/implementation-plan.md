---
goal: Mega-Quest MVP 전체 구현 — 온보딩/로그인 플로우 + 퀘스트 시스템 + 미션 확인 UX
version: 2.0
date_created: 2026-03-31
last_updated: 2026-03-31
owner: Mega-Quest Team
status: 'Completed'
tags: [feature, mvp, onboarding, gamification, mobile]
---

# Implementation Plan: Mega-Quest MVP (Full)

![Status: Completed](https://img.shields.io/badge/status-Completed-brightgreen)

Mega-Quest MVP는 신입사원이 모바일 웹앱을 통해 온보딩 퀘스트를 게임처럼 수행할 수 있도록 하는 프론트엔드 전용 애플리케이션이다. 온보딩 소개 → Google 로그인(Mock) → 대시보드 → 퀘스트 수행 → 포인트 적립 → 트리니티 펫 진화의 완결된 데모 플로우를 제공한다. 실제 백엔드 없이 Zustand persist + mock 데이터만으로 구성되며, 해커톤 심사자가 직접 플로우를 체험할 수 있는 수준의 완성도를 달성했다.

---

## 1. Requirements & Constraints

- **REQ-001**: 앱 진입점은 `/onboarding` → `/login` → `/` 순서로 구성한다.
- **REQ-002**: 메인 대시보드(`/`)는 트리니티 펫(3단계), 포인트 프로그레스 바, 미완료 일일 퀘스트 목록, 일일 퀘스트 바로가기를 표시한다.
- **REQ-003**: 퀘스트 로드맵(`/quests`)은 7개 카테고리 탭(입사전준비/첫출근/필수교육/조직이해/HR초보자/직군별전직/일일월간)으로 필터링되며, URL 쿼리 파라미터(`?category=`)로 탭 상태를 제어한다.
- **REQ-004**: `meeting-room-qr` 퀘스트만 QR 스캔 UI를 사용하고(2초), 나머지 퀘스트는 미션 확인 플로우(달성하셨나요? → 로딩 1초 → 확인됨 1초 → 완료 모달)를 사용한다.
- **REQ-005**: 모든 퀘스트(28개)는 `available` 상태이며 잠금 없이 도전 가능하다.
- **REQ-006**: `petStage`는 포인트 기준 자동 계산: 0–9P = 1, 10–14P = 2, 15P+ = 3.
- **REQ-007**: 전역 상태는 Zustand persist(`localStorage`, `version: 4`)로 새로고침 후에도 유지된다.
- **REQ-008**: `/onboarding`, `/login` 경로에서 BottomNav를 숨긴다.
- **CON-001**: 실제 Google OAuth, 세션, 토큰 구현 없음 — 버튼 클릭 시 즉시 `/` 이동.
- **CON-002**: 실제 백엔드/DB 없음 — 모든 데이터는 `lib/mockData.ts` mock 데이터.
- **CON-003**: 실제 QR 카메라 스캔 없음 — 버튼 클릭으로 시뮬레이션.
- **GUD-001**: 모든 UI는 375px(모바일) 기준 레이아웃 우선.
- **GUD-002**: Primary: `blue-600`, Success: `green-500`, Disabled: `gray-300/400`, BG: `gray-50`.
- **PAT-001**: `useSearchParams` 사용 컴포넌트는 반드시 `<Suspense>`로 래핑.
- **PAT-002**: `use client`는 상태/이벤트가 필요한 컴포넌트에만 적용.
- **PAT-003**: Zustand store 변경 시 `version` 값을 올려 localStorage 자동 초기화.

---

## 2. Implementation Steps

### Implementation Phase 1 — Foundation

- GOAL-001: Next.js 프로젝트 초기화 + 타입 정의 + mock 데이터 + 유틸 함수 + Zustand store 구축

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | `package.json` 수동 작성. dependencies: `next@14.2.29`, `react@^18`, `zustand@^5`, `lucide-react@^0.469`. devDependencies: TypeScript, Tailwind, ESLint. | ✅ | 2026-03-31 |
| TASK-002 | `tsconfig.json` 작성. strict: true, paths: `@/*` → `./*`. | ✅ | 2026-03-31 |
| TASK-003 | `tailwind.config.ts` 작성. content: app/**, components/**, pages/**. | ✅ | 2026-03-31 |
| TASK-004 | `postcss.config.js` 작성 (CommonJS — `.mjs` 사용 불가). plugins: tailwindcss, autoprefixer. | ✅ | 2026-03-31 |
| TASK-005 | `next.config.mjs` 작성 (`.ts` 사용 불가 — Next.js 14 제한). | ✅ | 2026-03-31 |
| TASK-006 | `lib/types.ts` 작성. `User`, `Quest`, `QuestStatus`, `QuestCategory`, `PetStageConfig` 인터페이스 정의. | ✅ | 2026-03-31 |
| TASK-007 | `lib/mockData.ts` 작성. `initialUser`(김신입), `initialQuests`(9개 전원 available), `petStageConfig`(0–9/10–14/15+). | ✅ | 2026-03-31 |
| TASK-008 | `lib/utils.ts` 작성. `getPetStage(points)`, `getProgressPercent(points, stage)`, `getNextStagePoints(stage)` 구현. | ✅ | 2026-03-31 |
| TASK-009 | `store/gameStore.ts` 작성. Zustand + persist middleware. `user`, `quests`, `completeQuest()`, `resetGame()`. `version: 2`. | ✅ | 2026-03-31 |
| TASK-010 | `npm install` 실행. | ✅ | 2026-03-31 |

### Implementation Phase 2 — Shared UI Components

- GOAL-002: 재사용 가능한 공통 UI 컴포넌트 + 루트 레이아웃 구축

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-011 | `app/globals.css` 작성. `@tailwind base/components/utilities`. | ✅ | 2026-03-31 |
| TASK-012 | `components/ui/Badge.tsx`. props: `{ status: QuestStatus }`. locked=gray-200, available=blue-100, completed=green-100. | ✅ | 2026-03-31 |
| TASK-013 | `components/ui/ProgressBar.tsx`. props: `{ percent: number }`. Tailwind div 기반, `role="progressbar"`. | ✅ | 2026-03-31 |
| TASK-014 | `components/ui/Modal.tsx`. `'use client'`. backdrop-blur + 중앙 카드. `body.overflow` 제어. | ✅ | 2026-03-31 |
| TASK-015 | `components/ui/BottomNav.tsx`. `'use client'`. `usePathname` 활성 탭. `fixed bottom-0`. iOS safe-area `env(safe-area-inset-bottom)`. | ✅ | 2026-03-31 |
| TASK-016 | `components/ui/NavWrapper.tsx`. `'use client'`. `usePathname`으로 `/onboarding`, `/login`에서 BottomNav 숨김. `children` 래핑 + `main.max-w-md.pb-20` 조건부 적용. | ✅ | 2026-03-31 |
| TASK-017 | `app/layout.tsx`. Server Component 유지. `NavWrapper`로 children 감쌈. `Metadata`, `Viewport` export. | ✅ | 2026-03-31 |

### Implementation Phase 3 — Onboarding & Login Flow

- GOAL-003: 앱 진입 플로우 구현 (온보딩 → 로그인 → 홈)

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-018 | `app/onboarding/page.tsx`. `'use client'`. 블루 그라데이션 배경. 🚀 타이틀 + 3개 기능 카드(Sword/Star/Trophy 아이콘) + "시작하기 →" 버튼 → `router.push('/login')`. | ✅ | 2026-03-31 |
| TASK-019 | `components/icons/GoogleIcon.tsx`. Google 4색 SVG (파랑/초록/노랑/빨강 공식 path). props: `{ size?: number }`. | ✅ | 2026-03-31 |
| TASK-020 | `app/login/page.tsx`. `'use client'`. 흰색 카드 + Google 버튼 → `router.push('/')`. 실제 OAuth 없음. | ✅ | 2026-03-31 |

### Implementation Phase 4 — Home Dashboard

- GOAL-004: 메인 대시보드 구현 (트리니티 펫 + 포인트 + 미완료 일일 퀘스트 목록)

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-021 | `components/PetAvatar.tsx`. props: `{ stage: 1\|2\|3 }`. `next/image` + 이모지 폴백(🥚🐣✨). CSS transition. | ✅ | 2026-03-31 |
| TASK-022 | `components/PointsProgressBar.tsx`. props: `{ currentPoints, currentStage }`. `getProgressPercent` 사용. 다음 단계까지 남은 포인트 표시. | ✅ | 2026-03-31 |
| TASK-023 | `components/DailyQuestShortcut.tsx`. `<Link href="/quests?category=daily-monthly">`. 파란 배경 버튼. | ✅ | 2026-03-31 |
| TASK-024 | `app/page.tsx`. `'use client'`. `useGameStore`로 `user`, `quests` 조회. `daily-monthly` & `status !== completed` 필터링하여 미완료 목록 표시. 모두 완료 시 "🎉" 메시지. | ✅ | 2026-03-31 |

### Implementation Phase 5 — Quest Roadmap

- GOAL-005: 퀘스트 목록 페이지 구현 (카테고리 탭 + 퀘스트 카드)

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-025 | `components/CategoryTabs.tsx`. `'use client'`. `useSearchParams` + `useRouter`. 3개 탭. **반드시 `<Suspense>` 내부에서 사용**. | ✅ | 2026-03-31 |
| TASK-026 | `components/QuestCard.tsx`. props: `{ quest, onClick? }`. 상태별 아이콘/배지/색상. `locked` → `pointer-events-none opacity-50`. | ✅ | 2026-03-31 |
| TASK-027 | `app/quests/page.tsx`. `'use client'`. `<Suspense>` 래핑 필수. `useSearchParams`로 초기 카테고리 결정. `available` 퀘스트 클릭 → `/quests/[id]`. | ✅ | 2026-03-31 |

### Implementation Phase 6 — Quest Mission Simulator

- GOAL-006: 퀘스트 미션 수행 화면 구현 (QR / 미션 확인 분기)

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-028 | `components/QRScannerUI.tsx`. props: `{ isScanning, onScan }`. `bg-black` 전체 화면. 코너 마커 CSS. 스캔 라인 `animate-bounce`. | ✅ | 2026-03-31 |
| TASK-029 | `components/MissionConfirmUI.tsx`. `'use client'`. props: `{ quest, isLoading, isConfirmed, onConfirm }`. 기본→로딩(Loader2 animate-spin)→확인됨(CheckCircle2) 3단계 상태 렌더링. | ✅ | 2026-03-31 |
| TASK-030 | `components/CompletionModal.tsx`. `Modal` 래핑. ✅ 아이콘 + 퀘스트 제목 + "+NP 획득" + 확인 버튼. | ✅ | 2026-03-31 |
| TASK-031 | `app/quests/[id]/page.tsx`. `'use client'`. `quest.id === 'meeting-room-qr'` 분기. QR: 2초 스캔 → 완료 모달. 일반: `handleMissionConfirm` (로딩 2초 → 확인 1초 → 완료 모달). `useRef` cleanup. | ✅ | 2026-03-31 |

### Implementation Phase 7 — Verification & Bug Fixes

- GOAL-007: 빌드 오류 수정 + 전체 플로우 검증

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-032 | `next.config.ts` → `next.config.mjs`로 교체 (Next.js 14는 `.ts` config 미지원). | ✅ | 2026-03-31 |
| TASK-033 | `postcss.config.mjs` → `postcss.config.js`로 교체 (`.mjs`에서 `module.exports` 사용 불가). | ✅ | 2026-03-31 |
| TASK-034 | `locked` 퀘스트 3개(`slack-jira`, `msp-training`, `ctu-intro`) → `available`로 변경. | ✅ | 2026-03-31 |
| TASK-035 | `gameStore.ts` `version: 2` 추가 — mockData 변경 시 localStorage 자동 초기화. | ✅ | 2026-03-31 |
| TASK-036 | `npm run build` 최종 검증. 7개 라우트 정상 빌드 확인. | ✅ | 2026-03-31 |

---

## 3. Alternatives

- **ALT-001**: `create-next-app` CLI 스캐폴딩 — 폴더명 "Mega-Quest"에 대문자 포함으로 npm 제한에 걸림 → 수동 파일 작성으로 대체.
- **ALT-002**: `next.config.ts` — Next.js 14에서 미지원 → `next.config.mjs`로 교체.
- **ALT-003**: `postcss.config.mjs` — ES Module scope에서 `module.exports` 사용 불가 → `postcss.config.js`(CommonJS)로 교체.
- **ALT-004**: `layout.tsx`에서 직접 `usePathname` — Server Component 제약으로 불가 → `NavWrapper` Client Component 분리.
- **ALT-005**: `zustand-persist`를 선택 사항으로 처리 — 데모 중 새로고침 리셋 방지를 위해 기본 적용으로 격상.
- **ALT-006**: `locked` 퀘스트 유지 — 데모에서 모든 퀘스트 체험 가능하도록 전체 `available`로 변경.
- **ALT-007**: 온보딩 최초 1회만 표시 (localStorage skip) — 데모 매 실행 시 플로우 재현이 필요하므로 항상 표시 방식 채택.

---

## 4. Dependencies

- **DEP-001**: `next@14.2.29` — App Router, Server/Client Component, `next/image`, `next/font`.
- **DEP-002**: `react@^18`, `react-dom@^18` — 기본 프레임워크.
- **DEP-003**: `zustand@^5` + `zustand/middleware(persist)` — 전역 상태 + localStorage 유지.
- **DEP-004**: `lucide-react@^0.469` — 아이콘 (Home, ListChecks, Sword, Star, Trophy, Zap, ChevronRight, Lock, Loader2, CheckCircle2, ArrowLeft).
- **DEP-005**: `tailwindcss@^3.4.1` + `postcss` + `autoprefixer` — 스타일링.
- **DEP-006**: `typescript@^5` + `@types/react`, `@types/node` — 타입 안전성.

---

## 5. Files

**App Routes:**
- **FILE-001**: `app/layout.tsx` — Server Component 루트 레이아웃. `NavWrapper` 포함.
- **FILE-002**: `app/globals.css` — Tailwind 기본 import.
- **FILE-003**: `app/onboarding/page.tsx` — 온보딩 소개 화면. 진입점.
- **FILE-004**: `app/login/page.tsx` — Google 로그인 UI (Mock).
- **FILE-005**: `app/page.tsx` — 메인 대시보드. 미완료 일일 퀘스트 목록 포함.
- **FILE-006**: `app/quests/page.tsx` — 퀘스트 로드맵. Suspense 래핑.
- **FILE-007**: `app/quests/[id]/page.tsx` — 퀘스트 미션 수행. QR/일반 분기.

**Components:**
- **FILE-008**: `components/ui/NavWrapper.tsx` — BottomNav 조건부 렌더 + main 레이아웃 래퍼.
- **FILE-009**: `components/ui/BottomNav.tsx` — 하단 고정 탭 네비게이션.
- **FILE-010**: `components/ui/Badge.tsx` — 퀘스트 상태 배지.
- **FILE-011**: `components/ui/ProgressBar.tsx` — 퍼센트 기반 프로그레스 바.
- **FILE-012**: `components/ui/Modal.tsx` — 공통 모달 래퍼.
- **FILE-013**: `components/icons/GoogleIcon.tsx` — Google 4색 SVG.
- **FILE-014**: `components/PetAvatar.tsx` — 트리니티 펫 시각화 (3단계 + 이모지 폴백).
- **FILE-015**: `components/PointsProgressBar.tsx` — 포인트 + 진화 진행도.
- **FILE-016**: `components/DailyQuestShortcut.tsx` — 일일 퀘스트 바로가기 버튼.
- **FILE-017**: `components/CategoryTabs.tsx` — 카테고리 탭 (URL 쿼리 연동).
- **FILE-018**: `components/QuestCard.tsx` — 퀘스트 목록 카드.
- **FILE-019**: `components/QRScannerUI.tsx` — QR 카메라 프레임 시뮬레이터.
- **FILE-020**: `components/MissionConfirmUI.tsx` — 미션 확인 플로우 UI.
- **FILE-021**: `components/CompletionModal.tsx` — 퀘스트 완료 팝업.

**State & Data:**
- **FILE-022**: `store/gameStore.ts` — Zustand store + persist. `user`, `quests`, `completeQuest`, `resetGame`.
- **FILE-023**: `lib/types.ts` — 공통 TypeScript 인터페이스.
- **FILE-024**: `lib/mockData.ts` — 초기 데이터 (user, quests 28개 all available, petStageConfig).
- **FILE-025**: `lib/utils.ts` — `getPetStage`, `getProgressPercent`, `getNextStagePoints`.

**Config:**
- **FILE-026**: `next.config.mjs` — Next.js 설정.
- **FILE-027**: `postcss.config.js` — PostCSS/Tailwind 설정 (CommonJS 필수).
- **FILE-028**: `tailwind.config.ts` — Tailwind content 경로 설정.
- **FILE-029**: `tsconfig.json` — TypeScript strict mode + path alias.

---

## 6. Testing

- **TEST-001**: `npm run build` — 타입 오류 없이 7개 라우트 빌드 성공 ✅
- **TEST-002**: 온보딩 플로우 — `/onboarding` → "시작하기" → `/login` → Google 버튼 → `/` 이동 ✅
- **TEST-003**: BottomNav 조건 — `/onboarding`, `/login`에서 미표시, 나머지에서 표시 ✅
- **TEST-004**: QR 미션 플로우 — `/quests/meeting-room-qr` → QR UI → 스캔 2초 → 완료 모달 → 홈 + 포인트 +5 ✅
- **TEST-005**: 일반 미션 플로우 — `/quests/hr-policy` → 달성하셨나요? → 확인 → 로딩 1초 → 확인됨 1초 → 완료 모달 → 홈 + 포인트 +3 ✅
- **TEST-006**: petStage 진화 — 0→9P: Stage 1, 10P: Stage 2, 15P: Stage 3 ✅
- **TEST-007**: 퀘스트 카테고리 탭 — 7개 탭 전환 시 목록 필터링 정상 동작 ✅
- **TEST-008**: URL 쿼리 연동 — `/quests?category=pre-boarding` 접근 시 해당 탭 자동 선택 ✅
- **TEST-009**: Zustand persist — 새로고침 후 포인트 + 퀘스트 상태 유지 ✅
- **TEST-010**: localStorage 자동 초기화 — `version: 4`로 이전 데이터 리셋 ✅
- **TEST-011**: 전 라우트 200 응답 — `/`, `/quests`, `/quests/[id]`, `/onboarding`, `/login` ✅

---

## 7. Risks & Assumptions

- **RISK-001**: `next.config.ts` 미지원 — Next.js 14에서 `.mjs`만 허용. → `next.config.mjs`로 해결 ✅
- **RISK-002**: `postcss.config.mjs` ES Module scope 오류 — `module.exports` 사용 불가. → `.js`(CJS)로 해결 ✅
- **RISK-003**: `create-next-app` 대문자 폴더명 제한 — "Mega-Quest" 폴더명으로 CLI 실패. → 수동 scaffold로 해결 ✅
- **RISK-004**: Zustand v5 + persist hydration mismatch — SSR/CSR 불일치 가능. → `version` 필드로 초기화 제어, 현재 데모 환경에서 문제 없음.
- **RISK-005**: `useSearchParams` + Next.js 14 App Router — `<Suspense>` 미포함 시 빌드 에러. → `app/quests/page.tsx`에 `<Suspense>` 래핑 적용 ✅
- **RISK-006**: 펫 이미지 에셋 부재 (`/public/pets/` 비어있음) — `next/image`가 404 반환. → `onError` 핸들러로 이모지 폴백 처리.
- **ASSUMPTION-001**: 데모는 로컬 환경(`npm run dev`, `localhost:3000`)에서만 실행.
- **ASSUMPTION-002**: 단일 사용자 시나리오 — 인증/다중 사용자 불필요.
- **ASSUMPTION-003**: 펫 이미지는 추후 디자이너가 `/public/pets/stage-{1,2,3}.png` 경로에 추가 예정. 현재는 이모지로 동작.

---

## 8. Related Specifications / Further Reading

- [Epic PRD](../epic.md)
- [온보딩 플로우 Feature PRD](../onboarding-flow/prd.md)
- [로그인 플로우 Feature PRD](../login-flow/prd.md)
- [퀘스트 미션 UX Feature PRD](../quest-mission-ux/prd.md)
- [온보딩+로그인+미션UX 구현 계획 v1](./feature-onboarding-login-quest-ux-1.md)
- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [Next.js useSearchParams + Suspense](https://nextjs.org/docs/app/api-reference/functions/use-search-params#with-suspense)


