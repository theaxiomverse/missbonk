// components/ApplicationForm.vue
<template>
  <div class="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6">
    <h2 class="text-2xl font-bold mb-6">Apply as a Contestant</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Country
        </label>
        <input
          v-model="form.country"
          type="text"
          required
          class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          placeholder="Enter your country"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Age
        </label>
        <input
          v-model="form.age"
          type="number"
          required
          min="18"
          class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          placeholder="Enter your age"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Social Media Links
        </label>
        <input
          v-model="form.instagram"
          type="text"
          required
          class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white mb-2"
          placeholder="Instagram username"
        />
        <input
          v-model="form.twitter"
          type="text"
          required
          class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          placeholder="Twitter username"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Profile Photo
        </label>
        <div
          class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="$refs.fileInput.click()"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />
          <Icon name="ph:camera" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-gray-400">Drag and drop or click to upload</p>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
      >
        Submit Application
      </button>
    </form>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  country: '',
  age: null,
  instagram: '',
  x: '',
  photo: null
})

const handleSubmit = () => {
  // Implement form submission
  console.log('Form submitted:', form)
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.photo = file
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    form.photo = file
  }
}
</script>