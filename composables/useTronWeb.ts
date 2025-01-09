// composables/useTronWeb.ts
export const useTronWeb = () => {
    const TRON_FULL_NODE = 'https://api.trongrid.io'
    const TRON_SOLIDITY_NODE = 'https://api.trongrid.io'
    const TRON_EVENT_SERVER = 'https://api.trongrid.io'
    const MISSBONK_CONTRACT = 'TQrJT9bYvX5w2U8BDCXTCk3Jj23dQ2XSpC'
    const DECIMALS = 6
  
    const state = reactive({
      tronWeb: null,
      address: '',
      missbonkBalance: 0,
      connected: false,
      loading: false,
      error: '',
      network: 'mainnet'
    })

    const abi = [{"inputs":[{"name":"name","internalType":"string","type":"string"},{"name":"symbol","internalType":"string","type":"string"},{"name":"totalSupply","internalType":"uint256","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"indexed":true,"name":"owner","internalType":"address","type":"address"},{"indexed":true,"name":"spender","internalType":"address","type":"address"},{"indexed":false,"name":"value","internalType":"uint256","type":"uint256"}],"name":"Approval","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"previousOwner","internalType":"address","type":"address"},{"indexed":true,"name":"newOwner","internalType":"address","type":"address"}],"name":"OwnershipTransferred","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"from","internalType":"address","type":"address"},{"indexed":true,"name":"to","internalType":"address","type":"address"},{"indexed":false,"name":"value","internalType":"uint256","type":"uint256"}],"name":"Transfer","anonymous":false,"type":"event"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"MODE_NORMAL","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"MODE_TRANSFER_CONTROLLED","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"MODE_TRANSFER_RESTRICTED","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"_mode","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"owner","internalType":"address","type":"address"},{"name":"spender","internalType":"address","type":"address"}],"name":"allowance","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"spender","internalType":"address","type":"address"},{"name":"amount","internalType":"uint256","type":"uint256"}],"name":"approve","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"account","internalType":"address","type":"address"}],"name":"balanceOf","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint8","type":"uint8"}],"inputs":[],"name":"decimals","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"spender","internalType":"address","type":"address"},{"name":"subtractedValue","internalType":"uint256","type":"uint256"}],"name":"decreaseAllowance","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"spender","internalType":"address","type":"address"},{"name":"addedValue","internalType":"uint256","type":"uint256"}],"name":"increaseAllowance","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"string","type":"string"}],"inputs":[],"name":"name","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"address","type":"address"}],"inputs":[],"name":"owner","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[],"name":"renounceOwnership","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"v","internalType":"uint256","type":"uint256"}],"name":"setMode","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"string","type":"string"}],"inputs":[],"name":"symbol","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"totalSupply","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"to","internalType":"address","type":"address"},{"name":"amount","internalType":"uint256","type":"uint256"}],"name":"transfer","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"from","internalType":"address","type":"address"},{"name":"to","internalType":"address","type":"address"},{"name":"amount","internalType":"uint256","type":"uint256"}],"name":"transferFrom","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"newOwner","internalType":"address","type":"address"}],"name":"transferOwnership","stateMutability":"nonpayable","type":"function"}];
  
    const initTronWeb = () => {
      try {
        // Create TronWeb instance if not using wallet
        if (typeof window.tronWeb === 'undefined') {
          const tronWeb = new TronWeb({
            fullHost: TRON_FULL_NODE
          })
          window.tronWeb = tronWeb
          console.log('TronWeb initialized with RPC')
        }
      } catch (error) {
        console.error('TronWeb initialization error:', error)
        state.error = 'Failed to initialize TronWeb'
      }
    }
  
    const connectWallet = async () => {
      try {
        state.loading = true
        state.error = ''
  
        // Initialize TronWeb if needed
        initTronWeb()
  
        // Wait for TronLink to be ready
        let tries = 0
        const maxTries = 10
        while (!window.tronWeb?.ready && tries < maxTries) {
          await new Promise(r => setTimeout(r, 500))
          tries++
        }
  
        if (!window.tronWeb?.ready) {
          throw new Error('Please unlock your TronLink wallet')
        }
  
        // Check if we're on the right network
        const currentNetwork = window.tronWeb.fullNode.host
        console.log('Connected to network:', currentNetwork)
  
        // Store TronWeb instance and address
        state.tronWeb = window.tronWeb
        state.address = window.tronWeb.defaultAddress.base58
        state.connected = true
  
        console.log('Connected to wallet:', state.address)
  
        // Get initial balance
        await updateBalance()
        setupEventListeners()
  
      } catch (error) {
        console.error('Wallet connection error:', error)
        state.error = error.message
        state.connected = false
      } finally {
        state.loading = false
      }
    }
  
    const updateBalance = async () => {
      try {
        if (!state.connected || !state.tronWeb) {
          console.log('Not connected, skipping balance update')
          return
        }
  
        // Get contract instance
     //   const contract = await state.tronWeb.contract().at(MISSBONK_CONTRACT)
      //  console.log('Contract initialized')

        const contract = await state.tronWeb.contract(abi, state.tronWeb.address.toHex(MISSBONK_CONTRACT))
  
        // Call balanceOf with the hex address
        const hexAddress = state.tronWeb.address.toHex(state.address)
        console.log('Hex address:', hexAddress)
        const balance = await contract.balanceOf(hexAddress).call()
        console.log('Raw balance:', balance.toString())
  
        // Convert balance
        state.missbonkBalance = parseFloat(balance.toString()) / Math.pow(10, 18)
        console.log('Formatted balance:', state.missbonkBalance)
  
      } catch (error) {
        console.error('Balance update error:', error)
        state.error = 'Failed to get token balance: ' + error.message
      }
    }

    
  
    const setupEventListeners = () => {
      if (typeof window === 'undefined') return
  
      const handleMessage = async (e) => {
        if (e.data.message) {
          const { message } = e.data
          console.log('TronLink message:', message)
  
          switch (message.action) {
            case 'connectWeb':
              state.connected = true
              state.address = window.tronWeb.defaultAddress.base58
              await updateBalance()
              break
  
            case 'accountsChanged':
              state.address = window.tronWeb.defaultAddress.base58
              await updateBalance()
              break
  
            case 'disconnect':
              disconnectWallet()
              break
  
            case 'setNode':
              await updateBalance()
              break
          }
        }
      }
  
      window.addEventListener('message', handleMessage)
      onUnmounted(() => {
        window.removeEventListener('message', handleMessage)
      })
    }
  
    const disconnectWallet = () => {
      state.connected = false
      state.address = ''
      state.missbonkBalance = 0
      state.tronWeb = null
      state.error = ''
    }
  
    const formatAddress = (address) => {
      if (!address) return ''
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
  
    // Move the lifecycle hooks inside a component setup
    const initialize = () => {
      if (process.client) {
        const checkTronWeb = setInterval(() => {
          if (window.tronWeb && window.tronWeb.ready) {
            state.tronWeb = window.tronWeb
            clearInterval(checkTronWeb)
            connectWallet()
          }
        }, 1000)

        // Clean up interval
        onUnmounted(() => {
          clearInterval(checkTronWeb)
        })
      }
    }

    // Call initialize when the composable is used in a component
    if (process.client) {
      initialize()
    }

    return {
      ...toRefs(state),
      connectWallet,
      disconnectWallet,
      updateBalance,
      formatAddress
    }
  }