import { apiClient } from './client'
import type {
  UserSnapshotResponse,
  NotificationDto,
  ChallengeAwardDto,
} from '@/types'

export async function getSnapshot(
  userId: string,
  asOfDate?: string
): Promise<UserSnapshotResponse> {
  const params = asOfDate ? { asOfDate } : {}
  const { data } = await apiClient.get<UserSnapshotResponse>(
    `/api/v1/users/${userId}/snapshot`,
    { params }
  )
  return data
}

export async function getNotifications(userId: string): Promise<NotificationDto[]> {
  const { data } = await apiClient.get<NotificationDto[]>(
    `/api/v1/users/${userId}/notifications`
  )
  return data
}

export async function getChallengeAwards(
  userId: string
): Promise<ChallengeAwardDto[]> {
  const { data } = await apiClient.get<ChallengeAwardDto[]>(
    `/api/v1/users/${userId}/challenge-awards`
  )
  return data
}
