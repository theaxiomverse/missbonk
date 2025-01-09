// pages/contact.vue
<template>
  <div class="min-h-screen bg-gray-900 py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8">Contact Us</h1>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Contact Form -->
          <div class="bg-gray-800 rounded-xl p-6">
            <h2 class="text-2xl font-bold text-white mb-6">Send us a message</h2>
            
            <form @submit.prevent="submitContactForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                >
                  <option value="">Select a subject</option>
                  <option v-for="subject in subjects" 
                          :key="subject"
                          :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div v-for="info in contactInfo" 
                 :key="info.title"
                 class="bg-gray-800 rounded-xl p-6">
              <div class="flex items-center gap-4">
                <Icon :name="info.icon" class="w-8 h-8 text-pink-500" />
                <div>
                  <h3 class="text-xl font-bold text-white">{{ info.title }}</h3>
                  <p class="text-gray-300">{{ info.content }}</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a v-for="social in socialLinks" 
                   :key="social.name"
                   :href="social.url"
                   target="_blank"
                   class="text-gray-400 hover:text-pink-500">
                  <Icon :name="social.icon" class="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const subjects = [
  'General Inquiry',
  'Application Support',
  'Technical Support',
  'Partnership Inquiry'
]

const contactInfo = [
  {
    icon: 'ph:envelope',
    title: 'Email Us',
    content: 'contact@missbonk.io'
  },
  {
    icon: 'ph:telegram-logo',
    title: 'Telegram',
    content: '@MissBonkOfficial'
  }
]

const socialLinks = [
  {
    name: 'Twitter',
    icon: 'uil:twitter',
    url: '#'
  },
  {
    name: 'Instagram',
    icon: 'uil:instagram',
    url: '#'
  },
  {
    name: 'Telegram',
    icon: 'uil:telegram',
    url: '#'
  }
]

const submitContactForm = async () => {
  try {
    // Implement form submission
    console.log('Form submitted:', form)
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>