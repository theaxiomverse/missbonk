// components/WalletConnect.vue
<template>
  <div>
    <button
      v-if="!connected"
      @click="connect"
      :disabled="loading"
      class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
    >
      {{ loading ? 'Connecting...' : 'Connect Wallet' }}
    </button>

    <div v-else class="flex items-center gap-4">
      <div class="bg-gray-800 rounded-lg px-4 py-2">
        <div class="text-sm text-gray-400">MISSBONK Balance</div>
        <div class="font-bold text-white">{{ balance.missbonk.toLocaleString() }}</div>
      </div>

      <div class="bg-gray-800 rounded-lg px-4 py-2">
        <div class="text-sm text-gray-400">TRX Balance</div>
        <div class="font-bold text-white">{{ balance.trx.toLocaleString() }}</div>
      </div>

      <div class="bg-gray-800 rounded-lg px-4 py-2">
        <div class="text-sm text-gray-400">Address</div>
        <div class="font-bold text-white">{{ formatAddress(address) }}</div>
      </div>
    </div>

    <div v-if="error" class="mt-2 text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const { 
  connected, 
  loading, 
  error, 
  balance, 
  address,
  connect,
  formatAddress
} = useWallet()
</script>