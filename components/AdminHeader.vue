// components/AdminHeader.vue
<template>
  <div class="bg-gray-800 border-b border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <h1 class="text-xl font-bold text-white">{{ title }}</h1>
        <div class="flex items-center gap-4">
          <!-- Admin Profile -->
          <div class="flex items-center gap-2">
            <img 
              src="https://i.pravatar.cc/32?img=1"
              alt="Admin"
              class="w-8 h-8 rounded-full"
            />
            <span class="text-white">Admin</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>