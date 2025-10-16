<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-building-storefront"
              class="w-5 h-5 text-primary-600"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ store.store }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span>{{ store.count }} productos</span>
              <span>•</span>
              <span>{{ (store.duration / 1000).toFixed(1) }}s</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <UBadge
            :color="store.success ? 'green' : 'red'"
            variant="soft"
          >
            {{ store.success ? 'Exitoso' : 'Error' }}
          </UBadge>
          <UButton
            :href="store.searchUrl"
            target="_blank"
            color="gray"
            variant="ghost"
            icon="i-heroicons-arrow-top-right-on-square"
            size="sm"
          >
            Ver en tienda
          </UButton>
        </div>
      </div>
    </template>

    <!-- Error State -->
    <div v-if="!store.success" class="py-8 text-center">
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="w-12 h-12 text-red-400 mx-auto mb-2"
      />
      <p class="text-gray-600">{{ store.error || 'Error al cargar productos' }}</p>
    </div>

    <!-- Products Grid -->
    <div v-else-if="store.products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard
        v-for="(product, idx) in store.products"
        :key="idx"
        :product="product"
        :store-name="store.store"
      />
    </div>

    <!-- No Products -->
    <div v-else class="py-8 text-center text-gray-500">
      No se encontraron productos en esta tienda
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { StoreSearchResult } from '~/types'

defineProps<{
  store: StoreSearchResult
}>()
</script>
