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
  <div class="bg-white rounded-lg p-4 md:p-6">
    <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row gap-4 items-start">
      <img :src="userAvatar" :alt="username" class="w-10 h-10 rounded-full order-1 md:order-none" />
      <textarea
        v-model="content"
        :placeholder="placeholder || 'Add a comment...'"
        class="flex-1 p-3 border border-light-gray rounded-lg text-[16px] text-dark-blue placeholder:text-grayish-blue focus:border-moderate-blue focus:outline-none resize-none min-h-[96px] order-3 md:order-none"
        rows="3"
      ></textarea>
      <button
        type="submit"
        class="bg-moderate-blue text-white px-8 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity order-2 md:order-none"
      >
        {{ buttonText || 'Send' }}
      </button>
    </form>
  </div>
</template>
