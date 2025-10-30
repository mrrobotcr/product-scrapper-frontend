// Tipos para el API del backend

export interface SimpleProduct {
  url: string
  product_name: string
  price: number
  currency?: string
  image?: string
}

export interface StoreSearchResult {
  store: string
  domain: string
  products: SimpleProduct[] | readonly SimpleProduct[]
  count: number
  success: boolean
  error?: string
  searchUrl: string
  duration: number
}

export interface MultiStoreSearchResult {
  search: string
  totalStores: number
  successfulStores: number
  totalProducts: number
  stores: StoreSearchResult[] | readonly StoreSearchResult[]
  duration: number
  filtered?: boolean
  filterSummary?: string
}

export interface SearchOptions {
  search: string
  type?: 'open_search'
  topN?: number
  filter?: string
  maxPages?: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
