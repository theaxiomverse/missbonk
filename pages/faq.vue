// pages/faq.vue
<template>
  <div class="min-h-screen bg-gray-900 py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>
        
        <div class="space-y-4">
          <div v-for="(category, index) in faqCategories" :key="index">
            <h2 class="text-2xl font-bold text-white mb-4">{{ category.title }}</h2>
            
            <div class="space-y-4">
              <div v-for="faq in category.items" 
                   :key="faq.question"
                   class="bg-gray-800 rounded-xl">
                <button
                  class="w-full text-left p-6 focus:outline-none"
                  @click="faq.isOpen = !faq.isOpen"
                >
                  <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-white">{{ faq.question }}</h3>
                    <Icon
                      :name="faq.isOpen ? 'ph:minus-circle' : 'ph:plus-circle'"
                      class="w-6 h-6 text-pink-500"
                    />
                  </div>
                </button>
                <div v-show="faq.isOpen" class="px-6 pb-6">
                  <p class="text-gray-300">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqCategories = reactive([
  {
    title: 'General Questions',
    items: [
      {
        question: 'What is Miss Bonk?',
        answer: 'Miss Bonk is the first Web3-native beauty pageant platform...',
        isOpen: false
      },
      // Add more FAQs
    ]
  },
  {
    title: 'Application Process',
    items: [
      {
        question: 'How do I apply?',
        answer: 'To apply, you need to hold 1000 MISSBONK tokens...',
        isOpen: false
      },
      // Add more FAQs
    ]
  },
  {
    title: 'Voting & Rewards',
    items: [
      {
        question: 'How does voting work?',
        answer: 'Voting is conducted through our smart contract...',
        isOpen: false
      },
      // Add more FAQs
    ]
  }
])
</script>