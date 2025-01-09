<template>
  <div class="h-16 w-full">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
let chart = null

// Add live data updates
const updateData = () => {
  if (!chart) return
  
  // Add new data point
  const newValue = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] * 
    (1 + (Math.random() * 0.02 - 0.01)) // Random change ±1%
  
  chart.data.datasets[0].data.push(newValue)
  
  // Remove oldest point to maintain same number of points
  if (chart.data.datasets[0].data.length > 20) {
    chart.data.datasets[0].data.shift()
  }
  
  chart.update('quiet')
}

const createChart = async () => {
  if (!chartRef.value) return

  const { Chart } = await import('chart.js/auto')
  
  const ctx = chartRef.value.getContext('2d')
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((_, i) => ''),
      datasets: [{
        data: props.data,
        borderColor: '#ec4899',
        borderWidth: 2,
        fill: true,
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0 // Disable animations for smoother updates
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      interaction: {
        intersect: false
      }
    }
  })

  // Start live updates
  setInterval(updateData, 2000) // Update every 2 seconds
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  if (chart) {
    chart.destroy()
  }
  createChart()
}, { deep: true })

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script> 