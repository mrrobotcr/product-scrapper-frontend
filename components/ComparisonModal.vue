<template>
  <!-- Fullscreen Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
        :class="isDarkMode ? 'bg-gray-900/95' : 'bg-black/60'"
        @click.self="closeModal"
      >
        <!-- Modal Container -->
        <div 
          class="w-full max-w-[95rem] max-h-[95vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
          :class="isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'"
        >
          
          <!-- Header -->
          <div 
            class="flex items-center justify-between p-4 sm:p-6 border-b transition-colors"
            :class="isDarkMode 
              ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900' 
              : 'border-gray-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50'"
          >
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" 
                  :class="isDarkMode ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h2 class="text-xl sm:text-2xl font-bold" 
                  :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                  Comparación Inteligente
                </h2>
              </div>
              <p class="text-xs sm:text-sm flex items-center gap-2" 
                :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z"/>
                  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd"/>
                </svg>
                <span>Análisis IA • {{ products.length }} productos • Actualizado ahora</span>
              </p>
            </div>
            
            <div class="flex items-center gap-2">
              <!-- Dark Mode Toggle -->
              <button
                @click="toggleDarkMode"
                class="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                :class="isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'"
                title="Cambiar tema"
              >
                <svg v-if="isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              </button>
              
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                :class="isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 shadow-sm'"
                title="Cerrar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6">
            
            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
              <div class="relative">
                <div class="w-20 h-20 border-4 rounded-full animate-spin"
                  :class="isDarkMode ? 'border-gray-700 border-t-blue-500' : 'border-blue-100 border-t-blue-600'"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-8 h-8" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z"/>
                    <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p class="mt-6 font-semibold" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">Analizando productos con IA...</p>
              <p class="mt-2 text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">Comparando especificaciones, precios y características</p>
              <div class="mt-4 flex gap-2">
                <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <h3 class="font-semibold text-red-900">Error al comparar productos</h3>
                  <p class="mt-1 text-sm text-red-700">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- Comparison Result -->
            <div v-else-if="comparisonData" class="space-y-8">
              
              <!-- AI Analysis Section - REDESIGNED -->
              <div 
                class="rounded-2xl overflow-hidden border-2 transition-all duration-300"
                :class="isDarkMode 
                  ? 'bg-gray-800 border-blue-500/30' 
                  : 'bg-white border-blue-200'"
              >
                <!-- Header -->
                <div 
                  class="px-4 py-3 flex items-center gap-3 border-b"
                  :class="isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-gray-700' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'"
                >
                  <div 
                    class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    :class="isDarkMode ? 'bg-blue-600' : 'bg-blue-600'"
                  >
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H7v6h6V7z"/>
                      <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                      Análisis Inteligente
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 text-xs font-bold rounded-full"
                    :class="isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'">
                    IA
                  </span>
                </div>

                <!-- Content -->
                <div class="p-4 space-y-4">
                  <!-- Summary Points -->
                  <div>
                    <h4 class="text-xs font-semibold uppercase tracking-wide mb-2" 
                      :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                      Resumen Comparativo
                    </h4>
                    <div class="space-y-2">
                      <div 
                        v-for="(point, idx) in parseSummaryPoints(comparisonData.analysis.summary)"
                        :key="`summary-${idx}`"
                        class="flex items-start gap-2 text-sm"
                      >
                        <svg class="w-4 h-4 flex-shrink-0 mt-0.5" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ point }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Recommendation - Highlighted -->
                  <div 
                    class="p-3 rounded-lg border-l-4"
                    :class="isDarkMode 
                      ? 'bg-yellow-500/10 border-yellow-500' 
                      : 'bg-yellow-50 border-yellow-400'"
                  >
                    <div class="flex items-start gap-2">
                      <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <div class="flex-1">
                        <p class="text-xs font-semibold uppercase tracking-wide mb-1" 
                          :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-700'">
                          Recomendación
                        </p>
                        <p class="text-sm font-medium leading-snug" 
                          :class="isDarkMode ? 'text-gray-200' : 'text-gray-900'">
                          {{ comparisonData.analysis.recommendation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Price Analysis -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <h4 class="font-semibold text-green-900">Más Económico</h4>
                  </div>
                  <p class="text-sm text-green-700">{{ comparisonData.analysis.price_analysis.cheapest }}</p>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <h4 class="font-semibold text-blue-900">Mejor Valor</h4>
                  </div>
                  <p class="text-sm text-blue-700">{{ comparisonData.analysis.price_analysis.best_value }}</p>
                </div>

                <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                    </svg>
                    <h4 class="font-semibold text-purple-900">Rango de Precios</h4>
                  </div>
                  <p class="text-sm text-purple-700">{{ comparisonData.analysis.price_analysis.price_range }}</p>
                </div>
              </div>

              <!-- Flip Cards - Side by Side -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  v-for="(product, idx) in comparisonData.products"
                  :key="`product-card-${idx}`"
                  class="flip-card-container"
                  style="perspective: 1000px;"
                >
                  <div
                    class="flip-card-inner relative transition-transform duration-700"
                    :style="{ transform: isFlipped(idx) ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
                    style="transform-style: preserve-3d;"
                  >
                    <!-- FRONT SIDE -->
                    <div
                      class="flip-card-front rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl"
                      :class="[
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
                        getProductBadge(product, idx).border
                      ]"
                      style="backface-visibility: hidden;"
                    >
                      <!-- Card Header with Badge -->
                      <div 
                        class="p-4 flex items-center justify-between"
                        :class="getProductBadge(product, idx).headerClass"
                      >
                        <div v-if="getProductBadge(product, idx).show" class="flex items-center gap-2 text-white">
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path :d="getProductBadge(product, idx).icon"/>
                          </svg>
                          <span class="font-bold text-sm">{{ getProductBadge(product, idx).label }}</span>
                        </div>
                        <div v-else></div>
                        
                        <!-- Flip Button -->
                        <button 
                          @click="toggleFlip(idx)"
                          class="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                          :class="isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'"
                          title="Ver descripción"
                        >
                          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </button>
                      </div>

                      <!-- Product Content -->
                      <div class="p-4">
                        <div class="flex gap-4">
                          <!-- Left: Image Gallery -->
                          <div class="flex-shrink-0">
                            <!-- Main Image -->
                            <div 
                              class="relative w-32 h-32 rounded-lg overflow-hidden mb-2 group cursor-pointer" 
                              :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                              @click="openLightbox(idx, getSelectedImageIndex(idx))"
                              title="Click para ampliar"
                            >
                              <template v-if="getCurrentImage(product, idx)">
                                <img
                                  :src="getCurrentImage(product, idx)"
                                  :alt="product.name"
                                  class="w-full h-full object-contain p-2 transition-all duration-200 group-hover:scale-105"
                                  @error="(e) => (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%239ca3af%22 font-family=%22system-ui%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E'"
                                />
                                <!-- Zoom Icon Overlay -->
                                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                                  </svg>
                                </div>
                              </template>
                              <div v-else class="w-full h-full flex items-center justify-center">
                                <svg class="w-8 h-8 opacity-20" :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                                </svg>
                              </div>
                              
                              <!-- Navigation Arrows (show only if multiple images) -->
                              <div v-if="product.images && getThumbnails(product.images).length > 1" class="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  @click.stop="selectImage(idx, (getSelectedImageIndex(idx) - 1 + getThumbnails(product.images).length) % getThumbnails(product.images).length)"
                                  class="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                                  :class="isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-white'"
                                  title="Imagen anterior"
                                >
                                  <svg class="w-4 h-4" :class="isDarkMode ? 'text-white' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                  </svg>
                                </button>
                                <button
                                  @click.stop="selectImage(idx, (getSelectedImageIndex(idx) + 1) % getThumbnails(product.images).length)"
                                  class="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                                  :class="isDarkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-white'"
                                  title="Imagen siguiente"
                                >
                                  <svg class="w-4 h-4" :class="isDarkMode ? 'text-white' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            <!-- Thumbnails -->
                            <div v-if="product.images && getThumbnails(product.images).length > 1" class="space-y-1">
                              <div class="flex gap-1">
                                <button
                                  v-for="(image, imgIdx) in getThumbnails(product.images || [])"
                                  :key="`thumb-${idx}-${imgIdx}`"
                                  @click.stop="selectImage(idx, imgIdx)"
                                  class="w-8 h-8 rounded overflow-hidden border-2 transition-all duration-200 hover:scale-105"
                                  :class="[
                                    getSelectedImageIndex(idx) === imgIdx 
                                      ? (isDarkMode ? 'border-blue-400' : 'border-blue-600')
                                      : (isDarkMode ? 'border-gray-600' : 'border-gray-300'),
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                  ]"
                                  :title="`Ver imagen ${imgIdx + 1}`"
                                >
                                  <img
                                    :src="image"
                                    :alt="`${product.name} - imagen ${imgIdx + 1}`"
                                    class="w-full h-full object-contain p-0.5"
                                    @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                                  />
                                </button>
                              </div>
                              <!-- Image counter -->
                              <div class="text-xs text-center" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                                {{ getSelectedImageIndex(idx) + 1 }}/{{ getThumbnails(product.images).length }}
                              </div>
                            </div>
                          </div>

                          <!-- Right: Info -->
                          <div class="flex-1 min-w-0">
                            <!-- Product Name -->
                            <h4 class="text-base font-bold mb-2 line-clamp-2" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                              {{ product.name }}
                            </h4>

                            <!-- Compact Info Grid -->
                            <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                              <div v-if="product.brand" class="flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5 flex-shrink-0" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                                </svg>
                                <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ product.brand }}</span>
                              </div>
                              <div v-if="product.availability" class="flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5 flex-shrink-0" :class="isDarkMode ? 'text-green-400' : 'text-green-600'" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                </svg>
                                <span :class="isDarkMode ? 'text-green-400' : 'text-green-600'">{{ product.availability }}</span>
                              </div>
                              <div class="flex items-center gap-1.5 col-span-2">
                                <svg class="w-3.5 h-3.5 flex-shrink-0" :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"/>
                                </svg>
                                <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ product.store }}</span>
                              </div>
                            </div>

                            <!-- Price -->
                            <div class="mb-3">
                              <p class="text-2xl font-extrabold" 
                                :class="idx === 0 && isDarkMode ? 'text-green-400' 
                                  : idx === 0 ? 'text-green-600' 
                                  : isDarkMode ? 'text-white' : 'text-gray-900'">
                                {{ formatPrice(product.price) }}
                              </p>
                            </div>

                            <!-- Action Button -->
                            <a
                              :href="product.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                              :class="idx === 0 
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                              </svg>
                              <span>{{ idx === 0 ? 'Comprar' : 'Ver' }}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- BACK SIDE -->
                    <div
                      class="flip-card-back absolute inset-0 rounded-2xl overflow-hidden border-2 shadow-lg"
                      :class="[
                        isDarkMode 
                          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                      ]"
                      style="backface-visibility: hidden; transform: rotateY(180deg);"
                    >
                      <!-- Back Header -->
                      <div class="px-4 py-3 flex items-center justify-between"
                        :class="isDarkMode ? 'bg-blue-600/20 border-b border-blue-500/30' : 'bg-blue-50 border-b border-blue-200'">
                        <div class="flex items-center gap-2">
                          <svg class="w-5 h-5" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                          </svg>
                          <h4 class="font-bold text-sm" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                            Descripción Detallada
                          </h4>
                        </div>
                        
                        <!-- Flip Back Button -->
                        <button 
                          @click="toggleFlip(idx)"
                          class="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                          :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'"
                          title="Volver"
                        >
                          <svg class="w-5 h-5" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>

                      <!-- Description Content -->
                      <div class="p-4 overflow-y-auto" style="max-height: 380px;">
                        <div v-if="product.description" class="space-y-3">
                          <!-- Array description (normalized by GPT) -->
                          <ul v-if="Array.isArray(product.description)" class="space-y-2">
                            <li 
                              v-for="(item, itemIdx) in product.description"
                              :key="itemIdx"
                              class="flex items-start gap-2 text-sm"
                            >
                              <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" 
                                :class="isDarkMode ? 'bg-blue-400' : 'bg-blue-600'"></span>
                              <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ item }}</span>
                            </li>
                          </ul>
                          <!-- String description -->
                          <p v-else class="text-sm leading-relaxed" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                            {{ product.description }}
                          </p>
                        </div>
                        <div v-else class="flex items-center justify-center h-32">
                          <p class="text-sm" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">
                            No hay descripción disponible
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <!-- Pros & Cons -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  v-for="(item, idx) in comparisonData.analysis.pros_cons"
                  :key="`pros-cons-${idx}`"
                  class="border border-gray-200 rounded-xl p-4"
                >
                  <h4 class="font-semibold text-gray-900 mb-3 truncate" :title="item.product">
                    {{ item.product.substring(0, 30) }}{{ item.product.length > 30 ? '...' : '' }}
                  </h4>
                  
                  <!-- Pros -->
                  <div class="mb-3">
                    <p class="text-xs font-medium text-green-700 mb-2">✓ Ventajas</p>
                    <ul class="space-y-1">
                      <li
                        v-for="(pro, pIdx) in item.pros"
                        :key="`pro-${pIdx}`"
                        class="text-xs text-gray-600 flex items-start gap-1"
                      >
                        <span class="text-green-500 mt-0.5">•</span>
                        <span>{{ pro }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Cons -->
                  <div>
                    <p class="text-xs font-medium text-red-700 mb-2">✗ Desventajas</p>
                    <ul class="space-y-1">
                      <li
                        v-for="(con, cIdx) in item.cons"
                        :key="`con-${cIdx}`"
                        class="text-xs text-gray-600 flex items-start gap-1"
                      >
                        <span class="text-red-500 mt-0.5">•</span>
                        <span>{{ con }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button
              @click="closeModal"
              class="px-6 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Image Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxOpen && getLightboxProduct()"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
        @click.self="closeLightbox"
      >
        <div class="relative max-w-7xl w-full h-full flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-white font-bold text-lg line-clamp-1">
                {{ getLightboxProduct()?.name }}
              </h3>
              <p class="text-gray-400 text-sm">
                {{ getLightboxProduct()?.store }} • {{ formatPrice(getLightboxProduct()?.price || 0) }}
              </p>
            </div>
            <button
              @click="closeLightbox"
              class="ml-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Cerrar (ESC)"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Main Image Container -->
          <div class="flex-1 flex items-center justify-center relative">
            <!-- Previous Button -->
            <button
              v-if="getThumbnails(getLightboxProduct()?.images || []).length > 1"
              @click="prevLightboxImage"
              class="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
              title="Imagen anterior (←)"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <!-- Image -->
            <div class="max-w-5xl max-h-full flex items-center justify-center">
              <img
                v-if="getThumbnails(getLightboxProduct()?.images || [])[lightboxImageIndex]"
                :src="getThumbnails(getLightboxProduct()?.images || [])[lightboxImageIndex]"
                :alt="getLightboxProduct()?.name"
                class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                @error="(e) => (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%239ca3af%22 font-family=%22system-ui%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E'"
              />
            </div>

            <!-- Next Button -->
            <button
              v-if="getThumbnails(getLightboxProduct()?.images || []).length > 1"
              @click="nextLightboxImage"
              class="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
              title="Imagen siguiente (→)"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
              {{ lightboxImageIndex + 1 }} / {{ getThumbnails(getLightboxProduct()?.images || []).length }}
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="getThumbnails(getLightboxProduct()?.images || []).length > 1" class="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
            <button
              v-for="(image, imgIdx) in getThumbnails(getLightboxProduct()?.images || [])"
              :key="`lightbox-thumb-${imgIdx}`"
              @click="lightboxImageIndex = imgIdx"
              class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105"
              :class="lightboxImageIndex === imgIdx ? 'border-blue-400' : 'border-white/30'"
            >
              <img
                :src="image"
                :alt="`${getLightboxProduct()?.name} - imagen ${imgIdx + 1}`"
                class="w-full h-full object-contain bg-white/10"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

interface Product {
  url: string;
  storeName: string;
  product_name: string;
  price: number;
}

interface ComparisonData {
  products: Array<{
    name: string;
    store: string;
    price: number;
    url: string;
    description?: string | string[];  // Puede ser string o array de strings (normalizado)
    brand?: string;
    availability?: string;
    specifications?: Record<string, any>;
    images?: string[];
  }>;
  analysis: {
    summary: string;
    recommendation: string;
    pros_cons: Array<{
      product: string;
      pros: string[];
      cons: string[];
    }>;
    price_analysis: {
      cheapest: string;
      best_value: string;
      price_range: string;
    };
  };
}

const props = defineProps<{
  isOpen: boolean;
  products: Product[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const loading = ref(false);
const error = ref('');
const comparisonData = ref<ComparisonData | null>(null);
const isDarkMode = ref(false);
const flippedCards = ref<Set<number>>(new Set());
const selectedImageIndex = ref<Record<number, number>>({});
const lightboxOpen = ref(false);
const lightboxProductIndex = ref<number | null>(null);
const lightboxImageIndex = ref(0);

// Toggle flip state for a card
const toggleFlip = (idx: number) => {
  if (flippedCards.value.has(idx)) {
    flippedCards.value.delete(idx);
  } else {
    flippedCards.value.add(idx);
  }
  // Trigger reactivity
  flippedCards.value = new Set(flippedCards.value);
};

const isFlipped = (idx: number) => flippedCards.value.has(idx);

// Image gallery management
const selectImage = (productIdx: number, imageIdx: number) => {
  selectedImageIndex.value[productIdx] = imageIdx;
};

const getSelectedImageIndex = (productIdx: number) => {
  return selectedImageIndex.value[productIdx] || 0;
};

const getCurrentImage = (product: any, productIdx: number) => {
  if (!product.images || product.images.length === 0) return null;
  const idx = getSelectedImageIndex(productIdx);
  return product.images[idx] || product.images[0];
};

// Get unique thumbnails (filter out duplicates and small sizes)
const getThumbnails = (images: string[]) => {
  if (!images || images.length === 0) return [];
  // Filter out images with 90x90 size (thumbnails) and keep only unique URLs
  const uniqueImages = [...new Set(images.filter(img => !img.includes('90:90')))];
  return uniqueImages.slice(0, 4); // Max 4 images
};

// Lightbox functions
const openLightbox = (productIdx: number, imageIdx: number) => {
  lightboxProductIndex.value = productIdx;
  lightboxImageIndex.value = imageIdx;
  lightboxOpen.value = true;
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  lightboxProductIndex.value = null;
  lightboxImageIndex.value = 0;
  // Restore body scroll
  document.body.style.overflow = '';
};

const nextLightboxImage = () => {
  if (lightboxProductIndex.value === null || !comparisonData.value) return;
  const product = comparisonData.value.products[lightboxProductIndex.value];
  if (!product) return;
  const images = getThumbnails(product.images || []);
  lightboxImageIndex.value = (lightboxImageIndex.value + 1) % images.length;
};

const prevLightboxImage = () => {
  if (lightboxProductIndex.value === null || !comparisonData.value) return;
  const product = comparisonData.value.products[lightboxProductIndex.value];
  if (!product) return;
  const images = getThumbnails(product.images || []);
  lightboxImageIndex.value = (lightboxImageIndex.value - 1 + images.length) % images.length;
};

const getLightboxProduct = () => {
  if (lightboxProductIndex.value === null || !comparisonData.value) return null;
  return comparisonData.value.products[lightboxProductIndex.value];
};

const config = useRuntimeConfig();

// Dark mode toggle
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Watch for open state and fetch comparison
watch(() => props.isOpen, async (newValue) => {
  if (newValue && props.products.length > 0) {
    await fetchComparison();
  }
});

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxImage();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    }
  };
  
  window.addEventListener('keydown', handleKeydown);
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
    // Restore body scroll if component unmounts while lightbox is open
    if (lightboxOpen.value) {
      document.body.style.overflow = '';
    }
  });
});

