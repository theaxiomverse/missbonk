// components/VerificationStep.vue
<template>
  <div class="bg-gray-800 rounded-xl p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <div :class="[
          'w-10 h-10 rounded-full flex items-center justify-center',
          isCompleted ? 'bg-green-500' : 'bg-gray-700'
        ]">
          <Icon 
            :name="isCompleted ? 'ph:check-bold' : icon" 
            class="w-6 h-6 text-white"
          />
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">{{ title }}</h3>
          <p class="text-gray-400">{{ description }}</p>
        </div>
      </div>
      <StatusBadge :status="status" />
    </div>

    <div v-if="!isCompleted" class="space-y-4">
      <slot />
      
      <button
        @click="$emit('verify')"
        :disabled="loading"
        class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
      >
        {{ loading ? 'Verifying...' : 'Verify' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const isCompleted = computed(() => props.status === 'verified')

defineEmits(['verify'])
</script>