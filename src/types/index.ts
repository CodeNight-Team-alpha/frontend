export interface LoginResponse {
  userId: string
  displayName: string
}

export interface MetricsDto {
  spendToday: number | null
  uniqueCategoriesToday: number | null
  electronicsSpendToday: number | null
  spend7d: number | null
}

export interface ChallengeDto {
  awardId: string | null
  challengeId: string | null
  rewardPoints: number | null
  triggeredChallengeIds?: string[]
  suppressedChallengeIds?: string[]
}

export interface BadgeDto {
  badgeId: string
  badgeName: string
  threshold: number
}

export interface NotificationDto {
  id: number
  sourceRef: string
  message: string
  createdAt: string
}

export interface UserSnapshotResponse {
  userId: string
  asOfDate: string
  metrics: MetricsDto | null
  challenge: ChallengeDto | null
  points: { totalPoints: number }
  badges: BadgeDto[]
  notifications: NotificationDto[]
}

export interface LeaderboardEntryDto {
  rank: number
  userId: string
  displayName: string
  totalPoints: number
  badges: BadgeDto[]
}

export interface LeaderboardResponse {
  asOfDate: string
  top: LeaderboardEntryDto[]
}

export interface ChallengeAwardDto {
  awardId: string
  asOfDate: string
  triggeredChallengeIds: string[]
  selectedChallengeId: string
  suppressedChallengeIds: string[]
  rewardPoints: number
}
