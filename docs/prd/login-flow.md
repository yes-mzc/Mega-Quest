# Feature PRD: 로그인 플로우 (Login Flow)

## 1. Feature Name

**로그인 플로우 — Google 회사 계정 로그인 UI (Mock)**

---

## 2. Epic

- **Parent Epic PRD:** [Mega-Quest MVP Epic](../epic.md)
- **Implementation Plan:** [Full MVP Implementation Plan](../full-mvp/implementation-plan.md)
- **Related Features:** [온보딩 플로우 PRD](../onboarding-flow/prd.md), [퀘스트 미션 UX PRD](../quest-mission-ux/prd.md)

---

## 3. Goal

### Problem
온보딩 화면에서 "시작하기"를 누른 사용자가 바로 대시보드로 진입하면 "누구의 온보딩인가?"에 대한 컨텍스트가 없다. 실제 서비스라면 사용자 인증이 필요하며, 데모/해커톤 시연에서도 로그인 단계가 있어야 서비스의 완성도와 실제 도입 가능성을 보여줄 수 있다.

### Solution
온보딩 → 로그인 → 대시보드 순서의 진입 플로우를 구성한다. 로그인 화면에는 "Google로 계속하기 (회사 계정)" 버튼을 제공하며, 데모 환경에서는 실제 OAuth 없이 버튼 클릭 즉시 대시보드(`/`)로 이동한다. Google 로고 SVG를 정확히 표시하여 실제 서비스와 유사한 완성도를 전달한다.

### Impact
- 온보딩 → 로그인 → 대시보드 완결된 사용자 진입 플로우 완성
- 심사자에게 실제 도입 시나리오(회사 계정 SSO)를 시각적으로 전달
- 향후 실제 Google OAuth 연동 시 UI 변경 없이 로직만 추가 가능

---

## 4. User Personas

### 페르소나 1: 신입사원 (Primary User)
- 회사 Gmail 계정을 보유하고 있음
- 로그인 절차가 간단하고 친숙하기를 원함 (Google SSO 익숙)

### 페르소나 2: HR 담당자 / 해커톤 심사자
- "회사 계정으로만 접근 가능"이라는 보안 맥락을 시각적으로 확인하고 싶음
- 버튼 클릭 한 번으로 데모 플로우가 자연스럽게 이어지기를 기대

---

## 5. User Stories

- **US-001:** As a 신입사원, I want to see a clean login screen after onboarding so that I can sign in before accessing my dashboard.
- **US-002:** As a 신입사원, I want to see a "Google로 계속하기" button with the Google logo so that I can sign in with my familiar company account.
- **US-003:** As a 신입사원, I want to be taken directly to the home dashboard after clicking the login button so that I can start my onboarding quests immediately.
- **US-004:** As a 해커톤 심사자, I want to see a polished, standard login UI so that I can envision the real-world authentication experience.
- **US-005 (Edge):** As a user, I want the login page to not show BottomNav so that the screen feels like a dedicated auth flow, separate from the main app.

---

## 6. Requirements

### Functional Requirements
- `/login` 경로에 로그인 페이지가 존재해야 한다.
- 화면에는 다음 요소가 포함되어야 한다:
  - 상단 로고 영역: 🚀 이모지 + "Mega-Quest" 텍스트
  - 흰색 카드 (`bg-white rounded-2xl shadow-sm`):
    - 제목: "로그인"
    - 안내 문구: "회사 계정으로 로그인하세요"
    - Google 로그인 버튼: Google 4색 로고 SVG + "Google로 계속하기 (회사 계정)" 텍스트
  - 하단 copyright 문구
- Google 로그인 버튼 클릭 시 실제 OAuth 없이 즉시 `/`(홈)으로 이동한다.
- `/login` 경로에서 `BottomNav`는 표시되지 않는다.
- Google 로고 SVG는 공식 4색(파랑/초록/노랑/빨강)으로 정확히 표현되어야 한다.

### Non-Functional Requirements
- **모바일 우선:** 375px 기준 카드 레이아웃이 화면 중앙에 위치해야 한다.
- **접근성:** Google 버튼에 `aria-label="Google 회사 계정으로 로그인"` 적용.
- **보안(데모):** 실제 토큰, 쿠키, 세션 처리 없음 — UI 전용 구현.
- **확장성:** 향후 `next-auth` 연동 시 버튼의 `onClick`만 교체하면 되는 구조.
- **브랜딩:** 배경 `bg-gray-50`, 카드 `bg-white`, 버튼 `border border-gray-200`.

---

## 7. Acceptance Criteria

### US-001, US-002: 로그인 화면 표시
- [ ] `/login` 접근 시 흰색 카드가 화면 중앙에 표시된다.
- [ ] 🚀 이모지와 "Mega-Quest" 로고가 카드 위에 표시된다.
- [ ] "로그인" 제목과 "회사 계정으로 로그인하세요" 안내 문구가 표시된다.
- [ ] Google 4색 SVG 로고가 버튼 좌측에 정확히 표시된다.
- [ ] 버튼 텍스트는 "Google로 계속하기 (회사 계정)"이다.
- [ ] BottomNav가 표시되지 않는다.

### US-003: 로그인 버튼 동작
- [ ] Google 버튼 클릭 시 `/` (홈 대시보드)로 이동한다.
- [ ] 이동 후 BottomNav가 정상 표시된다.
- [ ] 이동 후 Zustand store의 초기 사용자 정보(김신입, 0P)가 홈에 표시된다.

### US-005: BottomNav 미표시
- [ ] `/login` 경로에서 하단 네비게이션 바가 없다.
- [ ] `/onboarding` 경로에서도 하단 네비게이션 바가 없다.

---

## 8. Out of Scope

- 실제 Google OAuth 2.0 / `next-auth` 구현
- 이메일/비밀번호 로그인 폼
- 로그인 실패 에러 처리 UI
- 자동 로그인(Remember me) 기능
- 로그아웃 기능
- 사용자 세션/토큰 관리
- 다른 SSO 제공자 (GitHub, Kakao 등)
