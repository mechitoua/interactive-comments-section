<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  userAvatar: String,
  username: String,
  hideAvatar: {
    type: Boolean,
    default: false,
  },
  placeholder: String,
  buttonText: String,
  replying: String,
  initialContent: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  submit: [content: string]
}>()

const content = ref(props.initialContent)

function handleSubmit() {
  if (!content.value.trim()) return
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 md:p-4">
    <form @submit.prevent="handleSubmit" class="md:hidden flex flex-col items-start gap-4">
      <textarea
        v-model="content"
        :placeholder="placeholder || 'Add a comment...'"
        class="w-full p-3 border border-light-gray rounded-lg text-[16px] text-dark-blue min-h-[96px] resize-none"
        rows="3"
      ></textarea>
      <div class="flex justify-between items-center w-full">
        <img v-if="!hideAvatar" :src="userAvatar" :alt="username" class="w-10 h-10 rounded-full" />
        <button
          type="submit"
          class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity"
        >
          {{ buttonText || 'Send' }}
        </button>
      </div>
    </form>

    <form @submit.prevent="handleSubmit" class="hidden md:flex items-start gap-4">
      <img
        v-if="!hideAvatar"
        :src="userAvatar"
        :alt="username"
        class="w-10 h-10 rounded-full self-start"
      />
      <textarea
        v-model="content"
        :placeholder="placeholder || 'Add a comment...'"
        class="flex-1 p-3 border border-light-gray rounded-lg text-[16px] w-full text-dark-blue min-h-[96px] resize-none"
        rows="3"
      ></textarea>
      <button
        type="submit"
        class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity self-end"
      >
        {{ buttonText || 'Send' }}
      </button>
    </form>
  </div>
</template>
