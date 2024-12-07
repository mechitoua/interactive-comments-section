<script setup lang="ts">
defineProps<{
  score: number
}>()

defineEmits<{
  upvote: []
  downvote: []
}>()
</script>

<template>
  <div class="flex flex-col items-center bg-very-light-gray rounded-lg px-3 py-2 h-fit select-none">
    <button
      @click="$emit('upvote')"
      class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
      aria-label="Upvote"
    >
      <img src="@/assets/images/icon-plus.svg" alt="plus" class="w-3 h-3" />
    </button>
    <span class="text-moderate-blue font-medium text-base py-1">{{ score }}</span>
    <button
      @click="$emit('downvote')"
      class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
      aria-label="Downvote"
    >
      <img src="@/assets/images/icon-minus.svg" alt="minus" class="w-3 h-3" />
    </button>
  </div>
</template>
