// middleware/admin.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { checkAdminAuth } = useAdminAuth()
    const isAuthenticated = await checkAdminAuth()
  
    if (!isAuthenticated && to.path.startsWith('/admin')) {
      return navigateTo('/admin/login')
    }
  })