<template>
    <div class="space-y-4">
      <div
        class="relative border-2 border-dashed border-gray-600 rounded-lg p-8"
        :class="{ 'border-pink-500': isDragging }"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()"
      >
        <input
          ref="fileInput"
          type="file"
          :accept="accept"
          class="hidden"
          @change="handleFileSelect"
          :multiple="multiple"
        />
        
        <div v-if="!preview.length" class="text-center">
          <Icon :name="icon" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-gray-400">{{ placeholder }}</p>
        </div>
  
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(image, index) in preview" 
               :key="index"
               class="relative aspect-square">
            <img
              :src="image"
              class="w-full h-full object-cover rounded-lg"
              alt="Preview"
            />
            <button
              @click.stop="removeImage(index)"
              class="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
            >
              <Icon name="ph:x" class="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
  
        <div v-if="error" class="absolute -bottom-6 left-0 text-sm text-red-500">
          {{ error }}
        </div>
      </div>
  
      <div v-if="preview.length" class="text-sm text-gray-400">
        Click or drag to add more photos
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    icon: {
      type: String,
      default: 'ph:camera'
    },
    placeholder: {
      type: String,
      default: 'Drag and drop or click to upload'
    }
  })
  
  const emit = defineEmits(['update:files', 'error'])
  
  const isDragging = ref(false)
  const preview = ref([])
  const error = ref('')
  
  const handleFileSelect = (event) => {
    processFiles(Array.from(event.target.files))
  }
  
  const handleDrop = (event) => {
    isDragging.value = false
    processFiles(Array.from(event.dataTransfer.files))
  }
  
  const processFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (!imageFiles.length) {
      error.value = 'Please upload image files only'
      return
    }
  
    if (preview.value.length + imageFiles.length > props.maxFiles) {
      error.value = `Maximum ${props.maxFiles} files allowed`
      return
    }
  
    imageFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        preview.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  
    error.value = ''
    emit('update:files', props.multiple ? imageFiles : imageFiles[0])
  }
  
  const removeImage = (index) => {
    preview.value.splice(index, 1)
    emit('update:files', null)
  }
  </script>