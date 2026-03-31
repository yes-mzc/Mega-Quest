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
]
// available 퀘스트 총합: 9+8+13 = 30P → 전체 퀘스트 잠금 해제 ✓
