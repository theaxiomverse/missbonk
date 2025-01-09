// components/ContestantsGrid.vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="contestant in contestants" 
         :key="contestant.id" 
         class="bg-gray-800 rounded-xl overflow-hidden">
      <!-- Contestant Image -->
      <div class="relative">
        <img
          :src="contestant.image"
          :alt="contestant.name"
          class="w-full aspect-[3/4] object-cover"
        />
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 class="text-xl font-bold">{{ contestant.name }}</h3>
          <p class="text-gray-300">{{ contestant.country }}</p>
        </div>
      </div>

      <!-- Contestant Info -->
      <div class="p-4 space-y-4">
        <p class="text-gray-300">{{ contestant.description }}</p>
        
        <div class="flex justify-between items-center">
          <div class="flex space-x-2">
            <a :href="'https://instagram.com/' + contestant.socialMedia.instagram"
               target="_blank" rel="noopener noreferrer"
               class="text-gray-400 hover:text-pink-500">
              <Icon name="uil:instagram" class="w-5 h-5" />
            </a>
            <a :href="'https://x.com/' + contestant.socialMedia.twitter"
               target="_blank" rel="noopener noreferrer"
               class="text-gray-400 hover:text-pink-500">
              <Icon name="uil:twitter" class="w-5 h-5" />
            </a>
          </div>
          <div class="flex items-center space-x-2 text-gray-300">
            <Icon name="ph:heart" class="w-5 h-5" />
            <span>{{ contestant.votes.toLocaleString() }}</span>
          </div>
        </div>

        <button
          @click="emit('vote', contestant)"
          class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Vote
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { contestants } = useContestants()
const emit = defineEmits(['vote'])
</script>