import { ofetch, type FetchOptions } from 'ofetch'

const defaultOptions: FetchOptions = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: 1,
  retryDelay: 500,
}

export const apiClient = ofetch.create(defaultOptions)

// For authenticated endpoints (future use)
export function createAuthenticatedClient(token: string) {
  return ofetch.create({
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}
