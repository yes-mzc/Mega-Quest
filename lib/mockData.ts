import type { User, Quest, PetStageConfig } from '@/lib/types'

export const petStageConfig: PetStageConfig[] = [
  { stage: 1, minPoints: 0,  maxPoints: 9,    label: '알 (Egg)',        emoji: '🥚' },
  { stage: 2, minPoints: 10, maxPoints: 14,   label: '아기 트리니티',    emoji: '🐣' },
  { stage: 3, minPoints: 15, maxPoints: null, label: '메가 트리니티',    emoji: '✨' },
]

export const initialUser: User = {
  id: 'user-1',
  name: '김신입',
  type: '공채',
  points: 0,
  petStage: 1,
  title: '',
}

export const initialQuests: Quest[] = [
  // daily-monthly (available) — 5+2+2 = 9P
  {
    id: 'meeting-room-qr',
    category: 'daily-monthly',
    title: '회의실 QR 체크인',
    description: '회의실 QR 코드를 스캔하여 매너 사용을 확인하세요.',
    rewardPoints: 5,
    status: 'available',
  },
  {
    id: 'email-check',
    category: 'daily-monthly',
    title: '업무 메일 확인',
    description: '오늘의 업무 메일을 확인하고 회신이 필요한 메일에 답장하세요.',
    rewardPoints: 2,
    status: 'available',
  },
  {
    id: 'e-approval',
    category: 'daily-monthly',
    title: '전자결재 확인',
    description: '전자결재 시스템에서 대기 중인 결재 항목을 확인하세요.',
    rewardPoints: 2,
    status: 'available',
  },
  // hr-beginner (available) — 3+3+2 = 8P
  {
    id: 'hr-policy',
    category: 'hr-beginner',
    title: '인사제도 확인',
    description: '사내 인사제도 및 복리후생 내용을 확인하세요.',
    rewardPoints: 3,
    status: 'available',
  },
  {
    id: 'office-tour',
    category: 'hr-beginner',
    title: '오피스 투어',
    description: '사무실 주요 시설(회의실, 휴게실, 편의시설)을 둘러보세요.',
    rewardPoints: 3,
    status: 'available',
  },
  {
    id: 'profile-setup',
    category: 'hr-beginner',
    title: '프로필 설정',
    description: '사내 시스템에 프로필 사진과 기본 정보를 등록하세요.',
    rewardPoints: 2,
    status: 'available',
  },
  // role-specific (locked) — 5+5+3 = 13P
  {
    id: 'slack-jira',
    category: 'role-specific',
    title: '슬랙/지라 권한 신청',
    description: '업무에 필요한 슬랙 채널 접근 및 지라 프로젝트 권한을 신청하세요.',
    rewardPoints: 5,
    status: 'available',
  },
  {
    id: 'msp-training',
    category: 'role-specific',
    title: 'MSP 기초 교육',
    description: 'MSP(Managed Service Provider) 기초 교육 과정을 이수하세요.',
    rewardPoints: 5,
    status: 'available',
  },
  {
    id: 'ctu-intro',
    category: 'role-specific',
    title: 'CTU 소개',
    description: 'CTU(Cloud Technology Unit) 조직 소개 자료를 확인하세요.',
    rewardPoints: 3,
    status: 'available',
  },

  // ── Stage 1: Pre-boarding (available) ── 합계 11P ──────────────────────────
  {
    id: 'pre-boarding-docs',
    category: 'pre-boarding',
    title: '입사 서류 제출',
    description: '주민등록등본, 졸업증명서, 통장사본 등 필수 입사 서류를 HR 포탈에 제출하세요.',
    rewardPoints: 3,
    status: 'available',
  },
  {
    id: 'pre-boarding-security-agreement',
    category: 'pre-boarding',
    title: '보안 서약서 작성',
    description: '보안 서약서 및 개인정보 수집·이용 동의서를 작성하고 제출하세요.',
    rewardPoints: 2,
    status: 'available',
  },
  {
    id: 'pre-boarding-account-setup',
    category: 'pre-boarding',
    title: '사내 계정 생성',
    description: '업무용 이메일, 메신저, 사내 포탈 계정을 생성하고 초기 비밀번호를 변경하세요.',
    rewardPoints: 3,
    status: 'available',
  },
  {
    id: 'pre-boarding-profile-photo',
    category: 'pre-boarding',
    title: '프로필 사진 등록',
    description: '사내 시스템에 프로필 사진을 등록하세요.',
    rewardPoints: 1,
    status: 'available',
  },
  {
    id: 'pre-boarding-self-intro',
    category: 'pre-boarding',
    title: '자기소개서 작성',
    description: '사내 게시판에 게시될 자기소개를 작성하고 등록하세요.',
    rewardPoints: 2,
    status: 'available',
  },

  // ── Stage 2: Day 1 (locked) ── 합계 12P ────────────────────────────────────
  {
    id: 'day-one-id-card',
    category: 'day-one',
    title: '사원증 수령',
    description: '총무팀에서 사원증 및 출입카드를 수령하고 등록하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'day-one-workstation',
    category: 'day-one',
    title: '장비 세팅',
    description: '배정된 자리에서 노트북, 모니터 등 장비를 수령하고 초기 세팅을 완료하세요.',
    rewardPoints: 3,
    status: 'locked',
  },
  {
    id: 'day-one-wifi-vpn',
    category: 'day-one',
    title: 'Wi-Fi / VPN 연결',
    description: '사내 Wi-Fi에 접속하고 VPN을 설치하여 정상 연결을 확인하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'day-one-team-intro',
    category: 'day-one',
    title: '팀원 인사',
    description: '소속 팀원 전원에게 인사하고 자기소개를 완료하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'day-one-office-tour',
    category: 'day-one',
    title: '사무실 투어',
    description: '회의실, 휴게실, 식당, 비상구 위치를 파악하고 투어를 완료하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'day-one-buddy',
    category: 'day-one',
    title: '멘토/버디 확인',
    description: '배정된 멘토 또는 버디를 확인하고 첫 미팅을 진행하세요.',
    rewardPoints: 1,
    status: 'locked',
  },

  // ── Stage 3: Mandatory Training (locked) ── 합계 14P ───────────────────────
  {
    id: 'training-security',
    category: 'mandatory-training',
    title: '정보보안 교육',
    description: '정보보안 온라인 교육을 이수하고 수료증을 제출하세요.',
    rewardPoints: 3,
    status: 'locked',
  },
  {
    id: 'training-sexual-harassment',
    category: 'mandatory-training',
    title: '성희롱 예방 교육',
    description: '성희롱 예방 교육을 이수하고 수료증을 제출하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'training-workplace-bullying',
    category: 'mandatory-training',
    title: '직장 내 괴롭힘 예방 교육',
    description: '직장 내 괴롭힘 예방 교육을 이수하고 수료증을 제출하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'training-safety-health',
    category: 'mandatory-training',
    title: '안전보건 교육',
    description: '산업안전보건 교육을 이수하고 수료증을 제출하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'training-privacy',
    category: 'mandatory-training',
    title: '개인정보 보호 교육',
    description: '개인정보 보호 온라인 교육을 이수하고 수료증을 제출하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
  {
    id: 'training-systems',
    category: 'mandatory-training',
    title: '사내 시스템 교육',
    description: '그룹웨어, 근태관리, 경비처리 시스템 사용법 교육을 이수하세요.',
    rewardPoints: 3,
    status: 'locked',
  },

  // ── Stage 4: Know Your Company (locked) ── 합계 5P (추가 예정) ─────────────
  {
    id: 'culture-vision-quiz',
    category: 'company-culture',
    title: '회사 비전/미션 퀴즈',
    description: '회사 비전, 미션, 핵심 가치를 학습하고 퀴즈를 완료하세요.',
    rewardPoints: 3,
    status: 'locked',
  },
  {
    id: 'culture-org-chart',
    category: 'company-culture',
    title: '조직도 파악',
    description: '사내 포탈에서 전체 조직도를 확인하고 주요 부서 역할을 파악하세요.',
    rewardPoints: 2,
    status: 'locked',
  },
]
// 기존 available 합계: 30P
// Stage1 pre-boarding available: 11P
// Stage2 day-one locked: 12P | Stage3 mandatory-training locked: 14P | Stage4 company-culture locked: 5P
