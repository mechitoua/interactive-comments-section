<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  userAvatar: string
  username: string
}>()

const emit = defineEmits<{
  submit: [content: string]
}>()

const content = ref('')

function handleSubmit() {
  if (content.value.trim()) {
    emit('submit', content.value)
    content.value = ''
  }
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 md:p-6">
    <form @submit.prevent="handleSubmit" class="grid grid-cols-[40px,1fr] md:flex md:flex-row gap-4 items-start">
      <img 
        :src="userAvatar" 
        :alt="username" 
        class="w-10 h-10 rounded-full row-start-2 md:order-none" 
      />
      <textarea 
        v-model="content" 
        placeholder="Add a comment..." 
        class="col-span-full row-start-1 w-full min-h-[96px] border border-light-gray rounded-lg p-4 resize-none focus:outline-moderate-blue"
      ></textarea>
      <button 
        type="submit" 
        class="justify-self-end row-start-2 bg-moderate-blue text-white px-6 py-3 rounded-lg uppercase font-medium hover:opacity-70 transition-opacity"
      >
        Send
      </button>
    </form>
  </div>
</template>
