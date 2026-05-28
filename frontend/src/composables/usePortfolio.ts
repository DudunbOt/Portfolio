import { ref, computed, readonly } from 'vue'
import { fetchPortfolio, transformPortfolio } from '@/api/portfolio'
import type { Portfolio } from '@/types'

// Singleton state - shared across all components
const portfolio = ref<Portfolio | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)
const lastFetchedAt = ref<number | null>(null)

// Cache duration: 5 minutes (matches backend cache)
const CACHE_DURATION_MS = 5 * 60 * 1000

export function usePortfolio() {
  const hasData = computed(() => portfolio.value !== null)

  const isCacheValid = computed(() => {
    if (!lastFetchedAt.value) return false
    return Date.now() - lastFetchedAt.value < CACHE_DURATION_MS
  })

  async function loadPortfolio(forceRefresh = false): Promise<void> {
    // Return cached data if valid and not forcing refresh
    if (isCacheValid.value && !forceRefresh) {
      return
    }

    // Prevent concurrent fetches
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const dto = await fetchPortfolio()
      portfolio.value = transformPortfolio(dto)
      lastFetchedAt.value = Date.now()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to load portfolio')
      console.error('Portfolio fetch error:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Convenience accessors
  const profile = computed(() => portfolio.value?.profile ?? null)
  const projects = computed(() => portfolio.value?.projects ?? [])
  const experience = computed(() => portfolio.value?.experience ?? [])
  const education = computed(() => portfolio.value?.education ?? [])
  const skillCategories = computed(() => portfolio.value?.skillCategories ?? [])

  return {
    // State
    portfolio: readonly(portfolio),
    isLoading: readonly(isLoading),
    error: readonly(error),
    hasData,

    // Actions
    loadPortfolio,

    // Convenience accessors
    profile,
    projects,
    experience,
    education,
    skillCategories,
  }
}
