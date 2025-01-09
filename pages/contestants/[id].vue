// pages/contestants/[id].vue
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Contestant Profile -->
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Left Column: Photos -->
      <div class="space-y-6">
        <!-- Main Photo -->
        <div class="relative bg-gray-800 rounded-xl overflow-hidden">
          <img 
            :src="contestant.mainPhoto" 
            :alt="contestant.name"
            class="w-full aspect-[3/4] object-cover"
          />
        </div>

        <!-- Photo Gallery -->
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="(photo, index) in contestant.gallery" 
            :key="index"
            class="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            @click="openGallery(index)"
          >
            <img 
              :src="photo" 
              :alt="`${contestant.name} photo ${index + 1}`"
              class="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>

      <!-- Right Column: Info -->
      <div class="space-y-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">{{ contestant.name }}</h1>
          <p class="text-xl text-gray-400">{{ contestant.country }}</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-800 rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-pink-500">{{ contestant.votes }}</div>
            <div class="text-sm text-gray-400">Votes</div>
          </div>
          <div class="bg-gray-800 rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-pink-500">#{{ contestant.rank }}</div>
            <div class="text-sm text-gray-400">Rank</div>
          </div>
          <div class="bg-gray-800 rounded-xl p-4 text-center">
            <div class="text-2xl font-bold text-pink-500">{{ contestant.age }}</div>
            <div class="text-sm text-gray-400">Age</div>
          </div>
        </div>

        <!-- Bio -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4">About</h3>
          <p class="text-gray-300">{{ contestant.bio }}</p>
        </div>

        <!-- Social Media -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4">Social Media</h3>
          <div class="space-y-4">
            <a v-for="social in contestant.socialMedia"
               :key="social.platform"
               :href="social.url"
               target="_blank"
               class="flex items-center gap-3 text-gray-300 hover:text-pink-500"
            >
              <Icon :name="social.icon" class="w-6 h-6" />
              <span>{{ social.username }}</span>
            </a>
          </div>
        </div>

        <!-- Voting Section -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4">Vote for {{ contestant.name }}</h3>
            <!-- Voting Cost -->
    <div class="bg-gray-700 rounded-lg p-4 mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-gray-400">Current Vote Cost:</span>
        <span class="text-2xl font-bold text-pink-500">
          {{ formatNumber(currentVoteCost) }} MISSBONK
        </span>
      </div>
      
      <!-- Price Prediction -->
      <div class="space-y-2">
        <div class="text-sm text-gray-400">Next vote costs:</div>
        <div class="grid grid-cols-5 gap-2">
          <div v-for="prediction in nextVoteCosts" 
               :key="prediction.votes"
               class="text-center bg-gray-800 rounded p-2"
          >
            <div class="text-xs text-gray-400">Vote {{ prediction.votes }}</div>
            <div class="text-sm font-bold text-white">
              {{ formatNumber(prediction.cost) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bonding Curve Graph -->
    <div class="bg-gray-700 rounded-lg p-4 mb-6">
      <h4 class="text-sm font-medium text-gray-400 mb-4">Price Curve</h4>
      <div class="h-48">
        <div class="h-48 chart-container">
  <ClientOnly>
    <LineChart 
      :data="bondingCurveData" 
      class="w-full h-full" 
    />
  </ClientOnly>
</div>
      </div>
    </div>
          <div v-if="!connected" class="text-center">
            <p class="text-gray-400 mb-4">Connect your wallet to vote</p>
            <button 
              @click="connectWallet"
              class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
            >
              Connect Wallet
            </button>
          </div>

          <div v-else>
            <!-- Token Balance -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-400">Your MISSBONK Balance:</span>
              <span class="text-white font-bold">{{ formatNumber(missbonkBalance) }}</span>
            </div>

            <!-- Vote Requirements -->
            <div class="space-y-2 mb-6">
              <div class="flex items-center gap-2">
                <Icon 
                  :name="hasMinimumTokens ? 'ph:check-circle' : 'ph:x-circle'"
                  :class="hasMinimumTokens ? 'text-green-500' : 'text-red-500'"
                  class="w-5 h-5" 
                />
                <span class="text-gray-300">Minimum 1000 MISSBONK required</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon 
                  :name="!hasVotedToday ? 'ph:check-circle' : 'ph:x-circle'"
                  :class="!hasVotedToday ? 'text-green-500' : 'text-red-500'"
                  class="w-5 h-5"
                />
                <span class="text-gray-300">One vote per day allowed</span>
              </div>
            </div>

            <!-- Vote Button -->
            <button
              @click="vote"
              :disabled="!canVote || voting"
              class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
            >
              {{ getVoteButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal -->
    <BaseModal v-model="isGalleryOpen" title="Photo Gallery">
      <div class="grid grid-cols-2 gap-4">
        <img 
          v-for="(photo, index) in contestant.photos" 
          :key="index"
          :src="photo"
          :alt="`${contestant.name} photo ${index + 1}`"
          class="w-full rounded-lg"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
const route = useRoute()
const { 
  connected,
  missbonkBalance,
  connectWallet 
} = useTronWeb()

const { calculateVoteCost, getNextVoteCosts } = useBondingCurve()

// Current vote cost
const currentVoteCost = computed(() => 
  calculateVoteCost(contestant.value.votes, contestant.value.rank)
)

// Next 5 vote costs
const nextVoteCosts = computed(() => 
  getNextVoteCosts(contestant.value.votes, contestant.value.rank)
)

// Generate data for bonding curve graph
const bondingCurveData = computed(() => {
  const points = 20
  const data = Array.from({ length: points }, (_, i) => {
    const voteCount = contestant.value.votes + i
    return {
      votes: voteCount,
      price: calculateVoteCost(voteCount, contestant.value.rank)
    }
  })

  return {
    labels: data.map(d => d.votes.toString()),
    datasets: [{
      label: 'Vote Cost',
      data: data.map(d => d.price),
      borderColor: '#ec4899',
      tension: 0.4,
      fill: false
    }]
  }
})

// Mock contestant data - replace with API call
const contestant = ref({
  id: route.params.id,
  name: 'Jessica Chen',
  country: 'Singapore',
  age: 24,
  mainPhoto: 'https://i.pravatar.cc/800?img=47',
  gallery: [
    'https://i.pravatar.cc/400?img=48',
    'https://i.pravatar.cc/400?img=49',
    'https://i.pravatar.cc/400?img=50'
  ],
  votes: 2845,
  rank: 3,
  bio: 'Digital artist and crypto enthusiast, passionate about Web3 and NFTs. Creating at the intersection of art and technology.',
  socialMedia: [
    {
      platform: 'Instagram',
      icon: 'uil:instagram',
      username: '@jessicachen',
      url: '#'
    },
    {
      platform: 'Twitter',
      icon: 'uil:twitter',
      username: '@jess_chen',
      url: '#'
    },
    {
      platform: 'TikTok',
      icon: 'ph:tiktok-logo',
      username: '@jessicachen',
      url: '#'
    }
  ]
})

// Gallery state
const selectedPhotoIndex = ref(null)

// Voting state
const voting = ref(false)
const hasVotedToday = ref(false)
const MIN_TOKENS_REQUIRED = 1000

// Computed properties
const hasMinimumTokens = computed(() => missbonkBalance.value >= MIN_TOKENS_REQUIRED)

const canVote = computed(() => 
  connected.value && 
  hasMinimumTokens.value && 
  !hasVotedToday.value &&
  missbonkBalance.value >= currentVoteCost.value
)

const getVoteButtonText = computed(() => {
  if (voting.value) return 'Voting...'
  if (!connected.value) return 'Connect Wallet'
  if (missbonkBalance.value < currentVoteCost.value) 
    return `Need ${formatNumber(currentVoteCost.value)} MISSBONK`
  if (hasVotedToday.value) return 'Already Voted Today'
  return `Vote Now (${formatNumber(currentVoteCost.value)} MISSBONK)`
})
// Gallery functions
const openGallery = (index) => {
  selectedPhotoIndex.value = index
}

const closeGallery = () => {
  selectedPhotoIndex.value = null
}

const previousPhoto = () => {
  if (selectedPhotoIndex.value > 0) {
    selectedPhotoIndex.value--
  } else {
    selectedPhotoIndex.value = contestant.value.gallery.length - 1
  }
}

const nextPhoto = () => {
  if (selectedPhotoIndex.value < contestant.value.gallery.length - 1) {
    selectedPhotoIndex.value++
  } else {
    selectedPhotoIndex.value = 0
  }
}

// Voting function
const vote = async () => {
  if (!canVote.value) return

  try {
    voting.value = true
    const voteCost = currentVoteCost.value

    // Check if user has enough tokens
    if (missbonkBalance.value < voteCost) {
      throw new Error(`Insufficient MISSBONK. Need ${formatNumber(voteCost)} tokens`)
    }

    // Implement voting logic here
    // Send transaction with vote cost
    await new Promise(resolve => setTimeout(resolve, 2000)) // Mock delay

    hasVotedToday.value = true
    contestant.value.votes++
  } catch (error) {
    console.error('Voting error:', error)
    // Show error to user
  } finally {
    voting.value = false
  }
}

// Format numbers
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num)
}

const isGalleryOpen = ref(false)
</script>