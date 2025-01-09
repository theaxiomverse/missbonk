'use client'

export const useWallet = () => {
    const MISSBONK_CONTRACT = 'TQrJT9bYvX5w2U8BDCXTCk3Jj23dQ2XSpC'
    
    const state = reactive({
      tronWeb: null,
      address: '',
      balance: {
        trx: 0,
        missbonk: 0
      },
      transactions: [],
      connected: false,
      loading: false,
      error: ''
    })
  
    // Connect wallet
    const connect = async () => {
      try {
        state.loading = true
        state.error = ''
  
        if (!window.tronWeb) {
          throw new Error('Please install TronLink wallet')
        }
  
        // Wait for TronLink to be ready
        let tries = 0
        while (!window.tronWeb.ready && tries < 10) {
          await new Promise(r => setTimeout(r, 500))
          tries++
        }
  
        if (!window.tronWeb.ready) {
          throw new Error('TronLink not ready')
        }
  
        state.tronWeb = window.tronWeb
        state.address = window.tronWeb.defaultAddress.base58
        state.connected = true
  
        // Get initial balances
        await refreshBalances()
  
        // Set up event listeners
        window.addEventListener('message', handleTronLinkMessage)
        
        return true
      } catch (error: any) {
        state.error = error.message
        return false
      } finally {
        state.loading = false
      }
    }
  
    // Handle TronLink events
    const handleTronLinkMessage = async (e) => {
      if (e.data.message && e.data.message.action === "connectWeb") {
        await refreshBalances()
      }
      if (e.data.message && e.data.message.action === "accountsChanged") {
        if(window) {
        state.address = window.tronWeb.defaultAddress.base58
        }
        await refreshBalances()
      }
    }
  
    // Get balances
    const refreshBalances = async () => {
      try {
        // Get TRX balance
        const trxBalance = await state.tronWeb.trx.getBalance(state.address)
        state.balance.trx = trxBalance / 1_000_000 // Convert from SUN to TRX
  
        // Get MISSBONK balance
        const contract = await state.tronWeb.contract().at(MISSBONK_CONTRACT)
        const tokenBalance = await contract.balanceOf(state.address).call()
        state.balance.missbonk = parseInt(tokenBalance.toString()) / 1_000_000
      } catch (error) {
        console.error('Error refreshing balances:', error)
      }
    }
  
    // Format address for display
    const formatAddress = (address: string) => {
      if (!address) return ''
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
  
    return {
      ...toRefs(state),
      connect,
      refreshBalances,
      formatAddress
    }
  }