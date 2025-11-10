<template>
  <div class="flex items-center gap-2">
    <!-- Step Circle -->
    <div class="flex items-center gap-2">
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 text-xs font-medium"
        :class="{
          'bg-blue-600 text-white animate-pulse': isActive,
          'bg-green-600 text-white': isCompleted && !isActive,
          'bg-gray-300 text-gray-600': !isCompleted && !isActive
        }"
      >
        <!-- Check icon for completed steps -->
        <svg v-if="isCompleted && !isActive" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>

        <!-- Loading spinner for active step -->
        <div v-else-if="isActive" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

        <!-- Step number for pending steps -->
        <span v-else>{{ stepNumber }}</span>
      </div>

      <!-- Step Label and Description -->
      <div class="flex flex-col">
        <span
          class="text-sm font-medium transition-all duration-500"
          :class="{
            'text-blue-700': isActive,
            'text-green-700': isCompleted && !isActive,
            'text-gray-500': !isCompleted && !isActive
          }"
        >
          {{ step.label }}
        </span>
        <span
          class="text-xs transition-all duration-500"
          :class="{
            'text-blue-600': isActive,
            'text-green-600': isCompleted && !isActive,
            'text-gray-400': !isCompleted && !isActive
          }"
        >
          {{ step.description }}
        </span>
      </div>
    </div>

    <!-- Connection Line (not for last step) -->
    <div v-if="!isLast" class="relative">
      <div
        class="w-8 h-0.5 transition-all duration-500"
        :class="{
          'bg-blue-400': isActive || isCompleted,
          'bg-gray-300': !isCompleted && !isActive
        }"
      ></div>

      <!-- Animated dots on the line when active -->
      <div v-if="isActive" class="absolute inset-0 flex items-center">
        <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-flow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PhaseStepData {
  phase: string
  label: string
  description: string
}

defineProps<{
  step: PhaseStepData
  isActive: boolean
  isCompleted: boolean
  isLast: boolean
  stepNumber?: number
}>()
</script>

<style scoped>
@keyframes flow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-flow {
  animation: flow 1.5s ease-in-out infinite;
}
</style>