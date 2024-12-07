<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-6 w-[400px] max-w-[90%] space-y-4">
      <h2 class="text-dark-blue font-medium text-[20px]">Delete comment</h2>
      <p class="text-grayish-blue text-[16px] leading-6">
        Are you sure you want to delete this comment? This will remove the comment and can't be
        undone.
      </p>
      <div class="flex justify-between space-x-4">
        <button
          @click="emit('close')"
          class="flex-1 bg-grayish-blue text-white py-3 rounded-lg uppercase font-medium text-[16px] hover:opacity-70 transition-opacity"
        >
          No, Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="flex-1 bg-soft-red text-white py-3 rounded-lg uppercase font-medium text-[16px] hover:opacity-70 transition-opacity"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
</template>
