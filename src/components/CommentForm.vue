<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  buttonText?: string
  placeholder?: string
  initialContent?: string
  userAvatar: string
  username: string
}>()

const emit = defineEmits<{
  submit: [content: string]
}>()

const content = ref(props.initialContent || '')

function handleSubmit() {
  if (!content.value.trim()) return
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <div class="bg-white rounded-lg p-6">
    <textarea
      v-model="content"
      :placeholder="placeholder || 'Add a comment...'"
      class="w-full p-3 border border-light-gray rounded-lg mb-3 min-h-[96px] text-grayish-blue focus:border-moderate-blue focus:outline-none"
      rows="3"
    ></textarea>
    <div class="flex justify-between items-start">
      <img :src="userAvatar" :alt="username" class="w-8 h-8 rounded-full" />
      <button
        @click="handleSubmit"
        class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-70 font-medium uppercase transition-opacity"
      >
        {{ buttonText || 'Send' }}
      </button>
    </div>
  </div>
</template>
