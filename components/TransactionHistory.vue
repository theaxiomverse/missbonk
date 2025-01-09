// components/TransactionHistory.vue
<template>
  <div class="space-y-4">
    <h3 class="text-xl font-bold text-white mb-4">Transaction History</h3>

    <div class="bg-gray-800 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="p-4 text-gray-400">Transaction</th>
              <th class="p-4 text-gray-400">Type</th>
              <th class="p-4 text-gray-400">Amount</th>
              <th class="p-4 text-gray-400">Status</th>
              <th class="p-4 text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="tx in transactions" :key="tx.hash" class="hover:bg-gray-700">
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <Icon 
                    :name="getTxIcon(tx.type)"
                    :class="getTxIconColor(tx.type)"
                    class="w-5 h-5"
                  />
                  <a 
                    :href="getTxExplorerLink(tx.hash)"
                    target="_blank"
                    class="text-pink-500 hover:underline"
                  >
                    {{ formatTxHash(tx.hash) }}
                  </a>
                </div>
              </td>
              <td class="p-4">
                <span class="capitalize text-white">{{ tx.type }}</span>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-1">
                  <span class="text-white">{{ formatAmount(tx.value) }}</span>
                  <span class="text-gray-400">{{ tx.token }}</span>
                </div>
              </td>
              <td class="p-4">
                <span :class="[
                  'px-2 py-1 rounded-full text-sm',
                  getStatusColor(tx.status)
                ]">
                  {{ tx.status }}
                </span>
              </td>
              <td class="p-4 text-gray-400">
                {{ formatDate(tx.timestamp) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
    </div>

    <div v-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const { transactions, loading, error } = useTransactions()

const formatTxHash = (hash) => {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

const getTxIcon = (type) => {
  const icons = {
    'send': 'ph:arrow-up-right',
    'receive': 'ph:arrow-down-left',
    'vote': 'ph:heart',
    'contract': 'ph:file-contract'
  }
  return icons[type] || 'ph:question'
}

const getTxIconColor = (type) => {
  const colors = {
    'send': 'text-red-500',
    'receive': 'text-green-500',
    'vote': 'text-pink-500',
    'contract': 'text-blue-500'
  }
  return colors[type] || 'text-gray-500'
}

const getStatusColor = (status) => {
  const colors = {
    'success': 'bg-green-500/20 text-green-500',
    'pending': 'bg-yellow-500/20 text-yellow-500',
    'failed': 'bg-red-500/20 text-red-500'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-500'
}

const getTxExplorerLink = (hash) => {
  return `https://tronscan.org/#/transaction/${hash}`
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const formatAmount = (value) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  })
}

// Load transaction history on mount
onMounted(async () => {
  await getTransactionHistory()
})
</script>