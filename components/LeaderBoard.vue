// components/Leaderboard.vue
<template>
  <div class="bg-gray-800 rounded-xl p-6">
    <h3 class="text-xl font-bold mb-6">Top Contestants</h3>
    <div class="space-y-4">
      <div v-for="(contestant, index) in sortedContestants" 
           :key="contestant.id"
           class="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
        <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center font-bold">
          {{ index + 1 }}
        </div>
        <img :src="contestant.image" 
             :alt="contestant.name"
             class="w-12 h-12 rounded-full object-cover" />
        <div class="flex-1">
          <h4 class="font-bold">{{ contestant.name }}</h4>
          <p class="text-sm text-gray-400">{{ contestant.country }}</p>
        </div>
        <div class="text-right">
          <div class="font-bold">{{ contestant.votes.toLocaleString() }}</div>
          <div class="text-sm text-gray-400">votes</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { contestants } = useContestants()

const sortedContestants = computed(() => {
  return [...contestants.value].sort((a, b) => b.votes - a.votes).slice(0, 5)
})
</script>