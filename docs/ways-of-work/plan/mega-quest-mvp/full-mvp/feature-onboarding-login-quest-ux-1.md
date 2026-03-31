---
goal: 온보딩/로그인 플로우 추가 + 퀘스트 미션 확인 UX 개선
version: 1.0
date_created: 2026-03-31
last_updated: 2026-03-31
owner: Mega-Quest Team
status: 'Planned'
tags: [feature, ux, onboarding, login, quest]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

현재 앱은 실행 즉시 메인 대시보드(`/`)로 진입한다. 이 계획은 두 가지 UX 개선을 추가한다:

1. **온보딩 + 로그인 플로우**: 앱 진입 시 서비스 소개 화면 → Google 로그인 UI (회사 계정, 버튼만 구현) → 메인 대시보드 순서로 흐름을 구성한다.
2. **퀘스트 미션 확인 UX 개선**: `meeting-room-qr` 퀘스트만 QR 스캔 UI를 유지하고, 나머지 모든 퀘스트는 "달성하셨나요?" 확인 플로우(확인 버튼 → 로딩 → "확인되었습니다." → 점수 적립)로 교체한다.

---

## 1. Requirements & Constraints

- **REQ-001**: 앱 첫 실행 시 항상 온보딩 화면(`/onboarding`) → 로그인 화면(`/login`) → 메인 대시보드(`/`) 순서로 이동한다.
- **REQ-002**: 온보딩 화면에는 서비스 설명 텍스트와 "시작하기" 버튼이 존재한다. "시작하기" 클릭 시 `/login`으로 이동한다.
- **REQ-003**: 로그인 화면에는 "Google로 로그인 (회사 계정)" 버튼이 존재한다. 버튼 클릭 시 실제 OAuth 없이 즉시 `/`로 이동한다.
- **REQ-004**: `meeting-room-qr` quest ID를 가진 퀘스트만 기존 QR 스캔 UI(`QRScannerUI`)를 사용한다.
- **REQ-005**: 나머지 모든 퀘스트(`meeting-room-qr` 제외)는 새로운 "미션 확인" 플로우를 사용한다:
  - Step 1: "달성하셨나요?" 확인 화면 + "확인" 버튼 표시
  - Step 2: 버튼 클릭 → 로딩 스피너 + "확인하는 중..." 텍스트 표시 (2초)
  - Step 3: "확인되었습니다! ✅" 메시지 표시 (1초)
  - Step 4: `completeQuest(questId)` 호출로 포인트 적립 → `CompletionModal` 표시
- **REQ-006**: `/onboarding`과 `/login` 경로는 하단 `BottomNav`를 표시하지 않는다.
- **CON-001**: 실제 Google OAuth, 세션, 토큰, 쿠키 구현 없음 — UI 전용(Mock).
- **CON-002**: 기존 Zustand store(`gameStore.ts`) 구조 변경 없음.
- **CON-003**: 기존 `QRScannerUI`, `CompletionModal` 컴포넌트 재사용.
- **GUD-001**: 모든 신규 페이지는 모바일 375px 기준 레이아웃 우선.
- **GUD-002**: 색상 시스템 유지 — Primary `blue-600`, Success `green-500`, BG `gray-50`.
- **PAT-001**: 퀘스트 미션 분기 로직은 `app/quests/[id]/page.tsx` 내부에서 `quest.id === 'meeting-room-qr'` 조건으로 처리한다.

---

## 2. Implementation Steps

### Implementation Phase 1 — 온보딩 화면 구현

- GOAL-001: `/onboarding` 페이지를 생성하고, 서비스 소개 + "시작하기" 버튼을 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | `app/onboarding/page.tsx` 생성. `'use client'` 선언. `useRouter` 사용. 레이아웃: 전체 화면 중앙 정렬(`flex flex-col items-center justify-center min-h-screen`), `bg-gradient-to-b from-blue-600 to-blue-800` 배경. | | |
| TASK-002 | 온보딩 콘텐츠 구성: ① 앱 로고/타이틀 "Mega-Quest 🚀" (흰색, 2xl bold), ② 부제목 "신입사원을 위한 게이미피케이션 온보딩" (흰색, sm), ③ 기능 설명 리스트 3개(퀘스트 수행 / 트리니티 펫 성장 / 포인트 적립), ④ "시작하기" 버튼 (`bg-white text-blue-600`, 클릭 시 `router.push('/login')`). | | |
| TASK-003 | `app/layout.tsx` 수정: `pathname`이 `/onboarding` 또는 `/login`인 경우 `BottomNav`를 렌더링하지 않도록 조건 추가. `usePathname` 훅 사용 (`'use client'` 전환 필요 — 아래 TASK-004 참조). | | |
| TASK-004 | `app/layout.tsx`의 BottomNav 조건 처리를 위해 별도 `components/ui/NavWrapper.tsx` 클라이언트 컴포넌트 생성. `usePathname`으로 `/onboarding`, `/login` 경로 감지 시 `null` 반환, 그 외 `<BottomNav />` 반환. `layout.tsx`는 Server Component 유지. | | |

