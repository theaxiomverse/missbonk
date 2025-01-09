<template>
    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="relative group">
        <img
          :src="contestant.image"
          :alt="contestant.name"
          class="w-full aspect-[3/4] object-cover transition duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-xl font-bold text-white">{{ contestant.name }}</h3>
          <p class="text-gray-300">{{ contestant.country }}</p>
        </div>
      </div>
  
      <div class="p-4 space-y-4">
        <!-- Bonding Curve Mini Chart -->
        <div class="bg-gray-700/50 rounded-lg p-3">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-400">Price</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-white">
                {{ formatNumber(getCurrentPrice()) }} TRX
              </span>
              <PriceChange 
                :value="priceChange24h"
                class="text-xs"
              />
            </div>
          </div>
          
          <MiniChart :data="bondingCurveData" />
          
          <div class="flex justify-between items-center mt-2 text-xs">
            <div class="space-y-1">
              <div class="flex items-center gap-1">
                <span class="text-gray-400">1h:</span>
                <PriceChange :value="priceChange1h" />
              </div>
              <div class="flex items-center gap-1">
                <span class="text-gray-400">24h:</span>
                <PriceChange :value="priceChange24h" />
              </div>
            </div>
            <div class="text-right">
              <div class="text-gray-400">Volume 24h</div>
              <div class="text-white font-medium">
                {{ formatNumber(volume24h) }} TRX
              </div>
            </div>
          </div>
        </div>
  
        <div class="flex justify-between items-center">
          <div class="flex space-x-2">
            <a :href="'https://instagram.com/' + contestant.socialMedia.instagram"
               target="_blank" rel="noopener noreferrer"
               class="text-gray-400 hover:text-pink-500 transition">
              <Icon name="uil:instagram" class="w-5 h-5" />
            </a>
            <a :href="'https://twitter.com/' + contestant.socialMedia.twitter"
               target="_blank" rel="noopener noreferrer"
               class="text-gray-400 hover:text-pink-500 transition">
              <Icon name="uil:twitter" class="w-5 h-5" />
            </a>
          </div>
          <div class="flex items-center space-x-2 text-gray-300">
            <Icon name="ph:heart" class="w-5 h-5" />
            <span>{{ contestant.votes.toLocaleString() }}</span>
          </div>
        </div>
  
        <button
          @click="showVoteModal = true"
          class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Vote
        </button>
      </div>
  
      <VoteModal 
        v-model="showVoteModal"
        :contestant="contestant"
        @vote="handleVote"
        @close="showVoteModal = false"
      />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    contestant: {
      type: Object,
      required: true
    }
  })
  
  const showVoteModal = ref(false)
  
  // Generate mock bonding curve data
  const bondingCurveData = computed(() => {
    const points = 20
    const basePrice = 100
    const multiplier = 1.1
    return Array.from({ length: points }, (_, i) => {
      return basePrice * Math.pow(multiplier, i)
    })
  })
  
  const getCurrentPrice = () => {
    const currentVotes = props.contestant.votes
    const basePrice = 100
    const multiplier = 1.1
    return Math.floor(basePrice * Math.pow(multiplier, currentVotes / 100))
  }
  
  const handleVote = (contestant) => {
    emit('vote', contestant)
    showVoteModal.value = false
  }
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(num)
  }
  
  const emit = defineEmits(['vote'])
  
  // Mock time-based data
  const priceChange1h = computed(() => {
    // Random value between -5 and +5
    return (Math.random() * 10 - 5).toFixed(2)
  })
  
  const priceChange24h = computed(() => {
    // Random value between -15 and +15
    return (Math.random() * 30 - 15).toFixed(2)
  })
  
  const volume24h = computed(() => {
    // Random volume between 1000 and 10000
    return Math.floor(Math.random() * 9000 + 1000)
  })
  </script>