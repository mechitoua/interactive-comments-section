<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  replyingTo: {
    type: [String, Number],
    required: true,
  },
  currentUserAvatar: {
    type: String,
    required: true,
  },
  currentUser: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const content = ref('')

const handleReplySubmit = () => {
  const trimmedContent = content.value.trim()
  if (trimmedContent) {
    emit('submit', trimmedContent)
    content.value = '' // Clear the textarea after successful submission
  }
}
</script>

<template>
  <div v-if="replyingTo == comment.id" class="bg-white rounded-lg p-4 md:p-6">
    <form @submit.prevent="handleReplySubmit" class="flex items-start gap-4">
      <img :src="currentUserAvatar" :alt="currentUser.username" class="w-10 h-10 rounded-full" />
      <div class="flex-1 space-y-2">
        <textarea
          v-model="content"
          placeholder="Add a comment..."
          class="block w-full p-3 border border-light-gray rounded-lg text-[16px] text-dark-blue min-h-[96px]"
          rows="3"
        ></textarea>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity"
          >
            REPLY
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
