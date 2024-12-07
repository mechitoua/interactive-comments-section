<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const content = ref(props.comment.content)

const handleEditSubmit = () => {
  const trimmedContent = content.value.trim()
  if (trimmedContent) {
    emit('submit', trimmedContent)
  }
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 md:p-6">
    <form @submit.prevent="handleEditSubmit" class="space-y-2">
      <textarea
        v-model="content"
        class="block w-full p-3 border border-light-gray rounded-lg text-[16px] text-dark-blue min-h-[96px] resize-none"
        rows="3"
      ></textarea>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-moderate-blue text-white px-6 py-3 rounded-lg hover:opacity-50 font-medium uppercase text-[16px] transition-opacity"
        >
          UPDATE
        </button>
      </div>
    </form>
  </div>
</template>
