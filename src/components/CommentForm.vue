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
 * @prop {boolean} hideAvatar Whether to hide the avatar
 * @emits {string} submit The text of the comment
 */

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
    <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row items-start gap-4">
      <img
        v-if="!hideAvatar"
        :src="userAvatar"
        :alt="username"
        class="w-10 h-10 rounded-full order-1 self-start"
      />
      <textarea
        v-model="content"
        :placeholder="placeholder || 'Add a comment...'"
        class="flex-1 p-3 border border-light-gray rounded-lg text-[16px] w-full text-dark-blue min-h-[96px] order-2 resize-none"
        rows="3"
      ></textarea>
      <button
        type="submit"
        class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity order-3 self-end"
      >
        {{ buttonText || 'Send' }}
      </button>
    </form>
  </div>
</template>
