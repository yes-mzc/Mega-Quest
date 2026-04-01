# 🎮 Mega-Quest

> 신입사원 온보딩을 게임처럼. 퀘스트를 완료하고 트리니티 펫을 키워보세요.

![Status](https://img.shields.io/badge/status-MVP%20Demo-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2.29-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)

---

## 프로젝트 소개

Mega-Quest는 신입사원 온보딩을 게이미피케이션으로 풀어낸 **모바일 웹앱 MVP**입니다.  
퀘스트를 수행하며 포인트를 쌓고, 가상 마스코트 **트리니티 펫**이 함께 성장합니다.

**해결하는 문제**
- 신입사원이 온보딩 정보를 찾는 데 쏟는 시간과 에너지 낭비
- 공채/수시 채용 형태별로 불균등한 온보딩 경험
- 단방향 자료 전달 방식의 낮은 참여도

**핵심 가치**
- 📱 **Mobile-First** — 모바일 뷰포트(375px) 기준으로 최적화
- ⚖️ **Equity** — 채용 형태 무관, 동일한 온보딩 경험
- 🎉 **Fun** — 퀘스트·포인트·펫 성장으로 자발적 참여 유도

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000/onboarding](http://localhost:3000/onboarding) 에서 데모를 시작하세요.

```bash
# 프로덕션 빌드
npm run build

# 타입 검사만 실행
npx tsc --noEmit
```

---

## 데모 플로우

```
/onboarding → /login → / → /quests → /quests/[id]
  인트로       로그인   홈    퀘스트 목록   미션 수행
```

| 단계 | 경로 | 설명 |
|---|---|---|
| 1 | `/onboarding` | 앱 소개 인트로 화면 |
| 2 | `/login` | Google 로그인 UI (Mock, 실제 인증 없음) |
| 3 | `/` | 홈 대시보드 — 트리니티 펫, 포인트 현황, 오늘의 퀘스트 |
| 4 | `/quests` | 퀘스트 로드맵 — 7개 카테고리 탭, 28개 미션 |
| 5 | `/quests/[id]` | 미션 수행 — QR 스캔 또는 달성 확인 플로우 |

---

## 기술 스택

| 분류 | 기술 | 버전 |
|---|---|---|
| Framework | Next.js (App Router) | 14.2.29 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^3.4.1 |
| State | Zustand + persist middleware | ^5 |
| Icons | lucide-react | ^0.469.0 |
| Data | Mock (백엔드 없음) | — |

---

## 프로젝트 구조

```
Mega-Quest/
├── app/
│   ├── layout.tsx           # 루트 레이아웃 (NavWrapper 포함)
│   ├── page.tsx             # 홈 대시보드
│   ├── onboarding/          # 온보딩 인트로
│   ├── login/               # 로그인 (Mock)
│   └── quests/
│       ├── page.tsx         # 퀘스트 목록 (<Suspense> 래핑 필수)
│       └── [id]/page.tsx    # 미션 수행 (QR / 달성확인 분기)
├── components/
│   ├── ui/                  # Badge, Modal, ProgressBar, BottomNav, NavWrapper
│   ├── icons/               # GoogleIcon 등 SVG
│   ├── PetAvatar.tsx        # 이모지 기반 펫 표시 (🥚🐣✨)
│   ├── CategoryTabs.tsx     # 7개 카테고리 탭 (우측 fade gradient)
│   ├── QuestCard.tsx        # 퀘스트 리스트 아이템
│   ├── QRScannerUI.tsx      # QR 스캔 시뮬레이터
│   ├── MissionConfirmUI.tsx # 달성 확인 플로우 (로딩 1s → 확인 1s → 모달)
│   ├── CompletionModal.tsx  # 완료 보상 모달 (다음 퀘스트 / 홈으로)
│   ├── DailyQuestShortcut.tsx  # 일일 퀘스트 바로가기 (완료 시 상태 변경)
│   └── PointsProgressBar.tsx
├── store/
│   └── gameStore.ts         # Zustand store — version: 4
├── lib/
│   ├── types.ts             # User, Quest, PetStageConfig, QuestCategory (7개)
│   ├── mockData.ts          # Mock 데이터 — 퀘스트 28개, 전체 available
│   └── utils.ts             # getPetStage, getProgressPercent, getNextStagePoints
├── docs/                    # 기획 문서 (epic, requirements, prd/)
└── plan/                    # 구현 계획
```

---

## 트리니티 펫 성장 시스템

| 단계 | 이모지 | 이름 | 포인트 조건 |
|---|---|---|---|
| Stage 1 | 🥚 | 알 (Egg) | 0 ~ 9P |
| Stage 2 | 🐣 | 아기 트리니티 | 10 ~ 14P |
| Stage 3 | ✨ | 메가 트리니티 | 15P 이상 |

`petStage`는 파생값입니다. `completeQuest()` 호출 시 `getPetStage(newPoints)`로 자동 계산되며 별도 저장하지 않습니다.

---

## 퀘스트 목록 (총 28개, 전체 available)

탭 순서는 실제 온보딩 여정 순서를 따릅니다.

### 1. 입사 전 준비 `pre-boarding` — 5개 (11P)

| 퀘스트 | 포인트 |
|---|---|
| 입사 서류 제출 | 3P |
| 보안 서약서 작성 | 2P |
| 사내 계정 생성 | 3P |
| 프로필 사진 등록 | 1P |
| 자기소개서 작성 | 2P |

### 2. 첫 출근 `day-one` — 6개 (12P)

| 퀘스트 | 포인트 |
|---|---|
| 사원증 수령 | 2P |
| 장비 세팅 | 3P |
| Wi-Fi / VPN 연결 | 2P |
| 팀원 인사 | 2P |
| 사무실 투어 | 2P |
| 멘토/버디 확인 | 1P |

### 3. 필수 교육 `mandatory-training` — 6개 (14P)

| 퀘스트 | 포인트 |
|---|---|
| 정보보안 교육 | 3P |
| 성희롱 예방 교육 | 2P |
| 직장 내 괴롭힘 예방 교육 | 2P |
| 안전보건 교육 | 2P |
| 개인정보 보호 교육 | 2P |
| 사내 시스템 교육 | 3P |

### 4. 조직 이해 `company-culture` — 2개 (5P)

| 퀘스트 | 포인트 |
|---|---|
| 회사 비전/미션 퀴즈 | 3P |
| 조직도 파악 | 2P |

### 5. HR 초보자 `hr-beginner` — 3개 (8P)

| 퀘스트 | 포인트 |
|---|---|
| 인사제도 확인 | 3P |
| 오피스 투어 | 3P |
| 프로필 설정 | 2P |

### 6. 직군별 전직 `role-specific` — 3개 (13P)

| 퀘스트 | 포인트 |
|---|---|
| 슬랙/지라 권한 신청 | 5P |
| MSP 기초 교육 | 5P |
| CTU 소개 | 3P |

### 7. 일일/월간 `daily-monthly` — 3개 (9P)

| 퀘스트 | 포인트 |
|---|---|
| 회의실 QR 체크인 🎯 | 5P |
| 업무 메일 확인 | 2P |
| 전자결재 확인 | 2P |

> 전체 완료 시 최대 **72P** 획득 → Stage 3 달성 가능

---

## UX 개선 이력

| 항목 | 내용 |
|---|---|
| 탭 순서 | 온보딩 여정 순서로 재정렬 (입사 전 준비 → 첫 출근 → ...) |
| 기본 탭 | 미완료 퀘스트 있는 첫 카테고리로 자동 포커스 |
| 전체 진행률 | 퀘스트 목록 상단에 `N/28 완료` 배너 표시 |
| 완료 모달 | "다음 퀘스트 하기" + "홈으로" 2버튼 제공 |
| 일일 퀘스트 홈 버튼 | 전체 완료 시 "오늘의 미션 완료! 🎉" 상태로 변경 |
| locked 카드 | opacity-50 + 클릭 비활성화 |
| unlock 힌트 | 잠긴 퀘스트에 해제 조건 텍스트 표시 |
| 완료 퀘스트 상세 | 획득 포인트 요약 표시 |
| 탭 스크롤 인디케이터 | 우측 fade gradient로 스크롤 가능 암시 |
| 미션 로딩 시간 | 2초 → 1초로 단축 |
| 헤더 통일 | QR/일반 미션 모두 흰색 헤더 |
| 펫 이미지 | 404 제거 — 이모지(🥚🐣✨)만 사용 |

---

## 주요 개발 메모

**Zustand persist `version: 4`**  
`mockData.ts`를 변경할 때마다 버전을 +1 올리면 사용자 localStorage가 자동 초기화됩니다.

**`useSearchParams` Suspense 필수**  
Next.js 14 App Router에서 `useSearchParams`는 반드시 `<Suspense>` 내부에서 사용해야 합니다. (`app/quests/page.tsx` 참고)

**QR / 달성확인 분기**  
`id === 'meeting-room-qr'`인 퀘스트만 `QRScannerUI`(스캔 2초), 나머지는 `MissionConfirmUI`(로딩 1초 → 확인 1초)를 사용합니다.

**`'use client'` 필수 컴포넌트**  
`useRouter`, `useGameStore`, `useState` 등 클라이언트 훅을 사용하는 모든 컴포넌트에 반드시 선언해야 합니다.

---

## 기획 문서

| 문서 | 경로 |
|---|---|
| Epic PRD | [`docs/epic.md`](docs/epic.md) |
| 요구사항 | [`docs/requirements.md`](docs/requirements.md) |
| 로그인 PRD | [`docs/prd/login-flow.md`](docs/prd/login-flow.md) |
| 온보딩 PRD | [`docs/prd/onboarding-flow.md`](docs/prd/onboarding-flow.md) |
| 퀘스트 미션 UX PRD | [`docs/prd/quest-mission-ux.md`](docs/prd/quest-mission-ux.md) |
| MVP 구현 계획 | [`plan/implementation-plan.md`](plan/implementation-plan.md) |
| 신규 미션 추가 계획 | [`plan/feature-quest-missions-1.md`](plan/feature-quest-missions-1.md) |
