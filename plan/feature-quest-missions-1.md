---
goal: 신입사원 온보딩 미션 확장 — Stage 1~4 퀘스트 추가
version: 1.0
date_created: 2026-04-01
last_updated: 2026-04-01
owner: Mega-Quest Team
status: 'Completed'
tags: [feature, quest, onboarding, data]
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-brightgreen)

현재 Mega-Quest에는 `hr-beginner`, `role-specific`, `daily-monthly` 3개 카테고리에 총 9개 퀘스트가 존재한다. 이 계획은 신입사원 온보딩 흐름을 반영한 4개 스테이지(Pre-boarding, Day 1, Mandatory Training, Know Your Company) 총 22개 미션을 추가하고, 이를 수용할 수 있도록 타입·UI를 확장한다.

> ⚠️ Stage 4 원문이 일부 잘렸습니다. 제공된 항목(회사 비전/미션/핵심 가치 퀴즈, 조직도 파악)만 포함하며, 추가 항목은 요구사항 확인 후 보완이 필요합니다.

---

## 1. Requirements & Constraints

- **REQ-001**: 새 미션은 `lib/mockData.ts`의 `initialQuests` 배열에 추가되어야 한다.
- **REQ-002**: 새 카테고리 4개(`pre-boarding`, `day-one`, `mandatory-training`, `company-culture`)를 `QuestCategory` 유니온 타입에 추가해야 한다.
- **REQ-003**: 기존 카테고리(`hr-beginner`, `role-specific`, `daily-monthly`) 및 기존 9개 퀘스트는 수정·삭제하지 않는다.
- **REQ-004**: `CategoryTabs` 컴포넌트의 TABS 배열에 새 카테고리 4개를 추가하여 탭 UI에 노출해야 한다.
- **REQ-005**: 각 미션은 고유 `id`(kebab-case), `title`, `description`, `rewardPoints`, `status`, `category`를 가져야 한다.
- **REQ-006**: 스테이지 흐름(1→2→3→4)을 반영하여 Stage 1은 `available`, Stage 2~4는 초기 `locked` 상태로 설정한다.
- **REQ-007**: Stage 1 완료 포인트(11P)는 기존 daily-monthly 퀘스트(9P)와 합산 시 petStage 3(15P+) 진입이 가능해야 한다.
- **CON-001**: 백엔드 없음 — 모든 데이터는 `lib/mockData.ts` mock 데이터로만 관리한다.
- **CON-002**: TypeScript strict 모드 준수 — `QuestCategory` 타입 변경 시 모든 사용처에서 컴파일 오류 없어야 한다.
- **CON-003**: `next build` 및 `tsc --noEmit`이 수정 후 오류 없이 통과해야 한다.
- **GUD-001**: `id`는 영문 소문자 + 하이픈 형식(`pre-boarding-docs` 등)을 사용한다.
- **GUD-002**: `description`은 사용자가 무엇을 해야 하는지 명확히 설명하는 1~2문장으로 작성한다.
- **PAT-001**: 기존 퀘스트 객체 구조(`id`, `category`, `title`, `description`, `rewardPoints`, `status`)를 그대로 따른다.

---

## 2. Implementation Steps

### Implementation Phase 1 — 타입 확장

- GOAL-008: `lib/types.ts`의 `QuestCategory` 유니온 타입에 신규 카테고리 4개를 추가하여 TypeScript 타입 안전성을 확보한다.

| Task     | Description | Completed | Date |
| -------- | ----------- | --------- | ---- |
| TASK-037 | `lib/types.ts`의 `QuestCategory` 타입 수정 | ✅ | 2026-04-01 |

---

### Implementation Phase 2 — 퀘스트 데이터 추가

- GOAL-009: `lib/mockData.ts`의 `initialQuests` 배열에 22개 신규 퀘스트 객체를 스테이지 순서대로 추가한다.

**Stage 1: Pre-boarding** — `category: 'pre-boarding'`, `status: 'available'`, 합계 11P

