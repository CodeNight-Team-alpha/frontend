import { apiClient } from './client'
import type { LeaderboardResponse } from '@/types'

export async function getLeaderboard(
  asOfDate?: string
): Promise<LeaderboardResponse> {
  const params = asOfDate ? { asOfDate } : {}
  const { data } = await apiClient.get<LeaderboardResponse>(
    '/api/v1/leaderboard',
    { params }
  )
  return data
}
