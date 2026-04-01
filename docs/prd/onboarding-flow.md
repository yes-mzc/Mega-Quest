# Feature PRD: 온보딩 플로우 (Onboarding Flow)

## 1. Feature Name

**온보딩 플로우 — 서비스 소개 + 시작하기 진입점**

---

## 2. Epic

- **Parent Epic PRD:** [Mega-Quest MVP Epic](../epic.md)
- **Implementation Plan:** [Full MVP Implementation Plan](../full-mvp/implementation-plan.md)
- **Related Feature:** [로그인 플로우 PRD](../login-flow/prd.md), [퀘스트 미션 UX PRD](../quest-mission-ux/prd.md)

---

## 3. Goal

### Problem
앱을 처음 실행한 신입사원은 Mega-Quest가 어떤 서비스인지, 무엇을 기대할 수 있는지 아무런 컨텍스트 없이 바로 대시보드로 진입한다. 이는 서비스의 가치를 전달하지 못하고, 첫인상에서 참여 동기를 충분히 심어주지 못하는 문제를 야기한다. 특히 해커톤 데모 맥락에서 심사자에게 "이 앱이 무엇인지"를 즉시 전달하는 것이 중요하다.

### Solution
앱 진입 시 블루 그라데이션 배경의 온보딩 화면을 먼저 보여준다. 이 화면에서 Mega-Quest의 핵심 가치(퀘스트 수행, 펫 성장, 포인트 적립)를 3개의 아이콘+텍스트 카드로 명확하게 전달하고, "시작하기" 버튼으로 로그인 화면으로 자연스럽게 유도한다.

### Impact
- 서비스 첫인상에서 핵심 가치 전달 완료
- 심사자가 앱의 목적을 3초 내에 파악 가능
- 로그인 → 대시보드로 이어지는 명확한 진입 플로우 확립

---

## 4. User Personas

### 페르소나 1: 신입사원 (Primary User)
- 앱을 처음 접하는 사용자로, 서비스에 대한 사전 지식 없음
- 모바일에서 빠르게 파악하고 바로 시작하고 싶음

### 페르소나 2: HR 담당자 / 해커톤 심사자
- 데모 시연 시 앱의 목적을 즉시 이해하고 싶음
- 매 데모마다 처음부터 플로우를 체험해야 함

---

## 5. User Stories

- **US-001:** As a 신입사원, I want to see a welcoming introduction screen when I first open the app so that I can understand what Mega-Quest offers before proceeding.
- **US-002:** As a 신입사원, I want to see 3 key features highlighted visually so that I can quickly grasp the value of the app.
- **US-003:** As a 신입사원, I want to tap a "시작하기" button so that I can proceed to the login screen and begin my onboarding journey.
- **US-004:** As a 해커톤 심사자, I want to see a polished, branded introduction screen so that I can immediately understand the product concept.
- **US-005 (Edge):** As a 신입사원, I want the onboarding screen to appear every time I open the app so that the demo flow is always consistent and predictable.

---

## 6. Requirements

### Functional Requirements
- 앱 최초 진입 경로는 `/onboarding`이어야 한다.
- 온보딩 화면은 매 실행 시 항상 표시된다 (localStorage 기반 "skip" 처리 없음).
- 화면에는 다음 요소가 포함되어야 한다:
  - 앱 아이콘/이모지 (🚀) + 타이틀 "Mega-Quest"
  - 부제목: "신입사원을 위한 게이미피케이션 온보딩"
  - 핵심 기능 카드 3개 (아이콘 + 텍스트):
    1. 퀘스트를 수행하며 회사를 탐험해요
    2. 포인트를 모아 트리니티 펫을 키워요
    3. 온보딩을 완료하고 명예 칭호를 획득해요
  - "시작하기 →" CTA 버튼
- "시작하기" 버튼 클릭 시 `/login`으로 이동한다.
- `/onboarding` 및 `/login` 경로에서는 하단 `BottomNav`가 표시되지 않는다.

### Non-Functional Requirements
- **모바일 우선:** 375px 기준으로 전체 화면 레이아웃이 깨지지 않아야 한다.
- **접근성:** CTA 버튼에 `aria-label` 적용.
- **성능:** 온보딩 화면은 외부 API 의존 없이 즉시 렌더링되어야 한다.
- **브랜딩:** 배경은 `bg-gradient-to-b from-blue-600 to-blue-900`, 버튼은 `bg-white text-blue-600`.

---

## 7. Acceptance Criteria

### US-001, US-002: 온보딩 화면 표시
- [ ] `/onboarding` 경로 접근 시 블루 그라데이션 배경 화면이 표시된다.
- [ ] 🚀 이모지, "Mega-Quest" 타이틀, 부제목이 화면 상단에 표시된다.
- [ ] 3개 기능 카드(아이콘 + 텍스트)가 모두 표시된다.
- [ ] BottomNav가 표시되지 않는다.

### US-003: 시작하기 버튼 동작
- [ ] "시작하기 →" 버튼이 화면 하단에 표시된다.
- [ ] 버튼 클릭 시 `/login` 페이지로 이동한다.
- [ ] 버튼에 `active:scale-95` 터치 피드백이 적용된다.

### US-005: 매 실행 시 표시
- [ ] 새로고침 또는 재방문 시에도 `/onboarding`이 진입점으로 동작한다.
- [ ] localStorage 기반 "이미 봤음" 로직이 없다.

---

## 8. Out of Scope

- 온보딩 슬라이드 여러 페이지 (페이지네이션) — 단일 화면으로 충분
- 온보딩 건너뛰기(Skip) 버튼
- 애니메이션 입장 효과 (fade-in 등)
- 사용자별 온보딩 완료 여부 서버 저장
- A/B 테스트 또는 컨텐츠 개인화
