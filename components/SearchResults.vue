<template>
  <div class="space-y-4 animate-in">

    <!-- Compact Results Header -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center justify-between gap-4">
        <!-- Left: Title & Stats -->
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-gray-900 truncate">
            {{ results.totalProducts }} productos encontrados
          </h2>
          <p class="text-xs text-gray-600 mt-1">
            {{ results.successfulStores }}/{{ results.totalStores }} tiendas • {{ (results.duration / 1000).toFixed(1) }}s
            <span v-if="results.filtered" class="ml-2 inline-flex items-center gap-1 text-blue-600">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" clip-rule="evenodd"/>
              </svg>
              Filtrado con IA
            </span>
          </p>
        </div>

        <!-- Right: Export Button -->
        <button
          @click="exportResults"
          class="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <span>Exportar</span>
        </button>
      </div>
    </div>

    <!-- Unified Product List -->
    <UnifiedProductList 
      :results="results"
      :phase="phase"
      :is-processing="isProcessing"
      :progress-percent="progressPercent"
    />

    <!-- Empty Results -->
    <Transition name="fade">
      <div v-if="results.totalProducts === 0" class="card p-8 text-center animate-in">
        <svg class="w-16 h-16 text-orange-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          No se encontraron productos
        </h3>
        <p class="text-sm text-gray-600 max-w-md mx-auto">
          Intenta con términos más generales o revisa la ortografía
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { MultiStoreSearchResult } from '~/types'
import type { SearchPhase } from '~/composables/useProductSearch'

const props = defineProps<{
  results: MultiStoreSearchResult
  phase?: SearchPhase
  isProcessing?: boolean
  progressPercent?: number
}>()

const showToast = ref(false)
const toastMessage = ref('')

const exportResults = () => {
  // Preparar datos para exportar
  const data = {
    search: props.results.search,
    date: new Date().toISOString(),
    totalProducts: props.results.totalProducts,
    stores: props.results.stores.map(store => ({
      store: store.store,
      count: store.count,
      products: store.products.map(p => ({
        name: p.product_name,
        price: p.price,
        currency: p.currency,
        url: p.url,
        image: p.image
      }))
    }))
  }

  // Crear archivo JSON
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `productos-${props.results.search}-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  // Toast notification
  toastMessage.value = `✅ ${props.results.totalProducts} productos exportados correctamente`
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
/* Toast notification */
</style>
