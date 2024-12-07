<script setup lang="ts">
import { ref } from 'vue'
/**
 * A form for adding a comment.
 *
 * The form will submit the comment's text when the button is clicked.
 * The form will also emit a 'submit' event with the comment's text.
 *
 * The form will also clear the comment's text when submitted.
 *
 * @prop {string} buttonText The text for the submit button
 * @prop {string} placeholder The placeholder text for the textarea
 * @prop {string} initialContent The initial content of the textarea
 * @prop {string} userAvatar The URL of the avatar image
 * @prop {string} username The username of the user who is submitting the comment
 * @emits {string} submit The text of the comment
 */

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
    <form @submit.prevent="handleSubmit" class="md:flex md:flex-row md:gap-4 md:items-start">
      <textarea
        v-model="content"
        :placeholder="placeholder || 'Add a comment...'"
        class="block w-full p-3 mb-4 md:mb-0 border border-light-gray rounded-lg text-[16px] text-dark-blue placeholder:text-grayish-blue focus:border-moderate-blue focus:outline-none resize-none min-h-[96px] md:flex-1 md:order-2"
        rows="3"
      ></textarea>
      <div class="flex justify-between items-center md:hidden">
        <img :src="userAvatar" :alt="username" class="w-10 h-10 rounded-full md:order-1" />
        <button
          type="submit"
          class="bg-moderate-blue text-white px-8 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity"
        >
          {{ buttonText || 'Send' }}
        </button>
      </div>
      <!-- Desktop layout -->
      <img :src="userAvatar" :alt="username" class="hidden md:block w-10 h-10 rounded-full" />
      <button
        type="submit"
        class="hidden md:block bg-moderate-blue text-white px-8 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity md:order-3"
      >
        {{ buttonText || 'Send' }}
      </button>
    </form>
  </div>
</template>
