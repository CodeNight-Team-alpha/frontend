import { apiClient } from './client'
import type { LoginResponse } from '@/types'

export async function login(displayName: string): Promise<LoginResponse> {
  const trimmed = displayName?.trim()
  if (!trimmed) {
    throw new Error('Lütfen bir isim girin.')
  }
  const { data } = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
    displayName: trimmed,
  })
  return data
}
