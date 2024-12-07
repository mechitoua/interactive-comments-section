<script setup lang="ts">
const props = defineProps<{
  score: number
}>()

const emit = defineEmits<{
  upvote: []
  downvote: []
}>()
</script>

<template>
  <div class="flex flex-col items-center bg-very-light-gray rounded-lg px-3 py-2 h-fit gap-3 select-none">
    <button
      @click="emit('upvote')"
      class="text-light-blue hover:text-moderate-blue transition-colors"
    >
      +
    </button>
    <span class="text-moderate-blue font-medium">{{ score }}</span>
    <button
      @click="emit('downvote')"
      class="text-light-blue hover:text-moderate-blue transition-colors"
    >
      -
    </button>
  </div>
</template>