| id | title | description | rewardPoints |
|----|-------|-------------|--------------|
| `pre-boarding-docs` | 입사 서류 제출 | 주민등록등본, 졸업증명서, 통장사본 등 필수 입사 서류를 HR 포탈에 제출하세요. | 3 |
| `pre-boarding-security-agreement` | 보안 서약서 작성 | 보안 서약서 및 개인정보 수집·이용 동의서를 작성하고 제출하세요. | 2 |
| `pre-boarding-account-setup` | 사내 계정 생성 | 업무용 이메일, 메신저, 사내 포탈 계정을 생성하고 초기 비밀번호를 변경하세요. | 3 |
| `pre-boarding-profile-photo` | 프로필 사진 등록 | 사내 시스템에 프로필 사진을 등록하세요. | 1 |
| `pre-boarding-self-intro` | 자기소개서 작성 | 사내 게시판에 게시될 자기소개를 작성하고 등록하세요. | 2 |

**Stage 2: Day 1** — `category: 'day-one'`, `status: 'locked'`, 합계 12P

| id | title | description | rewardPoints |
|----|-------|-------------|--------------|
| `day-one-id-card` | 사원증 수령 | 총무팀에서 사원증 및 출입카드를 수령하고 등록하세요. | 2 |
| `day-one-workstation` | 장비 세팅 | 배정된 자리에서 노트북, 모니터 등 장비를 수령하고 초기 세팅을 완료하세요. | 3 |
| `day-one-wifi-vpn` | Wi-Fi / VPN 연결 | 사내 Wi-Fi에 접속하고 VPN을 설치하여 정상 연결을 확인하세요. | 2 |
| `day-one-team-intro` | 팀원 인사 | 소속 팀원 전원에게 인사하고 자기소개를 완료하세요. | 2 |
| `day-one-office-tour` | 사무실 투어 | 회의실, 휴게실, 식당, 비상구 위치를 파악하고 투어를 완료하세요. | 2 |
| `day-one-buddy` | 멘토/버디 확인 | 배정된 멘토 또는 버디를 확인하고 첫 미팅을 진행하세요. | 1 |

**Stage 3: Mandatory Training** — `category: 'mandatory-training'`, `status: 'locked'`, 합계 14P

| id | title | description | rewardPoints |
|----|-------|-------------|--------------|
| `training-security` | 정보보안 교육 | 정보보안 온라인 교육을 이수하고 수료증을 제출하세요. | 3 |
| `training-sexual-harassment` | 성희롱 예방 교육 | 성희롱 예방 교육을 이수하고 수료증을 제출하세요. | 2 |
| `training-workplace-bullying` | 직장 내 괴롭힘 예방 교육 | 직장 내 괴롭힘 예방 교육을 이수하고 수료증을 제출하세요. | 2 |
| `training-safety-health` | 안전보건 교육 | 산업안전보건 교육을 이수하고 수료증을 제출하세요. | 2 |
| `training-privacy` | 개인정보 보호 교육 | 개인정보 보호 온라인 교육을 이수하고 수료증을 제출하세요. | 2 |
| `training-systems` | 사내 시스템 교육 | 그룹웨어, 근태관리, 경비처리 시스템 사용법 교육을 이수하세요. | 3 |

**Stage 4: Know Your Company** — `category: 'company-culture'`, `status: 'locked'`, 합계 5P (⚠️ 미완성)

| id | title | description | rewardPoints |
|----|-------|-------------|--------------|
| `culture-vision-quiz` | 회사 비전/미션 퀴즈 | 회사 비전, 미션, 핵심 가치를 학습하고 퀴즈를 완료하세요. | 3 |
| `culture-org-chart` | 조직도 파악 | 사내 포탈에서 전체 조직도를 확인하고 주요 부서 역할을 파악하세요. | 2 |

| Task | Description | Completed | Date |
| ---- | ----------- | --------- | ---- |
| TASK-038 | `lib/mockData.ts`에 22개 퀘스트 추가 | ✅ | 2026-04-01 |

---

### Implementation Phase 3 — CategoryTabs UI 확장

- GOAL-010: `components/CategoryTabs.tsx`의 `TABS` 배열에 신규 카테고리 4개를 추가한다.

| Task | Description | Completed | Date |
| ---- | ----------- | --------- | ---- |
| TASK-039 | `CategoryTabs.tsx` TABS 배열에 4개 탭 추가 | ✅ | 2026-04-01 |

---

### Implementation Phase 4 — 검증

- GOAL-011: 변경 사항이 빌드 및 타입 검사를 통과하는지 확인한다.

