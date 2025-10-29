<template>
  <div class="space-y-8 animate-in">
    <!-- Filtros y Ordenamiento con Glassmorphism -->
    <div class="glass rounded-2xl shadow-lg border border-white/60 p-6 lg:p-8">
      <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <!-- Filtros por Tienda con Icons -->
        <div class="flex-1">
          <label class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Filtrar por tienda
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedStore = null"
              :class="[
                'btn btn-sm group transition-all duration-200',
                selectedStore === null
                  ? 'btn-primary'
                  : 'btn-secondary hover:border-blue-300'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              <span class="font-semibold">Todas</span>
              <span class="badge badge-primary ml-1">{{ allProducts.length }}</span>
            </button>
            <button
              v-for="store in storeList"
              :key="store.name"
              @click="selectedStore = store.name"
              :class="[
                'btn btn-sm group transition-all duration-200',
                selectedStore === store.name
                  ? 'btn-primary'
                  : 'btn-secondary hover:border-blue-300'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>{{ store.name }}</span>
              <span class="badge badge-primary ml-1">{{ store.count }}</span>
            </button>
          </div>
        </div>

        <!-- Ordenamiento Mejorado -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
            </svg>
            Ordenar
          </label>
          <div class="relative">
            <select
              v-model="sortBy"
              class="input pr-10 appearance-none cursor-pointer font-medium"
            >
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="relevance">Relevancia</option>
              <option value="store">Tienda (A-Z)</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Contador de Resultados con Animación -->
    <Transition name="fade" mode="out-in">
      <div :key="filteredProducts.length" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
          </div>
          <div>
            <p class="text-lg font-bold text-gray-900">
              {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'producto' : 'productos' }}
            </p>
            <p class="text-xs text-gray-600">
              <span v-if="selectedStore">En <span class="font-semibold text-blue-600">{{ selectedStore }}</span></span>
              <span v-else>En todas las tiendas</span>
            </p>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
              <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-xs font-medium text-gray-600">Mejor precio</span>
          </div>
          <div class="text-xs text-gray-500 hidden sm:block">
            Ordenado por: <span class="font-semibold text-gray-700">{{ getSortLabel() }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Grid de Productos con Transiciones -->
    <TransitionGroup
      name="list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="(item, index) in filteredProducts"
        :key="`${item.storeName}-${item.product.product_name}-${item.product.price}-${index}`"
        class="relative"
        :style="{ animationDelay: `${index * 30}ms` }"
      >
        <!-- Badge de mejor precio con animación mejorada -->
        <Transition name="scale">
          <div
            v-if="item.isLowestPrice"
            class="absolute -top-3 -right-3 z-20"
          >
            <div class="relative">
              <!-- Glow effect -->
              <div class="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <!-- Badge -->
              <div class="relative w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform cursor-help"
                   title="Mejor precio en su categoría">
                <svg class="w-7 h-7 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </div>
        </Transition>

        <ProductCard
          :product="item.product"
          :store-name="item.storeName"
        />
      </div>
    </TransitionGroup>

    <!-- Empty State Mejorado -->
    <Transition name="fade">
      <div v-if="filteredProducts.length === 0" class="card p-12 text-center animate-in">
        <div class="inline-block relative mb-6">
          <div class="absolute inset-0 bg-gray-500/10 blur-3xl rounded-full"></div>
          <svg class="relative w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          No se encontraron productos
        </h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">
          <span v-if="selectedStore">
            No hay productos disponibles en <span class="font-semibold text-blue-600">{{ selectedStore }}</span>
          </span>
          <span v-else>
            Intenta ajustar los filtros o realizar otra búsqueda
          </span>
        </p>
        <button
          v-if="selectedStore"
          @click="selectedStore = null"
          class="btn btn-primary btn-md"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          Ver todas las tiendas
        </button>
      </div>
    </Transition>

    <!-- Comparison Bar (Floating) -->
    <ComparisonBar />
  </div>
</template>

<script setup lang="ts">
import type { MultiStoreSearchResult, SimpleProduct } from '~/types'

const props = defineProps<{
  results: MultiStoreSearchResult
}>()

interface ProductWithStore {
  product: SimpleProduct
  storeName: string
  isLowestPrice: boolean
}

// Estado reactivo
const selectedStore = ref<string | null>(null)
const sortBy = ref<'price-asc' | 'price-desc' | 'relevance' | 'store'>('price-asc')

// Lista de tiendas con contadores
const storeList = computed(() => {
  return props.results.stores.map(store => ({
    name: store.store,
    count: store.products.length
  }))
})

// Combinar todos los productos de todas las tiendas
const allProducts = computed(() => {
  const products: ProductWithStore[] = []
  
  props.results.stores.forEach(store => {
    if (store.success && store.products.length > 0) {
      store.products.forEach(product => {
        products.push({
          product,
          storeName: store.store,
          isLowestPrice: false // Se calculará después
        })
      })
    }
  })
  
  return products
})

// Detectar productos similares y marcar el más barato
const productsWithLowestPrice = computed(() => {
  const products = [...allProducts.value]
  
  // Agrupar por nombre similar (primeras 30 caracteres)
  const groups = new Map<string, ProductWithStore[]>()
  
  products.forEach(item => {
    const key = item.product.product_name.substring(0, 30).toLowerCase().trim()
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(item)
  })
  
  // Marcar el más barato en cada grupo
  groups.forEach(group => {
    if (group.length > 1) {
      const lowestPriceItem = group.reduce((min, item) => 
        item.product.price < min.product.price ? item : min
      )
      lowestPriceItem.isLowestPrice = true
    }
  })
  
  return products
})

// Filtrar por tienda
const filteredByStore = computed(() => {
  if (!selectedStore.value) {
    return productsWithLowestPrice.value
  }
  return productsWithLowestPrice.value.filter(item => item.storeName === selectedStore.value)
})

// Ordenar productos
const filteredProducts = computed(() => {
  const products = [...filteredByStore.value]
  
  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => a.product.price - b.product.price)
    
    case 'price-desc':
      return products.sort((a, b) => b.product.price - a.product.price)
    
    case 'store':
      return products.sort((a, b) => a.storeName.localeCompare(b.storeName))
    
    case 'relevance':
    default:
      // Mantener el orden original (ya viene ordenado por el LLM)
      return products
  }
})

// Helper para mostrar label de ordenamiento
const getSortLabel = () => {
  const labels = {
    'price-asc': 'Precio ↑',
    'price-desc': 'Precio ↓',
    'relevance': 'Relevancia',
    'store': 'Tienda A-Z'
  }
  return labels[sortBy.value]
}
</script>

<style scoped>
/* List transition para grid de productos */
.list-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.list-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Scale transition para badge */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
