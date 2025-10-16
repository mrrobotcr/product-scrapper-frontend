import type { SimpleProduct } from '~/types'

export interface ComparisonProduct {
  product: SimpleProduct
  storeName: string
}

const selectedProducts = ref<ComparisonProduct[]>([])
const MAX_COMPARISON = 4 // Máximo de productos comparables

export const useComparison = () => {
  // Helper: Create unique ID combining product properties
  const getProductId = (product: SimpleProduct, storeName: string): string => {
    // Usar múltiples propiedades para crear un ID más único
    const urlPart = product.url?.trim() || ''
    const namePart = product.product_name?.trim() || ''
    const pricePart = product.price?.toString() || ''
    const storePart = storeName?.trim() || ''
    
    return `${storePart}||${urlPart}||${namePart}||${pricePart}`.toLowerCase()
  }

  const isSelected = (productUrl: string, storeName: string): boolean => {
    if (!productUrl || !storeName || selectedProducts.value.length === 0) {
      return false
    }
    
    // Buscar por URL y storeName exactos
    return selectedProducts.value.some(item => 
      item.product.url === productUrl && item.storeName === storeName
    )
  }

  const toggleProduct = (product: SimpleProduct, storeName: string): void => {
    console.log('🔵 TOGGLE PRODUCT CALLED:', {
      productName: product.product_name.substring(0, 40),
      productUrl: product.url.substring(0, 50),
      storeName,
      currentSelectionCount: selectedProducts.value.length
    })
    
    // Buscar por URL y storeName exactos
    const index = selectedProducts.value.findIndex(item => 
      item.product.url === product.url && item.storeName === storeName
    )
    
    if (index > -1) {
      // Remover producto
      console.log('❌ REMOVIENDO producto en index:', index)
      selectedProducts.value.splice(index, 1)
    } else {
      // Agregar producto si no excede el máximo
      if (selectedProducts.value.length < MAX_COMPARISON) {
        console.log('✅ AGREGANDO producto. Nuevo total:', selectedProducts.value.length + 1)
        selectedProducts.value.push({ product, storeName })
      } else {
        console.log('⚠️ NO SE PUEDE AGREGAR - Límite alcanzado')
      }
    }
    
    console.log('📊 Estado final de selectedProducts:', selectedProducts.value.map(p => ({
      store: p.storeName,
      name: p.product.product_name.substring(0, 30),
      url: p.product.url.substring(0, 50)
    })))
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
