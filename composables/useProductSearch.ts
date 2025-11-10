import type { MultiStoreSearchResult, SearchOptions } from '~/types'

export type SearchPhase = 'idle' | 'scraping' | 'filtering' | 'sorting' | 'complete'

export const useProductSearch = () => {
  const config = useRuntimeConfig()
  const phase = ref<SearchPhase>('idle')
  const error = ref<string | null>(null)
  const results = ref<MultiStoreSearchResult | null>(null)
  
  // Estado de progreso para cada fase
  const progress = ref({
    scraping: false,
    filtering: false,
    sorting: false
  })

  // Progreso simulado para animaciones (0-100%)
  const progressPercent = ref(0)
  const progressInterval = ref<ReturnType<typeof setInterval> | null>(null)

  // Función para iniciar animación de progreso
  const startProgressAnimation = (phaseName: string) => {
    // Resetear progreso base según la fase
    if (phaseName === 'scraping') {
      progressPercent.value = 10
    } else if (phaseName === 'filtering') {
      progressPercent.value = 60
    } else if (phaseName === 'sorting') {
      progressPercent.value = 80
    }

    progressInterval.value = setInterval(() => {
      const maxProgress = phaseName === 'scraping' ? 55 :
                         phaseName === 'filtering' ? 75 : 90

      if (progressPercent.value < maxProgress) {
        // Incremento más pequeño y controlado
        progressPercent.value += Math.random() * 5 + 1
      }
    }, 300)
  }

  // Función para completar progreso
  const completeProgress = () => {
    if (progressInterval.value) {
      clearInterval(progressInterval.value)
    }
    progressPercent.value = 100
  }

  const search = async (options: SearchOptions) => {
    phase.value = 'scraping'
    error.value = null
    results.value = null
    progressPercent.value = 0
    progress.value = {
      scraping: false,
      filtering: false,
      sorting: false
    }

    try {
      // FASE 1: Scraping
      console.log('🔍 FASE 1: Iniciando scraping...')
      startProgressAnimation('scraping')

      const scrapeResponse = await $fetch<{ success: boolean } & MultiStoreSearchResult>(
        `${config.public.apiBase}/api/search/scrape`,
        {
          method: 'POST',
          body: {
            search: options.search,
            maxPages: options.maxPages
          }
        }
      )

      if (!scrapeResponse.success) {
        throw new Error('Error en scraping')
      }

      // Actualizar resultados con productos scrapeados
      results.value = scrapeResponse
      progress.value.scraping = true
      progressPercent.value = 55
      console.log('✅ FASE 1 completada: Productos scrapeados mostrados')

      // FASE 2: Filtrado (si se requiere)
      if (options.topN || options.filter) {
        phase.value = 'filtering'
        startProgressAnimation('filtering')
        console.log('🤖 FASE 2: Iniciando filtrado...')

        const filterResponse = await $fetch<{ success: boolean } & MultiStoreSearchResult>(
          `${config.public.apiBase}/api/search/filter`,
          {
            method: 'POST',
            body: {
              search: options.search,
              stores: scrapeResponse.stores,
              topN: options.topN,
              filter: options.filter
            }
          }
        )

        if (!filterResponse.success) {
          throw new Error('Error en filtrado')
        }

        // Actualizar resultados con productos filtrados
        results.value = filterResponse
        progress.value.filtering = true
        progressPercent.value = 75
        console.log('✅ FASE 2 completada: Productos filtrados mostrados')
      } else {
        progress.value.filtering = true
        progressPercent.value = 75
      }

      // FASE 3: Ordenado
      phase.value = 'sorting'
      startProgressAnimation('sorting')
      console.log('🔄 FASE 3: Iniciando ordenado...')

      const sortResponse = await $fetch<{ success: boolean } & MultiStoreSearchResult>(
        `${config.public.apiBase}/api/search/sort`,
        {
          method: 'POST',
          body: {
            search: options.search,
            stores: results.value.stores
          }
        }
      )

      if (!sortResponse.success) {
        throw new Error('Error en ordenado')
      }

      // Actualizar resultados con productos ordenados
      results.value = sortResponse
      progress.value.sorting = true
      completeProgress()
      phase.value = 'complete'
      console.log('✅ FASE 3 completada: Productos ordenados mostrados')

    } catch (err: any) {
      error.value = err.message || 'Error al conectar con el servidor'
      console.error('Error en búsqueda:', err)
      phase.value = 'idle'
      completeProgress()
    }
  }

  const clearResults = () => {
    results.value = null
    error.value = null
    phase.value = 'idle'
    progress.value = {
      scraping: false,
      filtering: false,
      sorting: false
    }
  }

  return {
    phase: readonly(phase),
    progress: readonly(progress),
    progressPercent: readonly(progressPercent),
    error: readonly(error),
    results: readonly(results),
    search,
    clearResults
  }
}
