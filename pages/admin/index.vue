<template>
    <div class="min-h-screen bg-gray-900">
      <!-- Admin Navigation -->
      <nav class="bg-gray-800 border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <h1 class="text-xl font-bold text-white">Miss Bonk Admin</h1>
            <div class="flex items-center gap-4">
              <NuxtLink 
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="text-gray-300 hover:text-pink-500"
              >
                {{ item.name }}
              </NuxtLink>
              <button class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Dashboard Content -->
      <div class="container mx-auto px-4 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" 
               :key="stat.title"
               class="bg-gray-800 rounded-xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400">{{ stat.title }}</p>
                <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
              </div>
              <Icon :name="stat.icon" class="w-8 h-8 text-pink-500" />
            </div>
          </div>
        </div>
  
        <!-- Recent Applications -->
        <div class="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 class="text-xl font-bold text-white mb-6">Recent Applications</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left">
                  <th class="pb-4 text-gray-400">Name</th>
                  <th class="pb-4 text-gray-400">Country</th>
                  <th class="pb-4 text-gray-400">Status</th>
                  <th class="pb-4 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="application in recentApplications" 
                    :key="application.id"
                    class="text-white">
                  <td class="py-4">{{ application.name }}</td>
                  <td class="py-4">{{ application.country }}</td>
                  <td class="py-4">
                    <span :class="{
                      'bg-yellow-500/20 text-yellow-500': application.status === 'pending',
                      'bg-green-500/20 text-green-500': application.status === 'approved',
                      'bg-red-500/20 text-red-500': application.status === 'rejected'
                    }" class="px-2 py-1 rounded-full text-sm">
                      {{ application.status }}
                    </span>
                  </td>
                  <td class="py-4">
                    <div class="flex items-center gap-2">
                      <button class="text-pink-500 hover:text-pink-400">
                        <Icon name="ph:eye" class="w-5 h-5" />
                      </button>
                      <button class="text-green-500 hover:text-green-400">
                        <Icon name="ph:check" class="w-5 h-5" />
                      </button>
                      <button class="text-red-500 hover:text-red-400">
                        <Icon name="ph:x" class="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Recent Activity -->
        <div class="bg-gray-800 rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" 
                 :key="activity.id"
                 class="flex items-start gap-4">
              <div :class="{
                'bg-green-500': activity.type === 'approval',
                'bg-yellow-500': activity.type === 'application',
                'bg-blue-500': activity.type === 'vote'
              }" class="w-8 h-8 rounded-full flex items-center justify-center">
                <Icon :name="activity.icon" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-white">{{ activity.message }}</p>
                <p class="text-sm text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Add navigation guard for admin authentication
  definePageMeta({
   // middleware: 'admin'
  })
  
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Applications', path: '/admin/applications' },
    { name: 'Contestants', path: '/admin/contestants' },
    { name: 'Settings', path: '/admin/settings' }
  ]
  
  const stats = [
    {
      title: 'Total Applications',
      value: '156',
      icon: 'ph:users'
    },
    {
      title: 'Pending Review',
      value: '23',
      icon: 'ph:clock'
    },
    {
      title: 'Total Votes',
      value: '45.2K',
      icon: 'ph:heart'
    },
    {
      title: 'Active Contestants',
      value: '48',
      icon: 'ph:crown'
    }
  ]
  
  const recentApplications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      country: 'USA',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      country: 'Spain',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      country: 'Singapore',
      status: 'rejected'
    }
  ]
  
  const recentActivity = [
    {
      id: 1,
      type: 'approval',
      icon: 'ph:check',
      message: 'Application approved for Maria Garcia',
      time: '5 minutes ago'
    }];
    </script>