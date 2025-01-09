// components/BaseModal.vue
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        @click="close"
      >
        <div
          class="bg-gray-800 rounded-xl p-6 max-w-2xl w-full"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            <button
              @click="close"
              class="text-gray-400 hover:text-white"
            >
              <Icon name="ph:x" class="w-6 h-6" />
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[calc(100vh-200px)]">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.modelValue) {
      close()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>