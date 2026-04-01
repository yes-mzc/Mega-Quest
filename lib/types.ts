export type QuestStatus = 'locked' | 'available' | 'completed'
export type QuestCategory =
  | 'hr-beginner'
  | 'role-specific'
  | 'daily-monthly'
  | 'pre-boarding'
  | 'day-one'
  | 'mandatory-training'
  | 'company-culture'

export interface User {
  id: string
  name: string
  type: string
  points: number
  petStage: 1 | 2 | 3
  title: string
}

export interface Quest {
  id: string
  category: QuestCategory
  title: string
  description: string
  rewardPoints: number
  status: QuestStatus
}

export interface PetStageConfig {
  stage: 1 | 2 | 3
  minPoints: number
  maxPoints: number | null
  label: string
  emoji: string
}
