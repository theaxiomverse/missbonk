<template>
    <div class="min-h-screen bg-gray-900">
      <!-- Hero Banner -->
      <section class="relative h-screen">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="/missbonk_concept_banner.png" alt="Miss Bonk 2025" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900" />
        </div>
        
        <!-- Hero Content -->
        <div class="relative container mx-auto px-4 h-full flex items-center">
          <div class="max-w-2xl">
            <h1 class="text-6xl font-bold text-white mb-6">
              Miss Bonk 2025
            </h1>
            <p class="text-2xl text-gray-200 mb-8">
              The Next Evolution of Web3 Beauty
            </p>
            <div class="flex gap-4">
              <NuxtLink 
                to="/apply"
                class="bg-pink-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-pink-600 transition"
              >
                Apply Now
              </NuxtLink>
              <button 
                class="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-700 transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Current Winner -->
      <section class="py-20 bg-gray-800">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-white text-center mb-16">Current Miss Bonk</h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://i.pravatar.cc/600?img=25" 
                alt="Current Miss Bonk"
                class="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-white">Sarah Anderson</h3>
              <p class="text-gray-300">Miss Bonk 2024</p>
              <p class="text-gray-300">
                Sarah has been a pioneering force in bringing Web3 technology to the fashion industry.
                As our current Miss Bonk, she has represented the platform at major blockchain events
                and helped grow our community.
              </p>
              <div class="flex gap-4">
                <a href="#" class="text-pink-500 hover:text-pink-400">
                  <Icon name="uil:instagram" class="w-6 h-6" />
                </a>
                <a href="#" class="text-pink-500 hover:text-pink-400">
                  <Icon name="uil:twitter" class="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Featured Contestants -->
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white mb-4">Current Contestants</h2>
            <p class="text-gray-400">Vote for your favorite contestant and help them win</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ContestantCard 
              v-for="contestant in contestants" 
              :key="contestant.id"
              :contestant="contestant"
              @vote="openVoteModal"
            />
          </div>
        </div>
      </section>
  
      <!-- Prize Pool -->
      <section class="py-20 bg-gray-800">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white mb-4">Prize Pool</h2>
            <p class="text-gray-400">Compete for amazing prizes and opportunities</p>
          </div>
  
          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="prize in prizes" 
                 :key="prize.place"
                 class="bg-gray-700 rounded-xl p-8 text-center">
              <h3 class="text-2xl font-bold text-pink-500 mb-4">{{ prize.place }}</h3>
              <div class="text-3xl font-bold text-white mb-4">{{ prize.amount }}</div>
              <p class="text-gray-300">{{ prize.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  const { contestants } = useContestants()
  
  const prizes = [
    {
      place: '1st Place',
      amount: '50,000 TRX',
      description: 'Plus exclusive NFT and marketing opportunities'
    },
    {
      place: '2nd Place',
      amount: '25,000 TRX',
      description: 'Plus community features and NFT'
    },
    {
      place: '3rd Place',
      amount: '10,000 TRX',
      description: 'Plus commemorative NFT'
    }
  ]
  
  const openVoteModal = (contestant) => {
    // Implement voting modal
    console.log('Vote for:', contestant.name)
  }
  </script>
  
  