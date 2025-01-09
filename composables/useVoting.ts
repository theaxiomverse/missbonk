// composables/useVoting.ts
export const useVoting = () => {
    const { tronWeb, address, canVote } = useTronWeb()
    
    const state = reactive({
      loading: false,
      error: '',
      votes: new Map(),
      lastVoteTime: null
    })
  
    const voteForContestant = async (contestantId) => {
      if (!canVote.value) {
        throw new Error('Insufficient MISSBONK tokens')
      }
  
      try {
        state.loading = true
        
        // Check if already voted in last 24h
        if (hasVotedToday.value) {
          throw new Error('You can only vote once per day')
        }
  
        // Prepare contract interaction
        const contract = await tronWeb.value.contract().at(process.env.VOTING_CONTRACT_ADDRESS)
        
        // Submit vote transaction
        const transaction = await contract.vote(contestantId).send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: true
        })
  
        // Update voting state
        state.lastVoteTime = Date.now()
        state.votes.set(contestantId, (state.votes.get(contestantId) || 0) + 1)
  
        return transaction
      } catch (error) {
        console.error('Voting error:', error)
        throw error
      } finally {
        state.loading = false
      }
    }
  
    const hasVotedToday = computed(() => {
      if (!state.lastVoteTime) return false
      const hoursSinceLastVote = (Date.now() - state.lastVoteTime) / (1000 * 60 * 60)
      return hoursSinceLastVote < 24
    })
  
    const getVoteCount = (contestantId) => {
      return state.votes.get(contestantId) || 0
    }
  
    return {
      ...toRefs(state),
      voteForContestant,
      hasVotedToday,
      getVoteCount
    }
  }