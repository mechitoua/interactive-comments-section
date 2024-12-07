<script setup lang="ts">
import CommentCard from '@/components/CommentCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import { useComments } from '@/composables/useComments'

const { currentUser, comments, addComment } = useComments()

// Import current user's avatar
const currentUserAvatar = new URL(
  `./assets/images/avatars/image-${currentUser.value.username}.webp`,
  import.meta.url,
).href
</script>

<template>
  <div class="min-h-screen bg-very-light-gray font-rubik flex items-center justify-center">
    <div class="w-full max-w-[730px] mx-auto p-4 md:p-6 space-y-4">
      <!-- Comments List -->
      <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" />

      <!-- Add Comment -->
      <CommentForm
        :user-avatar="currentUserAvatar"
        :username="currentUser.username"
        @submit="addComment"
      />
    </div>
  </div>
</template>
