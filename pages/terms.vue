// pages/terms.vue
<template>
  <div class="min-h-screen bg-gray-900 py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        
        <div class="prose prose-invert max-w-none">
          <div v-for="(section, index) in terms" 
               :key="index"
               class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">{{ section.title }}</h2>
            <div class="bg-gray-800 rounded-xl p-6">
              <div v-for="(item, idx) in section.items" 
                   :key="idx"
                   class="mb-4 last:mb-0">
                <h3 class="font-bold text-white mb-2">{{ item.title }}</h3>
                <p class="text-gray-300">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-pink-500/20 border border-pink-500 rounded-xl">
          <p class="text-white">
            By participating in the Miss Bonk pageant, you agree to all terms and conditions listed above.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const terms = [
  {
    title: 'Eligibility',
    items: [
      {
        title: 'Age Requirement',
        content: 'Participants must be 18 years or older at the time of application.'
      },
      {
        title: 'Token Holding',
        content: 'Must maintain a minimum balance of 1000 MISSBONK tokens throughout the competition.'
      },
      {
        title: 'Verification',
        content: 'Must complete identity and social media verification processes.'
      }
    ]
  },
  {
    title: 'Participation Rules',
    items: [
      {
        title: 'Content Guidelines',
        content: 'All submitted content must be original and appropriate for general audiences.'
      },
      {
        title: 'Social Media',
        content: 'Participants must maintain active and appropriate social media presence.'
      }
    ]
  },
  // Add more sections...
]
</script>