// components/CompetitionTimer.vue
<template>
  <div class="flex items-center space-x-2 font-mono">
    <div v-for="unit in timeUnits" :key="unit.label" class="text-center">
      <span class="text-lg font-bold text-pink-500">{{ unit.value }}</span>
      <span class="text-xs text-gray-400 ml-1">{{ unit.label }}</span>
    </div>
  </div>
</template>

<script setup>
const endDate = new Date('2025-12-31T23:59:59')
const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const timeUnits = computed(() => [
  { label: 'D', value: timeLeft.value.days },
  { label: 'H', value: timeLeft.value.hours },
  { label: 'M', value: timeLeft.value.minutes },
  { label: 'S', value: timeLeft.value.seconds }
])

const updateTimer = () => {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()

  if (diff > 0) {
    timeLeft.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    }
  }
}

onMounted(() => {
  updateTimer()
  const timer = setInterval(updateTimer, 1000)
  onUnmounted(() => clearInterval(timer))
})
</script>