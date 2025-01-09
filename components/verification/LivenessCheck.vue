// components/verification/LivenessCheck.vue
<template>
  <div class="space-y-4">
    <div class="relative">
      <video
        v-if="isRecording"
        ref="videoRef"
        class="w-full rounded-lg"
        autoplay
        playsinline
      />
      <canvas 
        v-else-if="recordedVideo"
        ref="canvasRef"
        class="w-full rounded-lg"
      />
      <div
        v-if="isRecording"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="text-center space-y-2">
          <div class="text-2xl font-bold text-white">
            {{ currentInstruction }}
          </div>
          <div class="text-gray-300">
            {{ timeLeft }}s remaining
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!isRecording && !recordedVideo"
      @click="startLivenessCheck"
      class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
    >
      Start Liveness Check
    </button>

    <div v-if="recordedVideo" class="flex gap-4">
      <button
        @click="retryCheck"
        class="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
      >
        Retry
      </button>
      <button
        @click="submitCheck"
        class="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
const instructions = [
  'Look straight ahead',
  'Turn your head left',
  'Turn your head right',
  'Blink slowly',
  'Smile'
]

const videoRef = ref(null)
const canvasRef = ref(null)
const isRecording = ref(false)
const recordedVideo = ref(null)
const currentInstructionIndex = ref(0)
const timeLeft = ref(5)
const currentInstruction = computed(() => instructions[currentInstructionIndex.value])

const startLivenessCheck = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user' }
    })
    videoRef.value.srcObject = stream
    isRecording.value = true
    startInstructionSequence()
  } catch (error) {
    console.error('Camera access failed:', error)
  }
}

const startInstructionSequence = () => {
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      if (currentInstructionIndex.value < instructions.length - 1) {
        currentInstructionIndex.value++
        timeLeft.value = 5
      } else {
        clearInterval(timer)
        finishRecording()
      }
    }
  }, 1000)
}

const finishRecording = () => {
  isRecording.value = false
  recordedVideo.value = true
  // Save the final frame
  const canvas = canvasRef.value
  const video = videoRef.value
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0)
  video.srcObject.getTracks().forEach(track => track.stop())
}

const retryCheck = () => {
  recordedVideo.value = null
  currentInstructionIndex.value = 0
  timeLeft.value = 5
}

const submitCheck = () => {
  emit('complete')
}

const emit = defineEmits(['complete'])

// Cleanup on unmount
onUnmounted(() => {
  if (videoRef.value?.srcObject) {
    videoRef.value.srcObject.getTracks().forEach(track => track.stop())
  }
})
</script>

