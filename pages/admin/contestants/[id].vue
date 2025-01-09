// pages/admin/contestants/[id].vue
<template>
  <div class="min-h-screen bg-gray-900">
    <AdminHeader :title="`Contestant: ${contestant.name}`" />

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contestant Profile -->
        <div class="md:col-span-1">
          <div class="bg-gray-800 rounded-xl overflow-hidden">
            <img 
              :src="contestant.photo"
              :alt="contestant.name"
              class="w-full aspect-square object-cover"
            />
            <div class="p-6">
              <h2 class="text-2xl font-bold text-white mb-2">
                {{ contestant.name }}
              </h2>
              <p class="text-gray-400 mb-4">{{ contestant.country }}</p>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Age</span>
                  <span class="text-white">{{ contestant.age }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Total Votes</span>
                  <span class="text-white">{{ contestant.votes.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Rank</span>
                  <span class="text-white">#{{ contestant.rank }}</span>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-700">
                <h3 class="text-lg font-bold text-white mb-4">Social Media</h3>
                <div class="flex gap-4">
                  <a v-for="social in contestant.socialMedia"
                     :key="social.platform"
                     :href="social.url"
                     target="_blank"
                     class="text-gray-400 hover:text-pink-500">
                    <Icon :name="social.icon" class="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contestant Details -->
        <div class="md:col-span-2 space-y-8">
          <!-- Voting Activity -->
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-6">Voting Activity</h3>
            <LineChart :data="votingActivity" class="h-64" />
          </div>

          <!-- Verification Status -->
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-6">Verification Status</h3>
            <div class="space-y-4">
              <div v-for="verification in verificationStatus"
                   :key="verification.type"
                   class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <Icon :name="verification.icon" class="w-6 h-6 text-gray-400" />
                  <span class="text-white">{{ verification.type }}</span>
                </div>
                <StatusBadge :status="verification.status" />
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-6">Photo Gallery</h3>
            <div class="grid grid-cols-3 gap-4">
              <img v-for="(photo, index) in contestant.gallery"
                   :key="index"
                   :src="photo"
                   :alt="`Photo ${index + 1}`"
                   class="w-full aspect-square object-cover rounded-lg cursor-pointer"
                   @click="openGallery(index)"
              />
            </div>
          </div>

          <!-- Admin Actions -->
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-6">Admin Actions</h3>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="disqualifyContestant"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Disqualify
              </button>
              <button
                @click="featureContestant"
                class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                Feature Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal -->
    <Modal v-if="selectedPhoto !== null"
           @close="selectedPhoto = null">
      <div class="relative">
        <img
          :src="contestant.gallery[selectedPhoto]"
          :alt="`Photo ${selectedPhoto + 1}`"
          class="w-full rounded-lg"
        />
        <div class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
          <button
            @click="previousPhoto"
            class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <Icon name="ph:caret-left" class="w-6 h-6" />
          </button>
         <button @click="nextPhoto"
            class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <Icon name="ph:caret-right" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </Modal>

    <!-- Confirmation Modals -->
    <ConfirmationModal
      v-if="showDisqualifyModal"
      title="Disqualify Contestant"
      message="Are you sure you want to disqualify this contestant? This action cannot be undone."
      @confirm="confirmDisqualify"
      @cancel="showDisqualifyModal = false"
    />
  </div>
</template>

<script setup>
const route = useRoute()
const selectedPhoto = ref(null)
const showDisqualifyModal = ref(false)

// Mock contestant data
const contestant = ref({
  id: route.params.id,
  name: 'Sarah Johnson',
  photo: 'https://i.pravatar.cc/400?img=47',
  country: 'USA',
  age: 24,
  votes: 15234,
  rank: 3,
  socialMedia: [
    { platform: 'Instagram', icon: 'uil:instagram', url: '#' },
    { platform: 'Twitter', icon: 'uil:twitter', url: '#' },
    { platform: 'TikTok', icon: 'ph:tiktok-logo', url: '#' }
  ],
  gallery: [
    'https://i.pravatar.cc/400?img=48',
    'https://i.pravatar.cc/400?img=49',
    'https://i.pravatar.cc/400?img=50'
  ]
})

const verificationStatus = [
  { type: 'Identity', icon: 'ph:identification-card', status: 'verified' },
  { type: 'Social Media', icon: 'ph:social-media', status: 'verified' },
  { type: 'Photo', icon: 'ph:camera', status: 'verified' },
  { type: 'Liveness', icon: 'ph:video-camera', status: 'verified' }
]

// Mock voting activity data
const votingActivity = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Votes',
    data: [2500, 4800, 3900, 4100],
    borderColor: '#ec4899',
    tension: 0.4
  }]
}

const openGallery = (index) => {
  selectedPhoto.value = index
}

const previousPhoto = () => {
  selectedPhoto.value = selectedPhoto.value === 0 
    ? contestant.value.gallery.length - 1 
    : selectedPhoto.value - 1
}

const nextPhoto = () => {
  selectedPhoto.value = selectedPhoto.value === contestant.value.gallery.length - 1
    ? 0
    : selectedPhoto.value + 1
}

const disqualifyContestant = () => {
  showDisqualifyModal.value = true
}

const confirmDisqualify = async () => {
  try {
    // Implement disqualification logic
    await $fetch(`/api/admin/contestants/${contestant.value.id}/disqualify`, {
      method: 'POST'
    })
    navigateTo('/admin/contestants')
  } catch (error) {
    console.error('Error disqualifying contestant:', error)
  }
}

const featureContestant = async () => {
  try {
    // Implement featuring logic
    await $fetch(`/api/admin/contestants/${contestant.value.id}/feature`, {
      method: 'POST'
    })
  } catch (error) {
    console.error('Error featuring contestant:', error)
  }
}
</script>