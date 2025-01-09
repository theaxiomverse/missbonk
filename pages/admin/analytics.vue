// pages/admin/analytics.vue
<template>
  <div class="min-h-screen bg-gray-900">
    <AdminHeader title="Analytics Dashboard" />

    <div class="container mx-auto px-4 py-8">
      <!-- Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in overviewStats" 
             :key="stat.title"
             class="bg-gray-800 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400">{{ stat.title }}</p>
              <div class="flex items-baseline gap-2">
                <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
                <span :class="[
                  'text-sm',
                  stat.change > 0 ? 'text-green-500' : 'text-red-500'
                ]">
                  {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
                </span>
              </div>
            </div>
            <Icon :name="stat.icon" class="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Applications Timeline -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-6">Applications Timeline</h3>
          <LineChart :data="applicationsData" />
        </div>

        <!-- Voting Distribution -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-6">Vote Distribution</h3>
          <PieChart :data="votingData" />
        </div>
      </div>

      <!-- Geographic Distribution -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <h3 class="text-xl font-bold text-white mb-6">Geographic Distribution</h3>
        <div class="h-96">
          <WorldMap :data="geographicData" />
        </div>
      </div>

      <!-- Engagement Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Social Media Engagement -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-6">Social Media Engagement</h3>
          <BarChart :data="socialEngagementData" />
        </div>

        <!-- Token Holder Distribution -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-6">Token Holder Distribution</h3>
          <DonutChart :data="tokenDistributionData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const overviewStats = [
  {
    title: 'Total Applications',
    value: '2,547',
    change: 12.5,
    icon: 'ph:users'
  },
  {
    title: 'Total Votes',
    value: '152.3K',
    change: 8.2,
    icon: 'ph:heart'
  },
  {
    title: 'Token Holders',
    value: '18.2K',
    change: -2.4,
    icon: 'ph:coin'
  },
  {
    title: 'Engagement Rate',
    value: '68.5%',
    change: 5.7,
    icon: 'ph:chart-line-up'
  }
]

// Mock data for charts
const applicationsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Applications',
    data: [150, 280, 420, 380, 520, 480],
    borderColor: '#ec4899'
  }]
}

const votingData = {
  labels: ['Top 10', 'Top 20', 'Top 50', 'Others'],
  datasets: [{
    data: [40, 25, 20, 15],
    backgroundColor: ['#ec4899', '#d946ef', '#a855f7', '#8b5cf6']
  }]
}

const geographicData = {
  // World map data...
}

const socialEngagementData = {
  labels: ['Instagram', 'Twitter', 'TikTok', 'YouTube'],
  datasets: [{
    label: 'Followers',
    data: [125000, 85000, 95000, 45000],
    backgroundColor: '#ec4899'
  }]
}

const tokenDistributionData = {
  labels: ['Contestants', 'Voters', 'Community', 'Team'],
  datasets: [{
    data: [30, 40, 20, 10],
    backgroundColor: ['#ec4899', '#d946ef', '#a855f7', '#8b5cf6']
  }]
}
</script>

