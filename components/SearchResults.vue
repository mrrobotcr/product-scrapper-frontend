<template>
  <div class="space-y-8 animate-in">
    <!-- Summary Header with Premium Design - Mejorado -->
    <div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-2xl p-6 lg:p-8 text-white overflow-hidden">
      <!-- Animated Decorative Pattern -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full translate-y-24 -translate-x-24 animate-pulse" style="animation-delay: 0.5s"></div>
        <div class="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style="animation-delay: 1s"></div>
      </div>
      
      <div class="relative z-10">
        <!-- Header Section -->
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-blue-100">Búsqueda completada</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight">
              Resultados para "<span class="text-blue-100">{{ results.search }}</span>"
            </h2>
            <p class="text-blue-100 text-sm flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              Comparando precios en Costa Rica
            </p>
          </div>

          <button
            @click="exportResults"
            class="btn btn-md bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span class="font-semibold">Exportar</span>
          </button>
        </div>

        <!-- Stats Grid - Mejorado con animaciones -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div class="glass rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold">{{ results.successfulStores }}/{{ results.totalStores }}</p>
                <p class="text-blue-100 text-xs font-medium">Tiendas</p>
              </div>
            </div>
          </div>

          <div class="glass rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold">{{ results.totalProducts }}</p>
                <p class="text-blue-100 text-xs font-medium">Productos</p>
              </div>
            </div>
          </div>

          <div class="glass rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-bold">{{ (results.duration / 1000).toFixed(1) }}s</p>
                <p class="text-blue-100 text-xs font-medium">Tiempo</p>
              </div>
            </div>
          </div>

          <div v-if="results.filtered" class="glass rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div>
                <p class="text-lg font-bold">Con IA</p>
                <p class="text-blue-100 text-xs font-medium">Filtrado inteligente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Unified Product List -->
    <UnifiedProductList :results="results" />

    <!-- Empty Results - Mejorado -->
    <Transition name="fade">
      <div v-if="results.totalProducts === 0" class="card p-16 text-center animate-in">
        <div class="inline-block relative mb-6">
          <div class="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full"></div>
          <svg class="relative w-32 h-32 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-3">
          No se encontraron productos
        </h3>
        <p class="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          No pudimos encontrar productos que coincidan con "<span class="font-semibold text-gray-900">{{ results.search }}</span>".
          Intenta con términos diferentes o más generales.
        </p>
        
        <!-- Sugerencias -->
        <div class="max-w-lg mx-auto">
          <p class="text-sm font-semibold text-gray-700 mb-3">Sugerencias:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">Usa términos más generales</p>
                <p class="text-xs text-gray-600 mt-0.5">Ej: "taladro" en vez de "taladro dewalt 3/8"</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">Revisa la ortografía</p>
                <p class="text-xs text-gray-600 mt-0.5">Verifica que no haya errores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { MultiStoreSearchResult } from '~/types'

const props = defineProps<{
  results: MultiStoreSearchResult
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
