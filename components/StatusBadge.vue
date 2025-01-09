// components/StatusBadge.vue
<template>
  <span :class="[
    baseClasses,
    statusClasses[status],
    sizeClasses[size]
  ]">
    {{ status }}
  </span>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const baseClasses = 'rounded-full px-2 py-1 text-sm font-medium'

const statusClasses = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  approved: 'bg-green-500/20 text-green-500',
  rejected: 'bg-red-500/20 text-red-500',
  verified: 'bg-blue-500/20 text-blue-500'
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm'
}
</script>