### Implementation Phase 2 — 로그인 화면 구현

- GOAL-002: `/login` 페이지를 생성하고, Google 로그인 버튼(UI 전용)을 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-005 | `app/login/page.tsx` 생성. `'use client'` 선언. 레이아웃: `bg-gray-50`, 상단 로고 영역 + 중앙 로그인 카드(`bg-white rounded-2xl shadow-sm p-8`). | | |
| TASK-006 | 로그인 카드 콘텐츠: ① 타이틀 "로그인" (xl bold), ② 안내 문구 "회사 계정으로 로그인하세요" (sm gray-400), ③ Google 로그인 버튼 — `border border-gray-200 rounded-xl py-3 flex items-center gap-3`, Google 로고 SVG 인라인 포함, 텍스트 "Google로 계속하기 (회사 계정)". 클릭 시 `router.push('/')`. | | |
| TASK-007 | Google 로고 SVG를 `components/icons/GoogleIcon.tsx`로 분리. `viewBox="0 0 24 24"` 기준 공개 도메인 Google 로고 path 사용. | | |

### Implementation Phase 3 — 퀘스트 미션 확인 UX 구현

- GOAL-003: `meeting-room-qr` 제외 퀘스트에 "달성하셨나요?" 확인 플로우를 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-008 | `components/MissionConfirmUI.tsx` 생성. props: `{ quest: Quest, onConfirm: () => void, isLoading: boolean, isConfirmed: boolean }`. 렌더링 분기: ① 기본 상태: 퀘스트 설명 + "달성하셨나요?" 텍스트 + "확인" 버튼(`bg-blue-600`), ② `isLoading=true`: 스피너 애니메이션(`animate-spin`) + "확인하는 중..." 텍스트, ③ `isConfirmed=true`: 초록 체크 아이콘 + "확인되었습니다! ✅" 텍스트. | | |
| TASK-009 | `app/quests/[id]/page.tsx` 수정. 기존 `isScanning` 상태 외에 `isMissionLoading`, `isMissionConfirmed` 상태 추가(`useState`). 렌더링 분기 로직 추가: `quest.id === 'meeting-room-qr'` → 기존 `QRScannerUI` 유지, 그 외 → `MissionConfirmUI` 렌더링. | | |
| TASK-010 | `app/quests/[id]/page.tsx`에 `handleMissionConfirm` 함수 구현: Step1: `setIsMissionLoading(true)`, Step2: `setTimeout 2000ms` 후 `setIsMissionLoading(false)`, `setIsMissionConfirmed(true)`, Step3: `setTimeout 1000ms` 후 `completeQuest(quest.id)`, `setIsMissionConfirmed(false)`, `setShowModal(true)`. | | |

### Implementation Phase 4 — 통합 검증

- GOAL-004: 전체 플로우(온보딩 → 로그인 → 대시보드, 퀘스트 미션 확인)가 오류 없이 동작하는지 확인한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-011 | `npm run build`로 TypeScript 타입 오류 및 빌드 오류 없음 확인. | | |
| TASK-012 | 수동 플로우 검증 — 온보딩 시나리오: `/onboarding` 접속 → "시작하기" 클릭 → `/login` 이동 → Google 버튼 클릭 → `/` 이동 → BottomNav 표시 확인. | | |
| TASK-013 | 수동 플로우 검증 — QR 퀘스트: `/quests/meeting-room-qr` → QR 스캔 UI 표시 → 스캔 → 완료 모달 → 홈 이동 + 포인트 반영. | | |
| TASK-014 | 수동 플로우 검증 — 일반 퀘스트: `/quests/hr-policy` → "달성하셨나요?" 화면 → "확인" 클릭 → 로딩(2초) → "확인되었습니다"(1초) → 완료 모달 → 홈 이동 + 포인트 반영. | | |
| TASK-015 | `/onboarding`, `/login` 경로에서 BottomNav 미표시 확인. `/`, `/quests`, `/quests/[id]` 경로에서 BottomNav 표시 확인. | | |

