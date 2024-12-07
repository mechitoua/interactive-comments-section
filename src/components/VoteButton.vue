<script setup lang="ts">
const emit = defineEmits<{
  upvote: []
  downvote: []
}>()
</script>

<template>
  <div
    class="flex md:flex-col items-center bg-very-light-gray rounded-lg px-3 py-2 h-fit gap-4 md:gap-3 select-none"
  >
    <button
      @click="emit('upvote')"
      class="text-light-blue hover:text-moderate-blue transition-colors"
      aria-label="Upvote"
    >
      +
    </button>
    <span class="text-moderate-blue font-medium">{{ score }}</span>
    <button
      @click="emit('downvote')"
      class="text-light-blue hover:text-moderate-blue transition-colors"
      aria-label="Downvote"
    >
      -
    </button>
  </div>
</template>
