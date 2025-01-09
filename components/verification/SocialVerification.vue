// components/verification/SocialVerification.vue
<template>
  <div class="space-y-6">
    <!-- Social Platforms -->
    <div v-for="platform in socialPlatforms" 
         :key="platform.name"
         class="bg-gray-800 rounded-xl p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <Icon :name="platform.icon" class="w-6 h-6 text-gray-400" />
          <h3 class="text-lg font-bold text-white">{{ platform.name }}</h3>
        </div>
        <StatusBadge 
          v-if="platform.verified"
          status="verified"
          size="sm"
        />
      </div>

      <div v-if="!platform.verified" class="space-y-4">
        <div class="flex">
          <span class="bg-gray-700 px-4 py-2 rounded-l-lg text-gray-400">@</span>
          <input
            v-model="platform.username"
            type="text"
            class="flex-1 bg-gray-700 rounded-r-lg px-4 py-2 text-white"
            :placeholder="`Enter your ${platform.name} username`"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-400">
            {{ platform.followersRequired }}+ followers required
          </div>
          <button
            @click="startVerification(platform)"
            :disabled="!platform.username"
            class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            Verify Account
          </button>
        </div>
      </div>

      <div v-else class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-white">@{{ platform.username }}</span>
          <span class="text-gray-400">{{ platform.followers }} followers</span>
        </div>
        <a
          :href="platform.profileUrl"
          target="_blank"
          class="text-pink-500 hover:text-pink-400"
        >
          View Profile
        </a>
      </div>
    </div>

    <!-- Complete Verification -->
    <button
      @click="completeVerification"
      :disabled="!isFullyVerified"
      class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
    >
      {{ isFullyVerified ? 'Complete Verification' : 'Verify All Platforms' }}
    </button>
  </div>
</template>

<script setup>
const socialPlatforms = reactive([
  {
    name: 'Instagram',
    icon: 'uil:instagram',
    username: '',
    verified: false,
    followers: 0,
    followersRequired: 1000,
    profileUrl: ''
  },
  {
    name: 'Twitter',
    icon: 'uil:twitter',
    username: '',
    verified: false,
    followers: 0,
    followersRequired: 500,
    profileUrl: ''
  },
  {
    name: 'TikTok',
    icon: 'ph:tiktok-logo',
    username: '',
    verified: false,
    followers: 0,
    followersRequired: 1000,
    profileUrl: ''
  }
])

const isFullyVerified = computed(() => 
  socialPlatforms.every(platform => platform.verified)
)

const startVerification = async (platform) => {
  // Generate verification code
  const verificationCode = `MISSB_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  
  // Show verification instructions
  const confirmed = await useModal().confirm({
    title: `Verify ${platform.name}`,
    content: `Please post the following code on your ${platform.name} profile:\n\n${verificationCode}\n\nClick confirm once posted.`
  })

  if (confirmed) {
    // Mock verification process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock successful verification
    platform.verified = true
    platform.followers = Math.floor(Math.random() * 5000) + platform.followersRequired
    platform.profileUrl = `https://${platform.name.toLowerCase()}.com/${platform.username}`
  }
}

const completeVerification = () => {
  emit('verified', socialPlatforms)
}

const emit = defineEmits(['verified'])
</script>