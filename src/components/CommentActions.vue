<script setup lang="ts">
defineProps<{
  isCurrentUser: boolean
}>()

const emit = defineEmits<{
  reply: []
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="flex gap-6">
    <template v-if="isCurrentUser">
      <button
        @click="emit('delete')"
        class="text-soft-red hover:opacity-70 flex items-center gap-2 font-medium transition-opacity"
      >
        Delete
      </button>
      <button
        @click="emit('edit')"
        class="text-moderate-blue hover:opacity-70 flex items-center gap-2 font-medium transition-opacity"
      >
        Edit
      </button>
    </template>
    <button
      v-else
      @click="emit('reply')"
      class="text-moderate-blue hover:opacity-70 flex items-center gap-2 font-medium transition-opacity"
    >
      Reply
    </button>
  </div>
</template>
