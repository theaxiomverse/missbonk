// components/ContestantGallery.vue
<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="relative rounded-xl overflow-hidden">
      <img
        :src="selectedImage"
        :alt="contestant.name"
        class="w-full aspect-[4/3] object-cover"
      />
    </div>

    <!-- Thumbnail Gallery -->
    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="(image, index) in allImages"
        :key="index"
        @click="selectedIndex = index"
        class="relative rounded-lg overflow-hidden aspect-square"
        :class="{ 'ring-2 ring-pink-500': selectedIndex === index }"
      >
        <img
          :src="image"
          :alt="`${contestant.name} photo ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  contestant: {
    type: Object,
    required: true
  }
})

const selectedIndex = ref(0)
const allImages = computed(() => [props.contestant.image, ...props.contestant.galleryImages])
const selectedImage = computed(() => allImages.value[selectedIndex.value])
</script>