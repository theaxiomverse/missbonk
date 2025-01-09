// composables/useBondingCurve.ts
export const useBondingCurve = () => {
    // Constants for curve calculation
    const BASE_VOTE_COST = 1000 // Base cost in MISSBONK tokens
    const RANK_MULTIPLIER = 0.8 // Lower ranks get a discount
    const VOTE_POWER = 1.2 // Exponential growth factor
  
    // Calculate vote cost based on current votes and rank
    const calculateVoteCost = (currentVotes: number, rank: number) => {
      // Base cost increases exponentially with number of votes
      const votePower = Math.pow(currentVotes, VOTE_POWER) / 1000
      const baseCost = BASE_VOTE_COST * (1 + votePower)
      
      // Apply rank multiplier (lower ranks = lower cost)
      const rankFactor = Math.pow(RANK_MULTIPLIER, rank - 1)
      
      // Calculate final cost
      const finalCost = baseCost * rankFactor
  
      return Math.ceil(finalCost)
    }
  
    // Calculate next vote costs for price prediction
    const getNextVoteCosts = (currentVotes: number, rank: number, steps: number = 5) => {
      return Array.from({ length: steps }, (_, i) => ({
        votes: currentVotes + i + 1,
        cost: calculateVoteCost(currentVotes + i + 1, rank)
      }))
    }
  
    return {
      calculateVoteCost,
      getNextVoteCosts
    }
  }