# Feature PRD: 퀘스트 미션 확인 UX (Quest Mission Confirm UX)

## 1. Feature Name

**퀘스트 미션 확인 UX — 달성 확인 플로우 + QR 분기**

---

## 2. Epic

- **Parent Epic PRD:** [Mega-Quest MVP Epic](../epic.md)- **Implementation Plan:** [Full MVP Implementation Plan](../../plan/implementation-plan.md)
- **Related Features:** [온보딩 플로우 PRD](onboarding-flow.md), [로그인 플로우 PRD](login-flow.md)

---

## 3. Goal

### Problem
기존 모든 퀘스트 상세 화면이 QR 스캔 UI를 표시한다. 그러나 대부분의 퀘스트(인사제도 확인, 오피스 투어, 메일 확인 등)는 QR 코드와 무관한 자기 선언형 미션이다. QR UI를 모든 퀘스트에 보여주면 맥락에 맞지 않아 UX가 어색하고, 심사자에게 앱이 덜 완성된 것처럼 보인다.

### Solution
퀘스트 ID를 기준으로 미션 수행 UI를 분기한다. `meeting-room-qr` 퀘스트는 기존 QR 스캔 시뮬레이터를 유지하고, 나머지 퀘스트는 "달성하셨나요?" 자기 선언 확인 플로우를 제공한다. 확인 플로우는 "확인" 버튼 → 로딩(2초) → "확인되었습니다! ✅" (1초) → 완료 모달 → 홈 이동 순서로 진행되며, 시스템이 미션을 "검증"하는 듯한 느낌을 준다.

### Impact
- 퀘스트별 맥락에 맞는 UX 제공으로 완성도 향상
- "검증 중" 로딩 효과로 시스템 신뢰감 부여
- QR 미션 외 8개 퀘스트 모두 자연스럽게 완료 가능

---

## 4. User Personas

### 페르소나 1: 신입사원 (Primary User)
- 퀘스트 완료 시 즉각적인 피드백과 보상을 기대
- "내가 정말 완료한 건지" 불안감을 피드백으로 해소하고 싶음

### 페르소나 2: HR 담당자 / 해커톤 심사자
- 각 퀘스트마다 맥락에 맞는 다른 UX가 있다는 것을 확인하고 싶음
- QR 체크인과 일반 미션의 차이를 직관적으로 이해하고 싶음

---

## 5. User Stories

- **US-001:** As a 신입사원, I want to see a relevant mission UI for each quest type so that the experience feels natural and purposeful.
- **US-002:** As a 신입사원 doing a non-QR quest, I want to see a "달성하셨나요?" screen with a confirm button so that I can self-report my mission completion.
- **US-003:** As a 신입사원, I want to see a loading animation after confirming so that I feel the system is verifying my achievement.
- **US-004:** As a 신입사원, I want to see "확인되었습니다! ✅" before the completion modal so that I get a satisfying confirmation moment.
- **US-005:** As a 신입사원 doing the meeting-room QR quest, I want to see the QR scanner UI so that the experience matches the real-world check-in action.
- **US-006 (Edge):** As a 신입사원, I want the confirm button to be disabled during loading so that I cannot accidentally trigger the flow twice.
- **US-007 (Edge):** As a 신입사원 revisiting a completed quest, I want to see a "이미 완료한 퀘스트" screen so that I understand it's done and can return home.

---

## 6. Requirements

### Functional Requirements

**퀘스트 타입 분기:**
- `quest.id === 'meeting-room-qr'`인 경우 → 기존 `QRScannerUI` 컴포넌트 표시.
- 그 외 모든 퀘스트 → `MissionConfirmUI` 컴포넌트 표시.

**MissionConfirmUI 기능:**
- 기본 상태: 퀘스트 아이콘(🎯) + 제목 + 설명 + 보상 포인트 표시 + "확인" 버튼.
- "확인" 버튼 클릭 시:
  - Step 1 (`isLoading=true`, 2000ms): `Loader2` 스피너 + "확인하는 중..." 텍스트 표시.
  - Step 2 (`isConfirmed=true`, 1000ms): `CheckCircle2` 아이콘 + "확인되었습니다! ✅" 텍스트 표시.
  - Step 3: `completeQuest(questId)` 호출 → `CompletionModal` 표시.
- 로딩 중 또는 확인된 상태에서 버튼은 비활성화(`disabled`)된다.

**공통:**
- 완료 모달에서 "확인" 클릭 시 홈(`/`)으로 이동.
- 이미 `completed` 상태인 퀘스트 접근 시 완료 안내 화면 + 홈 버튼 표시.
- `locked` 상태인 퀘스트 URL 직접 접근 시 잠금 안내 화면(🔒) + 퀘스트 목록 버튼 표시.
- 헤더: QR 퀘스트는 `bg-black` 배경, 일반 퀘스트는 `bg-white border-b` 배경.

### Non-Functional Requirements
- **타이밍 정확성:** Step 1은 정확히 2000ms, Step 2는 정확히 1000ms 후 전환.
- **메모리 안전성:** 컴포넌트 언마운트 시 진행 중인 `setTimeout`이 메모리 누수를 일으키지 않아야 한다 (`useRef` cleanup).
- **접근성:** 확인 버튼에 `aria-label="미션 달성 확인"` 적용. 비활성화 상태 시 `disabled` 속성 사용.
- **모바일:** `min-h-[calc(100vh-10rem)]` 기준으로 콘텐츠 여백 확보.

---

## 7. Acceptance Criteria

### US-001, US-005: QR 퀘스트 분기
- [ ] `meeting-room-qr` 퀘스트 상세 진입 시 `QRScannerUI`가 표시된다.
- [ ] 헤더 배경이 `bg-black`이다.
- [ ] 스캔하기 버튼 클릭 → 2초 → 완료 모달 → 홈 이동 + 포인트 반영.

### US-002: 일반 퀘스트 확인 화면
- [ ] `meeting-room-qr` 외 퀘스트 진입 시 `MissionConfirmUI`가 표시된다.
- [ ] 퀘스트 제목, 설명, 예상 포인트(`+NP 획득 예정`)가 표시된다.
- [ ] "달성하셨나요?" 텍스트가 표시된다.
- [ ] "확인" 버튼이 표시된다.

### US-003, US-004: 확인 플로우 단계
- [ ] "확인" 클릭 시 즉시 스피너 + "확인하는 중..." 표시된다.
- [ ] 2초 후 스피너가 사라지고 체크 아이콘 + "확인되었습니다! ✅"가 표시된다.
- [ ] 1초 후 완료 모달이 표시된다.
- [ ] 완료 모달에 퀘스트 제목과 획득 포인트(`+NP`)가 표시된다.
- [ ] "확인" 클릭 시 홈으로 이동하고, 포인트와 petStage가 업데이트된다.

### US-006: 버튼 비활성화
- [ ] 로딩 중 "확인" 버튼이 `disabled` 상태이다.
- [ ] "확인됨" 상태에서도 버튼이 `disabled` 상태이다.

### US-007: 완료된 퀘스트 재접근
- [ ] 이미 `completed`인 퀘스트 URL 직접 접근 시 완료 안내 화면이 표시된다.
- [ ] "홈으로" 버튼으로 `/`로 이동 가능하다.

---

## 8. Out of Scope

- 실제 QR 코드 카메라 스캔 기능 (버튼 시뮬레이션 유지)
- 미션 증거 사진 업로드
- 관리자 검수 또는 승인 플로우
- 퀘스트별 상세 설명 페이지 (별도 화면)
- 타이머 기반 잠금 (cooldown)
- 퀘스트 취소 또는 되돌리기 기능
