<template>
    <div class="flex justify-between items-center">
      <p class="text-gray-400">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ total }} entries
      </p>
      <div class="flex gap-2">
        <button 
          @click="$emit('update:page', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg disabled:opacity-50"
          :class="currentPage === 1 ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 text-white hover:bg-gray-600'"
        >
          Previous
        </button>
        
        <div v-for="page in visiblePages" 
             :key="page"
             class="flex items-center">
          <button
            @click="$emit('update:page', page)"
            class="px-4 py-2 rounded-lg"
            :class="page === currentPage ? 'bg-pink-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'"
          >
            {{ page }}
          </button>
        </div>
  
        <button
          @click="$emit('update:page', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg disabled:opacity-50"
          :class="currentPage === totalPages ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 text-white hover:bg-gray-600'"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  })
  
  const totalPages = computed(() => Math.ceil(props.total / props.perPage))
  const startIndex = computed(() => (props.currentPage - 1) * props.perPage)
  const endIndex = computed(() => Math.min(startIndex.value + props.perPage, props.total))
  
  const visiblePages = computed(() => {
    let pages = []
    const maxPages = 5
    const halfMax = Math.floor(maxPages / 2)
    
    let start = Math.max(1, props.currentPage - halfMax)
    let end = Math.min(totalPages.value, start + maxPages - 1)
    
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1)
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  
    return pages
  })
  
  defineEmits(['update:page'])
  </script>