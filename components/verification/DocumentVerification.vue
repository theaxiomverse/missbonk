// components/verification/DocumentVerification.vue
<template>
  <div class="space-y-6">
    <!-- Document Type Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-2">
        Document Type
      </label>
      <select
        v-model="selectedDocument"
        class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
      >
        <option value="">Select document type</option>
        <option v-for="doc in documentTypes" 
                :key="doc.value" 
                :value="doc.value">
          {{ doc.label }}
        </option>
      </select>
    </div>

    <!-- Document Upload Area -->
    <div v-if="selectedDocument">
      <div class="grid grid-cols-2 gap-4">
        <!-- Front Side -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Front Side
          </label>
          <div
            class="relative border-2 border-dashed border-gray-600 rounded-lg aspect-[3/2] overflow-hidden"
            @dragover.prevent
            @drop.prevent="handleDrop($event, 'front')"
            @click="$refs.frontInput.click()"
          >
            <input
            
              ref="frontInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect($event, 'front')"
            />
            
            <template v-if="!documents.front">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <Icon name="ph:identification-card" class="w-12 h-12 text-gray-400 mb-2" />
                  <p class="text-gray-400 text-sm">Upload front side</p>
                </div>
              </div>
            </template>
            
            <template v-else>
              <img 
                :src="documents.front" 
                class="w-full h-full object-cover"
                alt="Document front" 
              />
              <button
                @click.stop="removeDocument('front')"
                class="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
              >
                <Icon name="ph:x" class="w-4 h-4 text-white" />
              </button>
            </template>
          </div>
        </div>

        <!-- Back Side -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Back Side
          </label>
          <div
            class="relative border-2 border-dashed border-gray-600 rounded-lg aspect-[3/2] overflow-hidden"
            @dragover.prevent
            @drop.prevent="handleDrop($event, 'back')"
            @click="$refs.backInput.click()"
          >
            <input
              ref="backInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect($event, 'back')"
            />
            
            <template v-if="!documents.back">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <Icon name="ph:identification-card" class="w-12 h-12 text-gray-400 mb-2" />
                  <p class="text-gray-400 text-sm">Upload back side</p>
                </div>
              </div>
            </template>
            
            <template v-else>
              <img 
                :src="documents.back" 
                class="w-full h-full object-cover"
                alt="Document back" 
              />
              <button
                @click.stop="removeDocument('back')"
                class="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
              >
                <Icon name="ph:x" class="w-4 h-4 text-white" />
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Document Guidelines -->
      <div class="mt-4 bg-gray-700 rounded-lg p-4">
        <h4 class="text-sm font-medium text-white mb-2">Guidelines:</h4>
        <ul class="text-sm text-gray-300 space-y-1">
          <li class="flex items-center gap-2">
            <Icon name="ph:check-circle" class="w-4 h-4 text-green-500" />
            Ensure all text is clearly visible
          </li>
          <li class="flex items-center gap-2">
            <Icon name="ph:check-circle" class="w-4 h-4 text-green-500" />
            Document should fill the frame
          </li>
          <li class="flex items-center gap-2">
            <Icon name="ph:check-circle" class="w-4 h-4 text-green-500" />
            No glare or shadows
          </li>
        </ul>
      </div>
    </div>

    <!-- Verification Action -->
    <button
      @click="verifyDocuments"
      :disabled="!canVerify"
      class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
    >
      {{ verifying ? 'Verifying...' : 'Verify Documents' }}
    </button>
  </div>
</template>

<script setup>
const documentTypes = [
  { label: 'Passport', value: 'passport' },
  { label: 'National ID', value: 'national_id' },
  { label: "Driver's License", value: 'drivers_license' }
]

const selectedDocument = ref('')
const documents = reactive({
  front: null,
  back: null
})
const verifying = ref(false)

const canVerify = computed(() => 
  selectedDocument.value && documents.front && documents.back
)

const handleFileSelect = (event, side) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file, side)
  }
}

const handleDrop = (event, side) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file, side)
  }
}

const processFile = (file, side) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    documents[side] = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeDocument = (side) => {
  documents[side] = null
}

const verifyDocuments = async () => {
  verifying.value = true
  try {
    // Mock verification process
    await new Promise(resolve => setTimeout(resolve, 2000))
    emit('verified', {
      documentType: selectedDocument.value,
      documents
    })
  } catch (error) {
    console.error('Document verification failed:', error)
  } finally {
    verifying.value = false
  }
}

const emit = defineEmits(['verified'])
</script>

