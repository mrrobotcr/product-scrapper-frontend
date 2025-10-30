<template>
  <div class="h-full">
    <!-- Card Container with Selection State -->
    <div 
      :class="[
        'card-interactive h-full flex flex-col group relative transition-all duration-300',
        isProductSelected ? 'ring-4 ring-blue-500 ring-offset-2 shadow-2xl' : ''
      ]"
    >
      <!-- Selection Overlay -->
      <Transition name="fade">
        <div
          v-if="isProductSelected"
          class="absolute inset-0 bg-blue-500/10 rounded-2xl pointer-events-none z-10"
        ></div>
      </Transition>

      <!-- Selection Checkbox -->
      <button
        @click.stop="handleToggleSelection"
        :class="[
          'absolute top-3 left-3 z-20 w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center',
          isProductSelected 
            ? 'bg-blue-600 scale-110 shadow-lg' 
            : 'bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-blue-400'
        ]"
        :title="isProductSelected ? 'Quitar de comparación' : 'Agregar a comparación'"
      >
        <Transition name="scale" mode="out-in">
          <svg
            v-if="isProductSelected"
            key="checked"
            class="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <svg
            v-else
            key="unchecked"
            class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </Transition>
      </button>

      <!-- Image Container with Gradient Overlay -->
      <div class="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <NuxtImg
          v-if="product.image"
          :src="product.image"
          :alt="product.product_name"
          class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          placeholder
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        
        <!-- Loading Indicator with animated icon -->
        <Transition name="fade">
          <div v-if="isLoading" class="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl pointer-events-none flex items-center justify-center">
            <Icon name="ri:loader-4-line" class="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        </Transition>

        <!-- New Badge -->
        <Transition name="scale">
          <div v-if="isNew && !isLoading" class="absolute top-3 left-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full shadow-lg text-xs font-bold">
            Nuevo
          </div>
        </Transition>

        <!-- Price Badge Floating -->
        <div class="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
          <span class="text-sm font-bold">{{ formatPrice(product.price) }}</span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="flex-1 flex flex-col p-4">
        <!-- Product Name -->
        <h4
          class="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 min-h-[2.5rem] leading-tight"
          :title="product.product_name"
        >
          {{ product.product_name }}
        </h4>

        <!-- Bottom Section -->
        <div class="mt-auto space-y-3">
          <!-- Store Badge -->
          <div class="flex items-center gap-2 text-xs text-gray-600">
            <span class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full font-medium">
              <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>{{ storeName }}</span>
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <!-- Compare Button -->
            <button
              @click.stop.prevent="handleToggleSelection"
              :disabled="!canAddMore && !isProductSelected"
              :class="[
                'flex-1 px-4 py-2.5 font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5',
                isProductSelected
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              ]"
            >
              <span class="flex items-center justify-center gap-2">
                <Transition name="scale" mode="out-in">
                  <svg
                    v-if="isProductSelected"
                    key="selected"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg
                    v-else
                    key="unselected"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </Transition>
                <span>{{ isProductSelected ? 'Seleccionado' : 'Comparar' }}</span>
              </span>
            </button>

            <!-- Quick View Link -->
            <a
              :href="product.url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 flex items-center justify-center group/link"
              title="Ver en tienda"
            >
              <svg class="w-4 h-4 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SimpleProduct } from '~/types'

const props = defineProps<{
  product: SimpleProduct
  storeName: string
  isNew?: boolean
  isLoading?: boolean
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Comparison functionality
const { isSelected: isSelectedFn, toggleProduct, canAddMore, selectedProducts } = useComparison()

const isProductSelected = computed(() => {
  const result = isSelectedFn(props.product, props.storeName)
  return result
})

const handleToggleSelection = () => {
  if (!canAddMore.value && !isProductSelected.value) {
    // Show feedback when max is reached
    return
  }
  toggleProduct(props.product, props.storeName)
}
</script>
