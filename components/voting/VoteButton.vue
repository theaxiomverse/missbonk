// components/voting/VoteButton.vue
<template>
  <div>
    <button
      @click="handleVote"
      :disabled="loading || !canVote || hasVotedToday"
      class="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
    >
      {{ buttonText }}
    </button>

    <div v-if="error" class="mt-2 text-red-500 text-sm">
      {{ error }}
    </div>

    <div v-if="!canVote" class="mt-2 text-sm text-gray-400">
      Minimum 1000 MISSBONK required to vote
    </div>

    <div v-if="hasVotedToday" class="mt-2 text-sm text-gray-400">
      You can vote again in {{ timeUntilNextVote }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  contestantId: {
    type: Number,
    required: true
  }
})

const { canVote } = useTronWeb()
const { loading, error, voteForContestant, hasVotedToday } = useVoting()

const buttonText = computed(() => {
  if (loading.value) return 'Voting...'
  if (!canVote.value) return 'Insufficient Tokens'
  if (hasVotedToday.value) return 'Already Voted'
  return 'Vote'
})

const timeUntilNextVote = computed(() => {
  // Calculate time remaining until next vote
  const now = Date.now()
  const nextVoteTime = lastVoteTime.value + (24 * 60 * 60 * 1000)
  const diff = nextVoteTime - now

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
})

const handleVote = async () => {
  try {
    const tx = await voteForContestant(props.contestantId)
    emit('voted', tx)
  } catch (e) {
    error.value = e.message
  }
}

const emit = defineEmits(['voted'])
</script>