| Task | Description | Completed | Date |
| ---- | ----------- | --------- | ---- |
| TASK-040 | `npx tsc --noEmit` — 오류 0개 확인 | ✅ | 2026-04-01 |
| TASK-041 | `npm run build` — 빌드 성공 | ✅ | 2026-04-01 |
| TASK-042 | `/quests` 접속 후 7개 탭 모두 노출 확인 | | |
| TASK-043 | `?category=pre-boarding` → Stage 1 퀘스트 5개 표시 확인 | | |
| TASK-044 | `?category=day-one` → locked 상태 퀘스트 6개 표시 확인 | | |

---

## 3. Alternatives

- **ALT-001**: 기존 3개 카테고리에 새 미션을 억지로 매핑 → 카테고리 의미 퇴색 및 UX 혼란으로 기각
- **ALT-002**: 스테이지를 별도 `stage: number` 필드로 관리 → 탭 UI 연계가 어려워 기각
- **ALT-003**: 데이터를 외부 JSON 파일로 분리 → MVP 범위 초과, 불필요한 복잡성으로 기각

---

## 4. Dependencies

- **DEP-001**: `lib/types.ts` — `QuestCategory` 타입 (Phase 1 선행 필수)
- **DEP-002**: `lib/mockData.ts` — `initialQuests` 배열 (DEP-001 완료 후 실행)
- **DEP-003**: `components/CategoryTabs.tsx` — TABS 배열 (DEP-001 완료 후 실행)

---

## 5. Files

- **FILE-001**: `lib/types.ts` — `QuestCategory` 유니온 타입에 4개 신규 카테고리 추가
- **FILE-002**: `lib/mockData.ts` — `initialQuests` 배열에 22개 퀘스트 객체 추가
- **FILE-003**: `components/CategoryTabs.tsx` — `TABS` 배열에 4개 탭 항목 추가

---

## 6. Testing

- **TEST-001**: `getPetStage(11)` → `2` 반환 확인 (Stage 1 완료 시 petStage 2 진입)
- **TEST-002**: `getProgressPercent(11, 2)` → `10` 반환 확인 (10P/10P 범위)
- **TEST-003**: `/quests?category=pre-boarding` → 퀘스트 5개 렌더링 확인
- **TEST-004**: `/quests?category=day-one` → locked 배지 포함 퀘스트 6개 렌더링 확인
- **TEST-005**: `/quests/day-one-id-card` 직접 접근 → 🔒 잠금 안내 화면 표시 확인
- **TEST-006**: `completeQuest('pre-boarding-docs')` 호출 후 `user.points === 3`, 해당 퀘스트 `status === 'completed'` 확인
- **TEST-007**: `tsc --noEmit` 오류 0개 확인
- **TEST-008**: `npm run build` 성공 확인

---

## 7. Risks & Assumptions

- **RISK-001**: Stage 4 원문 일부 누락 — 구현 전 전체 목록 재확인 및 TASK-038 보완 필요
- **RISK-002**: 탭 7개 증가로 모바일 가로 스크롤 UX 저하 가능 — `overflow-x-auto` 적용 중이나 탭 라벨 길이 최소화 권장
- **RISK-003**: `persist version: 2` 유지 시 기존 localStorage와 호환 — 새 퀘스트 추가만이므로 버전 업 불필요하나, 기존 사용자 상태에 새 퀘스트가 없을 경우 `resetGame()` 필요
- **ASSUMPTION-001**: Stage 2~4 잠금 해제 로직(이전 스테이지 완료 시 unlock)은 이번 MVP 범위에 포함하지 않음
- **ASSUMPTION-002**: 신규 퀘스트 전체는 `MissionConfirmUI` 방식으로 처리. `QR_QUEST_ID`는 `meeting-room-qr` 단독 유지

---

## 8. Related Specifications / Further Reading

- [`lib/types.ts`](/lib/types.ts) — 현재 QuestCategory 타입 정의
- [`lib/mockData.ts`](/lib/mockData.ts) — 현재 퀘스트 데이터 (9개)
- [`components/CategoryTabs.tsx`](/components/CategoryTabs.tsx) — 현재 탭 UI (3개 탭)
- [`app/quests/[id]/page.tsx`](/app/quests/[id]/page.tsx) — locked 상태 처리 로직 (QA BUG#3 수정 완료)
- [`docs/ways-of-work/plan/mega-quest-mvp/`](/docs/ways-of-work/plan/mega-quest-mvp/) — 기존 MVP 계획 문서
