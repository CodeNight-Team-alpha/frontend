import axios from 'axios'

// Dev'de Vite proxy kullanıyoruz (CORS olmadan); production'da env'deki URL
const baseURL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080')

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Kullanıcı bulunamadı'))
    }
    if (error.response?.status === 400) {
      return Promise.reject(new Error(error.response?.data?.message ?? 'Geçersiz istek'))
    }
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject(new Error('Sunucuya bağlanılamadı. Backend\'in çalıştığından emin olun.'))
    }
    return Promise.reject(error)
  }
)
