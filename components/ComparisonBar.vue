<template>
  <!-- Floating Comparison Bar with Smart Hide/Show -->
  <Transition name="slide-up">
    <div
      v-if="hasSelection"
      :class="[
        'fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 transition-all duration-300',
        isVisible ? 'bottom-6' : '-bottom-32'
      ]"
    >
      <div class="glass rounded-2xl shadow-2xl border border-white/60 p-4 backdrop-blur-xl">
        <div class="flex items-center justify-between gap-4">
          <!-- Left: Selected Products Preview -->
          <div class="flex items-center gap-4 flex-1">
            <!-- Counter Badge -->
            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <!-- Animated Counter -->
                <Transition name="scale" mode="out-in">
                  <div
                    :key="selectedCount"
                    class="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white"
                  >
                    {{ selectedCount }}
                  </div>
                </Transition>
              </div>
              
              <div>
                <p class="text-sm font-bold text-gray-900">
                  {{ selectedCount }} {{ selectedCount === 1 ? 'producto seleccionado' : 'productos seleccionados' }}
                </p>
                <p class="text-xs text-gray-600">
                  {{ canCompare ? 'Listo para comparar' : `Selecciona al menos ${2 - selectedCount} más` }}
                </p>
              </div>
            </div>

            <!-- Product Thumbnails -->
            <div class="hidden md:flex items-center gap-2 flex-1 overflow-x-auto">
              <TransitionGroup name="list-horizontal">
                <div
                  v-for="item in selectedProducts"
                  :key="item.product.url"
                  class="relative group flex-shrink-0"
                >
                  <div class="w-14 h-14 bg-white rounded-lg border-2 border-blue-500 overflow-hidden shadow-md">
                    <NuxtImg
                      v-if="item.product.image"
                      :src="item.product.image"
                      :alt="item.product.product_name"
                      class="w-full h-full object-contain p-1"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Remove Button -->
                  <button
                    @click="toggleProduct(item.product, item.storeName)"
                    class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover"
                  >
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </TransitionGroup>
              
              <!-- Add More Indicator -->
              <div
                v-if="canAddMore"
                class="w-14 h-14 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="flex items-center gap-2">
            <!-- Clear Button -->
            <button
              @click="clearSelection"
              class="btn btn-ghost btn-sm"
              title="Limpiar selección"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <span class="hidden sm:inline">Limpiar</span>
            </button>

            <!-- Compare Button -->
            <button
              @click="handleCompare"
              :disabled="!canCompare"
              class="btn btn-primary btn-lg shadow-xl hover:shadow-2xl group relative overflow-hidden"
            >
              <!-- Animated background -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span class="relative flex items-center gap-2">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span class="font-bold">Comparar ahora</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
            :style="{ width: `${(selectedCount / MAX_COMPARISON) * 100}%` }"
          ></div>
        </div>

        <!-- Help Text -->
        <p class="text-xs text-gray-500 text-center mt-2">
          <span v-if="selectedCount < MAX_COMPARISON">
            Puedes seleccionar hasta {{ MAX_COMPARISON }} productos
          </span>
          <span v-else class="text-orange-600 font-medium">
            Máximo de productos alcanzado
          </span>
        </p>
      </div>
    </div>
  </Transition>

  <!-- Comparison Modal -->
  <ComparisonModal
    :is-open="showModal"
    :products="selectedProducts.map(p => ({
      url: p.product.url,
      storeName: p.storeName,
      product_name: p.product.product_name,
      price: p.product.price,
      image: p.product.image  // Importante para infesa.com (enriquecimiento con Gemini)
    }))"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
const {
  selectedProducts,
  selectedCount,
  hasSelection,
  canCompare,
  canAddMore,
  toggleProduct,
  clearSelection,
  MAX_COMPARISON
} = useComparison()

// Smart hide/show on scroll
const isVisible = ref(true)
const lastScrollY = ref(0)
const scrollThreshold = 10 // Pixels antes de triggear hide/show

onMounted(() => {
  if (import.meta.client) {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Si scrolleó más de threshold
      if (Math.abs(currentScrollY - lastScrollY.value) > scrollThreshold) {
        if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
          // Scrolling down & pasó 100px → hide
          isVisible.value = false
        } else {
          // Scrolling up → show
          isVisible.value = true
        }
        lastScrollY.value = currentScrollY
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
})

// Siempre visible cuando cambia la selección
watch(selectedCount, () => {
  isVisible.value = true
})

const showModal = ref(false);

const handleCompare = () => {
  if (!canCompare.value) return
  
  console.log('🚀 Abriendo modal de comparación con', selectedCount.value, 'productos')
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
/* Horizontal list transition */
.list-horizontal-enter-active,
.list-horizontal-leave-active {
  transition: all 0.3s ease;
}

.list-horizontal-enter-from {
  opacity: 0;
  transform: translateX(-20px) scale(0.8);
}

.list-horizontal-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.8);
}

.list-horizontal-move {
  transition: transform 0.3s ease;
}
</style>
