<template>
  <div class="w-full">
    <!-- Main Search Card with Enhanced Design -->
    <div class="glass shadow-xl rounded-2xl p-6 border border-white/60">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Search Input Group -->
        <div class="relative group">
          <!-- Icon -->
          <div class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
            <svg 
              class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <!-- Input -->
          <input
            ref="searchInput"
            v-model="query"
            type="text"
            placeholder="Busca cualquier producto... Ej: taladro dewalt, sierra circular"
            :disabled="loading"
            class="input pl-12 pr-12 py-4 text-base bg-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            :class="query ? 'ring-2 ring-blue-500' : ''"
            @focus="showSuggestions = true"
          />
          
          <!-- Clear Button -->
          <Transition name="fade">
            <button
              v-if="query && !loading"
              type="button"
              @click="query = ''; searchInput?.focus()"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              aria-label="Limpiar búsqueda"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </Transition>
        </div>

        <!-- Search Button -->
        <button
          type="submit"
          :disabled="!query || loading"
          class="btn btn-primary btn-lg w-full shadow-lg hover:shadow-xl disabled:shadow-none group"
        >
          <Transition name="fade" mode="out-in">
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span class="font-semibold">Buscar productos</span>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <div class="spinner"></div>
              <span>Buscando...</span>
            </span>
          </Transition>
        </button>
      </form>

      <!-- Quick Search Suggestions with Animation -->
      <Transition name="slide-up">
        <div v-if="showSuggestions && !loading && !query" class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium text-gray-600">Búsquedas populares</span>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(suggestion, index) in quickSearches"
              :key="suggestion"
              @click="query = suggestion; handleSubmit()"
              class="group px-4 py-2 text-sm bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-sm font-medium"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <span class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
                {{ suggestion }}
              </span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  search: [query: string]
}>()

const props = defineProps<{
  loading?: boolean
}>()

const query = ref('')
const showSuggestions = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const quickSearches = [
  'taladro dewalt',
  'sierra circular',
  'rotomartillo',
  'pulidora',
  'lijadora orbital'
]

const handleSubmit = () => {
  if (query.value.trim()) {
    showSuggestions.value = false
    emit('search', query.value.trim())
  }
}

// Auto-focus on mount
onMounted(() => {
  searchInput.value?.focus()
})

// Hide suggestions when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.glass')) {
      showSuggestions.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
