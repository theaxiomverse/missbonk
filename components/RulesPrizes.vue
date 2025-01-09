// components/RulesPrizes.vue
<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-gray-800 rounded-xl p-6 mb-8">
      <h2 class="text-2xl font-bold mb-6">Rules</h2>
      <ul class="space-y-4 text-gray-300">
        <li v-for="(rule, index) in rules" 
            :key="index"
            class="flex items-start">
          <span class="text-pink-500 mr-2">•</span>
          {{ rule }}
        </li>
      </ul>
    </div>

    <div class="bg-gray-800 rounded-xl p-6">
      <h2 class="text-2xl font-bold mb-6">Prizes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="prize in prizes" 
             :key="prize.place"
             class="text-center p-6 bg-gray-700 rounded-lg">
          <div class="text-3xl font-bold text-pink-500 mb-2">{{ prize.place }}</div>
          <div class="text-xl font-bold mb-2">{{ prize.amount }}</div>
          <p class="text-gray-300">{{ prize.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const rules = [
  'Must be 18 years or older to participate',
  'Hold minimum 1000 MISSBONK tokens throughout the competition',
  'Complete social media verification',
  'Submit high-quality photos and required documentation'
]

const prizes = [
  {
    place: '1st Place',
    amount: '50,000 TRX',
    description: 'Plus exclusive NFT and marketing opportunities'
  },
  {
    place: '2nd Place',
    amount: '25,000 TRX',
    description: 'Plus community features and NFT'
  },
  {
    place: '3rd Place',
    amount: '10,000 TRX',
    description: 'Plus commemorative NFT'
  }
]
</script>