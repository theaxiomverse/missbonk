<template>
    <div>
      <div v-if="walletState.connected" class="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div>
            <div class="text-sm text-gray-400">MISSBONK</div>
            <div class="font-bold text-white">
              {{ formatNumber(walletState.missbonkBalance) }}
            </div>
          </div>
          
          <div class="px-4 py-2 bg-gray-700 rounded-lg">
            <div class="text-sm text-gray-400">Address</div>
            <div class="text-white font-mono">{{ formatAddress(walletState.address) }}</div>
          </div>
        </div>
  
        <button 
          @click="disconnectWallet"
          class="text-gray-400 hover:text-white"
        >
          <Icon name="ph:power" class="w-6 h-6" />
        </button>
      </div>
  
      <button
        v-else
        @click="connectWallet"
        :disabled="walletState.loading"
        class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
      >
        {{ walletState.loading ? 'Connecting...' : 'Connect Wallet' }}
      </button>
  
      <div v-if="walletState.error" class="mt-2 text-red-500 text-sm">
        {{ walletState.error }}
      </div>
    </div>
  </template>
  
  <script setup>
  const {
    connected: walletConnected,
    loading: walletLoading,
    error: walletError,
    address: walletAddress,
    missbonkBalance,
    connectWallet,
    disconnectWallet,
    formatAddress
  } = useTronWeb()
  
  const walletState = reactive({
    connected: walletConnected,
    loading: walletLoading,
    error: walletError,
    address: walletAddress,
    missbonkBalance: missbonkBalance
  })
  
  watch(
    [walletConnected, walletLoading, walletError, walletAddress, missbonkBalance],
    ([connected, loading, error, address, balance]) => {
      walletState.connected = connected
      walletState.loading = loading
      walletState.error = error
      walletState.address = address
      walletState.missbonkBalance = balance
    }
  )
  
  const formatNumber = (num) => {
    if (!num) return '0'
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num)
  }
  </script>