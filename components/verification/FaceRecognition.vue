// components/verification/FaceRecognition.vue
<template>
  <div class="space-y-4">
    <!-- Camera View -->
    <div class="relative aspect-video">
      <video
        v-if="isCameraActive"
        ref="videoRef"
        class="w-full rounded-lg"
        autoplay
        playsinline
      />
      <canvas 
        v-show="!isCameraActive"
        ref="canvasRef"
        class="w-full rounded-lg"
      />
      
      <!-- Face Detection Overlay -->
      <div v-if="faceDetected" 
           class="absolute inset-0 border-4 border-green-500 rounded-lg" />
      
      <!-- Instructions -->
      <div v-if="isCameraActive" 
           class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full">
        <p class="text-white text-center">{{ currentInstruction }}</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex gap-4">
      <button
        v-if="!isCameraActive"
        @click="startCamera"
        class="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
      >
        Start Face Recognition
      </button>
      <template v-else>
        <button
          @click="captureImage"
          class="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          :disabled="!faceDetected"
        >
          Capture
        </button>
        <button
          @click="stopCamera"
          class="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
const videoRef = ref(null)
const canvasRef = ref(null)
const isCameraActive = ref(false)
const faceDetected = ref(false)
const currentInstruction = ref('Position your face in the frame')

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    })
    videoRef.value.srcObject = stream
    isCameraActive.value = true
    startFaceDetection()
  } catch (error) {
    console.error('Camera access failed:', error)
  }
}

const startFaceDetection = () => {
  // Mock face detection
  setTimeout(() => {
    faceDetected.value = true
    currentInstruction.value = 'Perfect! Click capture to continue'
  }, 2000)
}

const captureImage = () => {
  const canvas = canvasRef.value
  const video = videoRef.value
  
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0)
  
  stopCamera()
  emit('capture', canvas.toDataURL('image/jpeg'))
}

const stopCamera = () => {
  if (videoRef.value?.srcObject) {
    videoRef.value.srcObject.getTracks().forEach(track => track.stop())
  }
  isCameraActive.value = false
  faceDetected.value = false
}

const emit = defineEmits(['capture'])

// Cleanup
onUnmounted(() => {
  stopCamera()
})
</script>

