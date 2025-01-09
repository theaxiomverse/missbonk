// layouts/default.vue
<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm fixed w-full z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-pink-500">MISS BONK</span>
          </NuxtLink>

          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.path"
              :to="link.path"
              class="text-gray-300 hover:text-pink-500"
            >
              {{ link.name }}
            </NuxtLink>
          </div>

          <!-- Wallet Connection -->
          <TronConnect />

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-gray-300 hover:text-white"
          >
            <Icon 
              :name="mobileMenuOpen ? 'ph:x' : 'ph:list'" 
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen"
      class="md:hidden fixed inset-0 z-40 bg-gray-900"
    >
      <div class="pt-20 p-4">
        <div class="space-y-4">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="block text-gray-300 hover:text-pink-500 py-2"
            @click="mobileMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 mt-20">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Miss Bonk</h3>
            <p class="text-gray-400">The Web3 Beauty Pageant Revolution</p>
            <!-- Social Links -->
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-pink-500">
                <Icon name="uil:twitter" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-pink-500">
                <Icon name="uil:telegram" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-pink-500">
                <Icon name="uil:discord" class="w-6 h-6" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold text-white mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.path">
                <NuxtLink :to="link.path" class="text-gray-400 hover:text-pink-500">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-bold text-white mb-4">Resources</h4>
            <ul class="space-y-2">
              <li>
                <a 
                  :href="`https://tronscan.org/#/contract/${MISSBONK_CONTRACT}`"
                  target="_blank"
                  class="text-gray-400 hover:text-pink-500"
                >
                  Token Contract
                </a>
              </li>
              <li>
                <NuxtLink to="/rules" class="text-gray-400 hover:text-pink-500">
                  Rules & Guidelines
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/terms" class="text-gray-400 hover:text-pink-500">
                  Terms & Conditions
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="font-bold text-white mb-4">Stay Updated</h4>
            <ClientOnly>
              <form @submit.prevent="subscribeNewsletter" class="space-y-4">
                <input
                  v-model="newsletter.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <button
                  type="submit"
                  class="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                >
                  Subscribe
                </button>
              </form>
            </ClientOnly>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Miss Bonk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const MISSBONK_CONTRACT = 'TQrJT9bYvX5w2U8BDCXTCk3Jj23dQ2XSpC'
const mobileMenuOpen = ref(false)
const newsletter = reactive({
  email: ''
})

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Contestants', path: '/contestants' },
  { name: 'Apply', path: '/apply' },
  { name: 'Vote', path: '/vote' },
  { name: 'About', path: '/about' }
]

const subscribeNewsletter = async () => {
  // Implement newsletter subscription
  console.log('Subscribe:', newsletter.email)
  newsletter.email = ''
}

// Close mobile menu on route change
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})

// Prevent scrolling when mobile menu is open
watch(mobileMenuOpen, (value) => {
  if (process.client) {
    document.body.style.overflow = value ? 'hidden' : ''
  }
})
</script>