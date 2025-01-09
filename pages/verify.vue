<template>
    <div class="min-h-screen bg-gray-900 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-4xl font-bold text-white mb-8">Verify Your Application</h1>
          
          <div class="space-y-6">
            <!-- Identity Verification -->
            <VerificationStep
              title="Identity Verification"
              description="Verify your identity using a government-issued ID"
              icon="ph:identification-card"
              :status="steps.identity.status"
              :loading="steps.identity.loading"
              @verify="verifyIdentity"
            >
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-400 mb-2">
                    ID Front
                  </label>
                  <InteractiveImageUpload
                    v-model:files="idFront"
                    accept="image/*"
                    placeholder="Upload ID front"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-400 mb-2">
                    ID Back
                  </label>
                  <InteractiveImageUpload
                    v-model:files="idBack"
                    accept="image/*"
                    placeholder="Upload ID back"
                  />
                </div>
              </div>
            </VerificationStep>
  
            <!-- Social Media Verification -->
            <VerificationStep
              title="Social Media Verification"
              description="Verify your social media accounts"
              icon="ph:social-media"
              :status="steps.social.status"
              :loading="steps.social.loading"
              @verify="verifySocial"
            >
              <div class="space-y-4">
                <div v-for="platform in socialPlatforms" 
                     :key="platform.name"
                     class="flex items-center gap-4">
                  <Icon :name="platform.icon" class="w-6 h-6 text-gray-400" />
                  <input
                    v-model="platform.username"
                    type="text"
                    :placeholder="'Enter your ' + platform.name + ' username'"
                    class="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                  <StatusBadge 
                    v-if="platform.verified"
                    status="verified"
                    size="sm"
                  />
                </div>
              </div>
            </VerificationStep>
  
            <!-- Photo Verification -->
            <VerificationStep
              title="Photo Verification"
              description="Take a selfie holding your ID"
              icon="ph:camera"
              :status="steps.photo.status"
              :loading="steps.photo.loading"
              @verify="verifyPhoto"
            >
              <div v-if="!cameraActive" class="text-center">
                <button
                  @click="startCamera"
                  class="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Start Camera
                </button>
              </div>
              
              <div v-else class="space-y-4">
                <video
                  ref="videoRef"
                  class="w-full rounded-lg"
                  autoplay
                  playsinline
                />
                <button
                  @click="capturePhoto"
                  class="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Take Photo
                </button>
              </div>
            </VerificationStep>
          </div>
  
          <!-- Completion Status -->
          <div class="mt-8 p-6 bg-gray-800 rounded-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-white">Verification Status</h3>
                <p class="text-gray-400">
                  {{ completedSteps }}/{{ totalSteps }} steps completed
                </p>
              </div>
              <button
                @click="submitVerification"
                :disabled="!isFullyVerified"
                class="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
              >
                Complete Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const videoRef = ref(null)
  const cameraActive = ref(false)
  
  const steps = reactive({
    identity: { status: 'pending', loading: false },
    social: { status: 'pending', loading: false },
    photo: { status: 'pending', loading: false }
  })
  
  const idFront = ref(null)
  const idBack = ref(null)
  
  const socialPlatforms = reactive([
    { name: 'Instagram', icon: 'uil:instagram', username: '', verified: false },
    { name: 'Twitter', icon: 'uil:twitter', username: '', verified: false }
  ])
  
  const completedSteps = computed(() => 
    Object.values(steps).filter(step => step.status === 'verified').length
  )
  
  const totalSteps = computed(() => Object.keys(steps).length)
  
  const isFullyVerified = computed(() => completedSteps.value === totalSteps.value)
  
  const verifyIdentity = async () => {
    if (!idFront.value || !idBack.value) {
      alert('Please upload both sides of your ID')
      return
    }
  
    steps.identity.loading = true
    try {
      // Implement ID verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      steps.identity.status = 'verified'
    } catch (error) {
      console.error('ID verification failed:', error)
    } finally {
      steps.identity.loading = false
    }
  }
  
  const verifySocial = async () => {
    const unverifiedPlatforms = socialPlatforms.filter(p => !p.username)
    if (unverifiedPlatforms.length) {
      alert('Please enter all social media usernames')
      return
    }
  
    steps.social.loading = true
    try {
      // Implement social verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      socialPlatforms.forEach(p => p.verified = true)
      steps.social.status = 'verified'
    } catch (error) {
      console.error('Social verification failed:', error)
    } finally {
      steps.social.loading = false
    }
  }
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }
      })
      videoRef.value.srcObject = stream
      cameraActive.value = true
    } catch (error) {
      console.error('Camera access failed:', error)
      alert('Could not access camera')
    }
  }
  
  const capturePhoto = async () => {
    steps.photo.loading = true
    try {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.value.videoWidth
      canvas.height = videoRef.value.videoHeight
      canvas.getContext('2d').drawImage(videoRef.value, 0, 0)
      
      // Implement photo verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      steps.photo.status = 'verified'
    } catch (error) {
      console.error('Photo verification failed:', error)
    } finally {
      steps.photo.loading = false
      cameraActive.value = false
      videoRef.value.srcObject.getTracks().forEach(track => track.stop())
    }
  }
  
  const submitVerification = async () => {
    // Implement final verification submission
    await navigateTo('/apply')
  }
  
  // Cleanup camera on unmount
  onUnmounted(() => {
    if (videoRef.value?.srcObject) {
      videoRef.value.srcObject.getTracks().forEach(track => track.stop())
    }
  })
  </script>