---

## 3. Alternatives

- **ALT-001**: `layout.tsx`에서 직접 `usePathname` 사용 — Server Component인 `layout.tsx`에서는 사용 불가. `NavWrapper` 분리로 해결.
- **ALT-002**: 실제 Google OAuth 연동 (`next-auth`) — 데모 전용 앱이므로 과도한 복잡도. UI 전용 구현으로 대체.
- **ALT-003**: 온보딩 표시 여부를 localStorage로 제어 (최초 1회만 표시) — 데모 영상 시연 시 매번 보여야 하므로 채택 안 함. 항상 표시 방식 유지.
- **ALT-004**: 미션 확인 플로우를 별도 모달로 구현 — 페이지 내 인라인 상태 전환이 UX상 더 자연스러워 채택 안 함.

---

## 4. Dependencies

- **DEP-001**: `lucide-react` — `Loader2`(스피너), `CheckCircle2`(확인) 아이콘 사용.
- **DEP-002**: `next/navigation` — `useRouter`, `usePathname` 사용.
- **DEP-003**: 기존 `store/gameStore.ts` — `completeQuest` 액션 재사용 (변경 없음).
- **DEP-004**: 기존 `components/ui/Modal.tsx`, `components/CompletionModal.tsx` — 재사용 (변경 없음).
- **DEP-005**: 기존 `components/QRScannerUI.tsx` — 재사용 (변경 없음).

---

## 5. Files

- **FILE-001**: `app/onboarding/page.tsx` — 신규 생성. 온보딩 화면.
- **FILE-002**: `app/login/page.tsx` — 신규 생성. 로그인 화면.
- **FILE-003**: `components/ui/NavWrapper.tsx` — 신규 생성. BottomNav 조건부 렌더 래퍼.
- **FILE-004**: `components/icons/GoogleIcon.tsx` — 신규 생성. Google 로고 SVG 컴포넌트.
- **FILE-005**: `components/MissionConfirmUI.tsx` — 신규 생성. 미션 확인 플로우 UI.
- **FILE-006**: `app/layout.tsx` — 수정. `BottomNav` → `NavWrapper`로 교체.
- **FILE-007**: `app/quests/[id]/page.tsx` — 수정. 퀘스트 ID 기반 렌더링 분기 + 미션 확인 로직 추가.

---

## 6. Testing

- **TEST-001**: 온보딩 → 로그인 → 홈 이동 플로우 수동 검증 (TASK-012).
- **TEST-002**: `/onboarding`, `/login`에서 BottomNav 미표시 확인 (TASK-015).
- **TEST-003**: `meeting-room-qr` 퀘스트에서 QR UI 유지 확인 (TASK-013).
- **TEST-004**: 일반 퀘스트에서 3단계 미션 확인 플로우(로딩 → 확인 → 모달) 확인 (TASK-014).
- **TEST-005**: 모든 퀘스트 완료 후 포인트 및 petStage 정상 업데이트 확인.
- **TEST-006**: `npm run build` 타입/빌드 오류 없음 확인 (TASK-011).

---

## 7. Risks & Assumptions

- **RISK-001**: `app/layout.tsx`가 Server Component이므로 `usePathname` 직접 사용 불가 → `NavWrapper` Client Component 분리로 해결.
- **RISK-002**: `setTimeout` 중첩 사용 시 컴포넌트 언마운트 후 상태 업데이트 시도 가능 → 필요 시 `useRef`로 cleanup.
- **RISK-003**: 온보딩/로그인 페이지에서 BottomNav 높이만큼 `pb-20`이 `main`에 적용되면 레이아웃 여백 발생 → `NavWrapper` 미표시와 함께 `layout.tsx`에서 경로별 패딩 조건 처리 필요.
- **ASSUMPTION-001**: Google 로고 SVG는 공개 도메인 path 사용 (실제 Google 브랜드 가이드라인 적용 불필요 — 데모 전용).
- **ASSUMPTION-002**: 로그인 상태는 전역 상태로 관리하지 않음 — 버튼 클릭 즉시 라우팅.

---

## 8. Related Specifications / Further Reading

- [Epic PRD](../epic.md)
- [Full MVP Implementation Plan v1](./implementation-plan.md)
- [Next.js App Router Layout 공식 문서](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
