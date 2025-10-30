<template>
  <div class="w-full">
    <!-- Minimal Search Bar -->
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <!-- Search Input -->
      <div class="relative flex-1 group">
        <svg 
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Busca un producto..."
          :disabled="loading"
          class="input input-sm pl-9 pr-9 w-full bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          :class="query ? 'ring-1 ring-blue-500' : ''"
          @focus="showSuggestions = true"
        />
        
        <!-- Clear Button -->
        <Transition name="fade">
          <button
            v-if="query && !loading"
            type="button"
            @click="query = ''; searchInput?.focus()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </Transition>
      </div>

      <!-- Search Button -->
      <button
        type="submit"
        :disabled="!query || loading"
        class="btn btn-sm btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Transition name="fade" mode="out-in">
          <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </Transition>
      </button>
    </form>

    <!-- Quick Search Suggestions -->
    <Transition name="slide-up">
      <div v-if="showSuggestions && !loading && !query" class="mt-2 flex flex-wrap gap-1">
        <button
          v-for="suggestion in quickSearches"
          :key="suggestion"
          @click="query = suggestion; handleSubmit()"
          class="text-xs px-2 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded transition-colors"
        >
          {{ suggestion }}
        </button>
      </div>
    </Transition>
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
