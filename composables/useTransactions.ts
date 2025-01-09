// composables/useTransactions.ts
export const useTransactions = () => {
    const wallet = useWallet()
  
    const state = reactive({
      transactions: [],
      loading: false,
      error: ''
    })
  
    // Send MISSBONK tokens
    const sendTokens = async (to: string, amount: number) => {
      try {
        state.loading = true
        state.error = ''
  
        if(!wallet.tronWeb.value) {
            throw new Error('TronWeb is not initialized')
        }
        
        const contract = await wallet.tronWeb.value.contract().at(wallet.MISSBONK_CONTRACT)
        
        // Convert amount to token decimals
        const tokenAmount = amount * 1_000_000
  
        const transaction = await contract.transfer(to, tokenAmount).send({
          feeLimit: 100_000_000
        })
  
        await wallet.refreshBalances()
        return transaction
      } catch (error) {
        state.error = error.message
        throw error
      } finally {
        state.loading = false
      }
    }
  
    // Get transaction history
    const getTransactionHistory = async () => {
      try {
        state.loading = true
        const transactions = await wallet.tronWeb.value.trx.getTransactionsList(wallet.address.value)
        state.transactions = transactions
          .filter(tx => tx.raw_data.contract[0].type === 'TriggerSmartContract')
          .map(formatTransaction)
      } catch (error) {
        state.error = 'Failed to load transaction history'
      } finally {
        state.loading = false
      }
    }
  
    const formatTransaction = (tx) => ({
      hash: tx.txID,
      timestamp: tx.raw_data.timestamp,
      from: tx.raw_data.contract[0].parameter.value.owner_address,
      to: tx.raw_data.contract[0].parameter.value.to_address,
      value: tx.raw_data.contract[0].parameter.value.amount / 1_000_000,
      status: tx.ret[0].contractRet
    })
  
    return {
      ...toRefs(state),
      sendTokens,
      getTransactionHistory
    }
  }