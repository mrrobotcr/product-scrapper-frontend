<template>
  <div class="min-h-screen">
    <!-- Hero Header with Gradient -->
    <header class="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-white border-b border-gray-200">
      <!-- Decorative Blob -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-8">
          <!-- Logo & Tagline -->
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl lg:text-3xl font-bold text-gradient">
                Product Scrapper
              </h1>
              <p class="text-sm text-gray-600 flex items-center gap-1.5 mt-0.5">
                <span class="inline-flex items-center">
                  <svg class="w-3.5 h-3.5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Costa Rica
                </span>
                <span class="text-gray-400">•</span>
                <span>Comparación en tiempo real</span>
              </p>
            </div>
          </div>
          
          <!-- Settings Button -->
          <button
            @click="showSettings = true"
            class="btn btn-ghost btn-md group"
            aria-label="Abrir configuración"
          >
            <svg class="w-5 h-5 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="hidden sm:inline">Configuración</span>
          </button>
        </div>
        
        <!-- Value Proposition -->
        <div class="max-w-3xl mx-auto text-center mb-8">
          <h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Compara precios al instante
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Busca productos en <span class="font-semibold text-blue-600">múltiples tiendas</span> simultáneamente.
            Encuentra el mejor precio con <span class="font-semibold text-blue-600">IA inteligente</span>.
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Search Section with Context -->
      <div class="mb-12 -mt-16 relative z-10">
        <SearchBar
          @search="handleSearch"
          :loading="loading"
        />
      </div>

      <!-- Loading State with Progress Context -->
      <Transition name="fade" mode="out-in">
        <div v-if="loading" class="animate-in">
          <div class="card p-12 text-center">
            <div class="inline-flex flex-col items-center gap-6">
              <!-- Animated Loader -->
              <div class="relative">
                <div class="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div class="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <div class="space-y-2">
                <p class="text-xl font-semibold text-gray-900">
                  Buscando en múltiples tiendas
                </p>
                <p class="text-sm text-gray-600 max-w-md">
                  Estamos scrapeando productos y filtrando con IA.
                  <span class="inline-flex items-center gap-1 text-blue-600 font-medium">
                    Esto toma ~10-15 segundos
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                </p>
                
                <!-- Loading Steps -->
                <div class="mt-6 flex items-center justify-center gap-2">
                  <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span>Scraping</span>
                  </div>
                  <svg class="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                    <span>Filtrando IA</span>
                  </div>
                  <svg class="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <div class="w-2 h-2 bg-blue-200 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                    <span>Ordenando</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Error State with Action -->
      <Transition name="fade">
        <div v-if="error" class="mb-8 animate-in">
          <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-start gap-4 flex-1">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-red-900 text-lg">Error en la búsqueda</h3>
                  <p class="text-sm text-red-700 mt-1 leading-relaxed">{{ error }}</p>
                  <button 
                    @click="error = null; results = null" 
                    class="mt-3 text-sm font-medium text-red-600 hover:text-red-700 inline-flex items-center gap-1 group"
                  >
                    <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Intentar otra búsqueda
                  </button>
                </div>
              </div>
              <button 
                @click="error = null" 
                class="text-red-400 hover:text-red-600 transition-colors p-1"
                aria-label="Cerrar error"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Results -->
      <SearchResults
        v-if="results && !loading"
        :results="results"
      />

      <!-- Empty State with Onboarding -->
      <Transition name="fade" mode="out-in">
        <div v-if="!results && !loading && !error" class="animate-in">
          <div class="text-center py-16 lg:py-24">
            <!-- Illustration -->
            <div class="mb-8 relative inline-block">
              <div class="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
              <svg class="relative w-24 h-24 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              ¿Qué producto estás buscando?
            </h3>
            <p class="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
              Ingresa el nombre de cualquier producto y compara precios en tiempo real entre
              <span class="font-semibold text-blue-600">múltiples tiendas de Costa Rica</span>
            </p>
            
            <!-- Features Grid -->
            <div class="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div class="card p-6 text-center hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Súper rápido</h4>
                <p class="text-sm text-gray-600">Resultados en 10-15 segundos</p>
              </div>
              
              <div class="card p-6 text-center hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Filtrado con IA</h4>
                <p class="text-sm text-gray-600">GPT-4 encuentra lo mejor</p>
              </div>
              
              <div class="card p-6 text-center hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 class="font-semibold text-gray-900 mb-1">Mejor precio</h4>
                <p class="text-sm text-gray-600">Destacamos las ofertas</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </main>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showSettings = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold">Configuración de Búsqueda</h3>
          <button @click="showSettings = false" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div class="p-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Máximo de páginas por tienda
            </label>
            <input
              v-model.number="searchSettings.maxPages"
              type="number"
              min="1"
              max="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="mt-1 text-sm text-gray-500">Limita cuántas páginas scrapear</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Top N productos por tienda
            </label>
            <input
              v-model.number="searchSettings.topN"
              type="number"
              min="5"
              max="50"
              placeholder="Dejar vacío para no filtrar"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="mt-1 text-sm text-gray-500">Usa IA para filtrar los más relevantes</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Filtro personalizado
            </label>
            <textarea
              v-model="searchSettings.filter"
              placeholder="Ej: solo productos de menos de 50000 colones"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="mt-1 text-sm text-gray-500">Filtro en lenguaje natural (opcional)</p>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button @click="showSettings = false" class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            Cancelar
          </button>
          <button @click="saveSettings" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchOptions } from '~/types'

const { search, loading, error, results } = useProductSearch()

const showSettings = ref(false)
const searchSettings = ref({
  maxPages: 1,
  topN: 15,  // Máximo 15 productos por tienda
  filter: ''
})

// Load settings from localStorage
onMounted(() => {
  const saved = localStorage.getItem('searchSettings')
  if (saved) {
    searchSettings.value = JSON.parse(saved)
  }
})

const saveSettings = () => {
  localStorage.setItem('searchSettings', JSON.stringify(searchSettings.value))
  showSettings.value = false
  alert('✅ Configuración guardada. Los cambios se aplicarán en la próxima búsqueda.')
}

const handleSearch = (query: string) => {
  const options: SearchOptions = {
    search: query,
    type: 'open_search',
    maxPages: searchSettings.value.maxPages || undefined,
    topN: searchSettings.value.topN || undefined,
    filter: searchSettings.value.filter || undefined
  }
  
  search(options)
}

// SEO
useHead({
  title: 'Product Scrapper - Compara precios',
  meta: [
    {
      name: 'description',
      content: 'Busca y compara productos de múltiples tiendas en Costa Rica'
    }
  ]
})
</script>
