<script setup lang="ts">
/** 
 * Props for the VoteButton component
 * @property {number} score - The current vote score
 */
defineProps<{
  score: number
}>()

/** 
 * Emits events for upvote and downvote actions
 * @emits upvote - Triggered when upvote button is clicked
 * @emits downvote - Triggered when downvote button is clicked
 */
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
