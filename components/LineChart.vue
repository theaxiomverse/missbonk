<template>
  <ClientOnly>
    <div class="w-full h-full">
      <canvas ref="chartRef"></canvas>
    </div>
    <template #fallback>
      <div class="w-full h-full bg-gray-800 rounded-lg animate-pulse"></div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
let chart = null

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#374151'
      },
      ticks: {
        color: '#9CA3AF'
      }
    },
    x: {
      grid: {
        color: '#374151'
      },
      ticks: {
        color: '#9CA3AF'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleColor: '#F3F4F6',
      bodyColor: '#F3F4F6',
      borderWidth: 1,
      borderColor: '#374151'
    }
  }
}

onMounted(async () => {
  if (!chartRef.value) return

  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)

  const ctx = chartRef.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: props.data,
    options: chartOptions
  })
})

// Update chart when data changes
watch(() => props.data, (newData) => {
  if (chart) {
    chart.data = newData
    chart.update()
  }
}, { deep: true })

// Cleanup on component unmount
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>