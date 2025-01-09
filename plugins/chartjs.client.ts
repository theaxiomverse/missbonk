import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

// Register
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Bar', Bar)
    nuxtApp.vueApp.component('Line', Line)
    nuxtApp.vueApp.component('Chart', ChartJS)
})