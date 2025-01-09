// composables/useAdminAuth.ts
export const useAdminAuth = () => {
    const isAuthenticated = ref(false)
    const adminUser = ref(null)
  
    const checkAdminAuth = async () => {
      // In production, this would check against your backend
      const token = useCookie('admin_token')
      return !!token.value
    }
  
    const login = async (credentials) => {
      try {
        // Mock login - replace with actual API call
        const response = await $fetch('/api/admin/login', {
          method: 'POST',
          body: credentials
        })
  
        if (response.token) {
          const token = useCookie('admin_token')
          token.value = response.token
          isAuthenticated.value = true
          adminUser.value = response.user
          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    }
  
    const logout = () => {
      const token = useCookie('admin_token')
      token.value = null
      isAuthenticated.value = false
      adminUser.value = null
      navigateTo('/admin/login')
    }
  
    return {
      isAuthenticated,
      adminUser,
      checkAdminAuth,
      login,
      logout
    }
  }