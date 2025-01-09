<template>
  <span 
    class="font-medium"
    :class="[
      parseFloat(value) > 0 ? 'text-green-500' : 'text-red-500',
      className
    ]"
  >
    {{ parseFloat(value) > 0 ? '+' : '' }}{{ value }}%
  </span>
</template>

<script setup>
defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
</script> 