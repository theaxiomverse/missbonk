<template>
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold text-white mb-4">{{ title }}</h3>
        <p class="text-gray-300 mb-6">{{ message }}</p>
        <div class="flex gap-4">
          <button
            @click="$emit('cancel')"
            class="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  })
  
  defineEmits(['confirm', 'cancel'])
  </script>