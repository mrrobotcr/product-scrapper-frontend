<template>
  <div class="space-y-4">
    <!-- Comparison Row for each product index -->
    <div
      v-for="(productGroup, index) in groupedProducts"
      :key="index"
      class="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <!-- Product Name Header -->
      <div class="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b-2 border-gray-100">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-2">
          {{ productGroup.name }}
        </h3>
      </div>

      <!-- Store Comparison Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-gray-100">
        <div
          v-for="store in productGroup.stores"
          :key="store.storeName"
          :class="[
            'p-6 relative',
            store.isLowest ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-white hover:bg-gray-50'
          ]"
        >
          <!-- Lowest Price Badge -->
          <div
            v-if="store.isLowest"
            class="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg"
          >
            🏆 Mejor Precio
          </div>

          <!-- Store Name -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
              🏪
            </div>
            <span class="font-semibold text-gray-900">{{ store.storeName }}</span>
          </div>

          <!-- Product exists in this store -->
          <div v-if="store.product">
            <!-- Image -->
            <div class="relative aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden">
              <NuxtImg
                v-if="store.product.image"
                :src="store.product.image"
                :alt="store.product.product_name"
                class="w-full h-full object-contain p-3"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-4xl opacity-20">📦</span>
              </div>
            </div>

            <!-- Price -->
            <div class="mb-4">
              <div
                :class="[
                  'text-3xl font-extrabold',
                  store.isLowest ? 'text-green-700' : 'text-gray-900'
                ]"
              >
                ₡{{ store.product.price.toLocaleString() }}
              </div>
              <div v-if="store.priceDiff && store.priceDiff > 0" class="text-xs text-red-600 mt-1">
                +₡{{ store.priceDiff.toLocaleString() }} más caro
              </div>
            </div>

            <!-- Action Button -->
            <a
              :href="store.product.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'block w-full text-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5',
                store.isLowest
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
              ]"
            >
              <span class="flex items-center justify-center gap-2">
                <span>{{ store.isLowest ? '🛒 Comprar aquí' : '🔗 Ver producto' }}</span>
              </span>
            </a>
          </div>

          <!-- Product not available in this store -->
          <div v-else class="text-center py-12">
            <span class="text-4xl mb-3 block opacity-20">❌</span>
            <p class="text-sm text-gray-500">No disponible</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MultiStoreSearchResult } from '~/types'

const props = defineProps<{
  results: MultiStoreSearchResult
}>()

interface ProductGroup {
  name: string
  stores: {
    storeName: string
    product: any | null
    isLowest: boolean
    priceDiff: number
  }[]
}

const groupedProducts = computed(() => {
  const groups: ProductGroup[] = []
  
  // Obtener el número máximo de productos entre todas las tiendas
  const maxProducts = Math.max(...props.results.stores.map(s => s.products.length))
  
  // Para cada índice de producto, crear un grupo de comparación
  for (let i = 0; i < maxProducts; i++) {
    const storeProducts = props.results.stores.map(store => ({
      storeName: store.store,
      product: store.products[i] || null,
      price: store.products[i]?.price || Infinity
    }))
    
    // Encontrar el precio más bajo
    const lowestPrice = Math.min(...storeProducts.map(sp => sp.price))
    
    // Obtener el nombre del producto (del primer disponible)
    const productName = storeProducts.find(sp => sp.product)?.product?.product_name || 'Producto'
    
    groups.push({
      name: productName,
      stores: storeProducts.map(sp => ({
        storeName: sp.storeName,
        product: sp.product,
        isLowest: sp.price === lowestPrice && sp.price !== Infinity,
        priceDiff: sp.price !== Infinity ? sp.price - lowestPrice : 0
      }))
    })
  }
  
  return groups
})
</script>
