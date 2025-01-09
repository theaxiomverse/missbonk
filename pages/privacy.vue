<template>
    <div class="min-h-screen bg-gray-900 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div class="prose prose-invert max-w-none space-y-8">
            <div v-for="(section, index) in privacyPolicy" 
                 :key="index"
                 class="bg-gray-800 rounded-xl p-6">
              <h2 class="text-2xl font-bold text-white mb-4">{{ section.title }}</h2>
              <p class="text-gray-300">{{ section.content }}</p>
              
              <ul v-if="section.items" class="mt-4 space-y-2">
                <li v-for="(item, idx) in section.items" 
                    :key="idx"
                    class="flex items-start gap-2">
                  <Icon name="ph:dot" class="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                  <span class="text-gray-300">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const privacyPolicy = [
    {
      title: 'Data Collection',
      content: 'We collect information necessary for pageant participation.',
      items: [
        'Personal identification information',
        'Social media handles and content',
        'Photos and media submissions',
        'Wallet addresses and transaction data'
      ]
    },
    // Add more sections...
  ]
  </script>