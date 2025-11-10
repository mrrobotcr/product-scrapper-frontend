<template>
  <div
    class="relative p-3 rounded-lg border transition-all duration-300"
    :class="{
      'border-gray-200 bg-gray-50': store.status === 'pending',
      'border-blue-300 bg-blue-50 shadow-sm': store.status === 'loading' || store.status === 'filtering',
      'border-green-300 bg-green-50 shadow-sm': store.status === 'completed',
      'border-purple-300 bg-purple-50 shadow-sm': store.status === 'sorting'
    }"
  >
    <!-- Store Icon and Status -->
    <div class="flex flex-col items-center gap-2">
      <div class="relative">
        <!-- Store Logo/Icon -->
        <div class="flex items-center justify-center w-12 h-12">
          <!-- Logo Image -->
          <NuxtImg
            v-if="store.logoType === 'image'"
            :src="store.logo"
            :alt="`${store.name} logo`"
            width="48"
            height="48"
            class="rounded-lg object-contain transition-opacity duration-300"
            @error="handleImageError"
          />

          <!-- Emoji Fallback -->
          <span v-else class="text-2xl">{{ store.logo }}</span>

          <!-- Hidden emoji fallback for image errors -->
          <span
            v-if="store.logoType === 'image'"
            class="text-2xl hidden"
            :class="{ 'inline-block': imageError }"
          >🏪</span>
        </div>

        <!-- Status Indicator -->
        <div class="absolute -top-1 -right-1">
          <div v-if="store.status === 'completed'" class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div v-else-if="store.status === 'loading' || store.status === 'filtering' || store.status === 'sorting'"
               class="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
          <div v-else class="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <!-- Store Name -->
      <div class="text-xs font-medium text-gray-700">{{ store.name }}</div>

      <!-- Product Counter -->
      <div v-if="store.status === 'completed'" class="text-center">
        <div class="text-lg font-bold text-green-600 animate-fade-in">
          {{ store.products }}
        </div>
        <div class="text-xs text-gray-500">productos</div>
      </div>

      <!-- Loading Text -->
      <div v-else-if="store.status === 'loading'" class="text-xs text-blue-600 animate-pulse">
        Buscando...
      </div>
      <div v-else-if="store.status === 'filtering'" class="text-xs text-purple-600 animate-pulse">
        Filtrando...
      </div>
      <div v-else-if="store.status === 'sorting'" class="text-xs text-purple-600 animate-pulse">
        Ordenando...
      </div>
      <div v-else class="text-xs text-gray-400">
        Esperando
      </div>
    </div>

    <!-- Progress Bar for Active States -->
    <div v-if="store.status === 'loading' || store.status === 'filtering' || store.status === 'sorting'"
         class="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-progress"
        :class="{
          'animate-progress': store.status === 'loading',
          'animate-progress-filter': store.status === 'filtering',
          'animate-progress-sort': store.status === 'sorting'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StoreStatus {
  name: string
  status: 'pending' | 'loading' | 'filtering' | 'sorting' | 'completed'
  products: number
  logo: string
  logoType?: 'emoji' | 'image'
}

const props = defineProps<{
  store: StoreStatus
}>()

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 90%; }
}

@keyframes progress-filter {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes progress-sort {
  0% { width: 0%; }
  100% { width: 100%; }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

.animate-progress-filter {
  animation: progress-filter 1.5s ease-out forwards;
}

.animate-progress-sort {
  animation: progress-sort 1.5s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>