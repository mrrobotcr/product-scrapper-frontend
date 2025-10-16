import type { SimpleProduct } from '~/types'

export interface ComparisonProduct {
  product: SimpleProduct
  storeName: string
  uniqueId: string // ID generado al agregar
}

const selectedProducts = ref<ComparisonProduct[]>([])
const MAX_COMPARISON = 4

// Helper para crear ID único usando múltiples propiedades
const createUniqueId = (product: SimpleProduct, storeName: string): string => {
  // Usar JSON.stringify para garantizar unicidad
  const data = {
    url: product.url,
    name: product.product_name,
    price: product.price,
    store: storeName
  }
  return btoa(JSON.stringify(data)) // Base64 encode para ID compacto
}

export const useComparison = () => {
  const isSelected = (product: SimpleProduct, storeName: string): boolean => {
    if (!product || !storeName || selectedProducts.value.length === 0) {
      return false
    }
    
    const searchId = createUniqueId(product, storeName)
    return selectedProducts.value.some(item => item.uniqueId === searchId)
  }

  const toggleProduct = (product: SimpleProduct, storeName: string): void => {
    const uniqueId = createUniqueId(product, storeName)
    
    console.log('🔵 TOGGLE:', {
      productName: product.product_name.substring(0, 40),
      uniqueId: uniqueId.substring(0, 20) + '...',
      currentCount: selectedProducts.value.length
    })
    
    const index = selectedProducts.value.findIndex(item => item.uniqueId === uniqueId)
    
    if (index > -1) {
      console.log('❌ REMOVIENDO producto')
      selectedProducts.value.splice(index, 1)
    } else {
      if (selectedProducts.value.length < MAX_COMPARISON) {
        console.log('✅ AGREGANDO producto')
        selectedProducts.value.push({ product, storeName, uniqueId })
      }
    }
    
    console.log('📊 Total seleccionados:', selectedProducts.value.length)
  }

  const clearSelection = (): void => {
    selectedProducts.value = []
  }

  const canAddMore = computed(() => selectedProducts.value.length < MAX_COMPARISON)
  const selectedCount = computed(() => selectedProducts.value.length)
  const hasSelection = computed(() => selectedProducts.value.length > 0)
  const canCompare = computed(() => selectedProducts.value.length >= 2)

  return {
    selectedProducts: readonly(selectedProducts),
    selectedCount,
    hasSelection,
    canCompare,
    canAddMore,
    isSelected,
    toggleProduct,
    clearSelection,
    MAX_COMPARISON
  }
}
