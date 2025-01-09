// components/voting/VoteModal.vue
<template>
  <BaseModal v-model="isOpen" :title="`Vote for ${contestant?.name}`">
    <div class="space-y-4 text-center">
      <p class="text-gray-300">You need minimum 1000 MISSBONK tokens to vote.</p>
      <p class="text-gray-300">Your vote cannot be changed once submitted.</p>

      <div class="flex gap-4 mt-6">
        <button
          @click="$emit('close')"
          class="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          @click="submitVote"
          :disabled="voting || !canVote"
          class="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-50"
        >
          {{ voting ? 'Voting...' : 'Confirm Vote' }}
        </button>
      </div>

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
const props = defineProps({
  contestant: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const { missbonkBalance } = useTronWeb()
const canVote = computed(() => (missbonkBalance.value || 0) >= 1000)

const emit = defineEmits(['update:modelValue', 'vote', 'close'])
const voting = ref(false)
const error = ref('')

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const submitVote = async () => {
  if (!props.contestant || !canVote.value) return
  
  voting.value = true
  error.value = ''

  try {
    // Mock vote submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Emit success
    emit('vote', props.contestant)
    isOpen.value = false
  } catch (e) {
    error.value = 'Voting failed. Please try again.'
  } finally {
    voting.value = false
  }
}
</script>