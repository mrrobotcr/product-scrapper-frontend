import type { MultiStoreSearchResult, SearchOptions } from '~/types'

export const useProductSearch = () => {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const results = ref<MultiStoreSearchResult | null>(null)

  const search = async (options: SearchOptions) => {
    loading.value = true
    error.value = null
    results.value = null

    try {
      const response = await $fetch<{ success: boolean } & MultiStoreSearchResult>(
        `${config.public.apiBase}/api/search`,
        {
          method: 'POST',
          body: {
            search: options.search,
            type: options.type || 'open_search',
            topN: options.topN,
            filter: options.filter,
            maxPages: options.maxPages
          }
        }
      )

      if (response.success) {
        results.value = response
      } else {
        error.value = 'Error en la búsqueda'
      }
    } catch (err: any) {
      error.value = err.message || 'Error al conectar con el servidor'
      console.error('Error en búsqueda:', err)
    } finally {
      loading.value = false
    }
  }

  const clearResults = () => {
    results.value = null
    error.value = null
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    results: readonly(results),
    search,
    clearResults
  }
}
