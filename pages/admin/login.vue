// pages/admin/login.vue
<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">Miss Bonk Admin</h1>
        <p class="text-gray-400 mt-2">Login to manage the pageant</p>
      </div>

      <div class="bg-gray-800 rounded-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login } = useAdminAuth()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const success = await login(form)
    if (success) {
      navigateTo('/admin')
    } else {
      error.value = 'Invalid credentials'
    }
  } catch (e) {
    error.value = 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