const fetchComparison = async () => {
  loading.value = true;
  error.value = '';
  comparisonData.value = null;

  try {
    const response = await $fetch<{ success: boolean; comparison?: ComparisonData; error?: string }>(
      `${config.public.apiBase}/api/compare`,
      {
        method: 'POST',
        body: { products: props.products }
      }
    );

    if (response.success && response.comparison) {
      comparisonData.value = response.comparison;
    } else {
      error.value = response.error || 'Error al comparar productos';
    }
  } catch (err) {
    console.error('Error fetching comparison:', err);
    error.value = 'No se pudo conectar con el servidor. Intenta nuevamente.';
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  emit('close');
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Parse summary text into bullet points
const parseSummaryPoints = (summary: string): string[] => {
  // Split by sentences (. followed by space and capital letter)
  const sentences = summary.split(/\.\s+(?=[A-Z])/);
  // Return up to 3 points, filter empty
  return sentences
    .filter(s => s.trim().length > 10)
    .slice(0, 3)
    .map(s => s.trim().replace(/\.$/, ''));
};

// Get badge for product directly from GPT analysis by index
const getProductBadge = (product: any, idx: number) => {
  if (!comparisonData.value?.analysis) {
    return { show: false, label: '', icon: '', headerClass: '', border: '' };
  }

  const analysis = comparisonData.value.analysis as any;
  const productBadges = analysis.product_badges || [];
  
  // Find badge for this product by index
  const badge = productBadges.find((b: any) => b.product_index === idx);
  
  console.log('🎯 Badge for product', idx, ':', badge);
  
  if (!badge) {
    // No badge assigned by GPT
    return {
      show: false,
      label: '',
      icon: '',
      headerClass: isDarkMode.value ? 'bg-gray-700' : 'bg-gray-50',
      border: 'hover:border-blue-400'
    };
  }
  
  // Color mapping
  const colorMap: Record<string, any> = {
    green: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
        : 'bg-gradient-to-r from-green-500 to-emerald-500',
      border: 'hover:border-green-400',
      icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
    },
    blue: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-500',
      border: 'hover:border-blue-400',
      icon: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
    },
    orange: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-orange-600 to-red-600' 
        : 'bg-gradient-to-r from-orange-500 to-red-500',
      border: 'hover:border-orange-400',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    purple: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
        : 'bg-gradient-to-r from-purple-500 to-pink-500',
      border: 'hover:border-purple-400',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    teal: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-teal-600 to-cyan-600' 
        : 'bg-gradient-to-r from-teal-500 to-cyan-500',
      border: 'hover:border-teal-400',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    yellow: {
      headerClass: isDarkMode.value 
        ? 'bg-gradient-to-r from-yellow-600 to-amber-600' 
        : 'bg-gradient-to-r from-yellow-500 to-amber-500',
      border: 'hover:border-yellow-400',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    }
  };
  
  const colors = colorMap[badge.badge_color] || colorMap.blue;
  
  return {
    show: true,
    label: badge.badge_label.toUpperCase(),
    ...colors
  };
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
