<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Comment } from '@/types/comment'
import { useComments } from '@/composables/useComments'
import CommentForm from './CommentForm.vue'
import VoteButton from './VoteButton.vue'
import CommentActions from './CommentActions.vue'

const props = defineProps<{
  comment: Comment
}>()

const { currentUser, replyingTo, editing, addReply, updateComment, deleteComment, updateScore } =
  useComments()

const isCurrentUser = computed(() => props.comment.user.username === currentUser.value.username)
const replyContent = ref('')
const editContent = ref(props.comment.content)

// Import avatars
const commentUserAvatar = new URL(
  `../assets/images/avatars/image-${props.comment.user.username}.webp`,
  import.meta.url
).href

const currentUserAvatar = new URL(
  `../assets/images/avatars/image-${currentUser.value.username}.webp`,
  import.meta.url
).href

function handleUpvote() {
  updateScore(props.comment.id, true)
}

function handleDownvote() {
  updateScore(props.comment.id, false)
}

function handleReply() {
  replyingTo.value = props.comment.id
}

function handleEdit() {
  editing.value = props.comment.id
}

function handleDelete() {
  deleteComment(props.comment.id)
}

function handleUpdate(content: string) {
  updateComment(props.comment.id, content)
}

function handleReplySubmit(content: string) {
  addReply(props.comment.id, content, props.comment.user.username)
}
</script>

<template>
  <div class="bg-white rounded-lg p-6 mb-4">
    <div class="flex gap-6">
      <!-- Score -->
      <VoteButton
        :score="comment.score"
        @upvote="handleUpvote"
        @downvote="handleDownvote"
      />

      <!-- Content -->
      <div class="flex-1">
        <div class="flex items-center gap-4 mb-4">
          <img :src="commentUserAvatar" :alt="comment.user.username" class="w-8 h-8 rounded-full" />
          <span class="font-medium">{{ comment.user.username }}</span>
          <span
            v-if="isCurrentUser"
            class="bg-moderate-blue text-white px-1.5 py-0.5 text-xs font-medium rounded-sm"
            >you</span
          >
          <span class="text-grayish-blue">{{ comment.createdAt }}</span>

          <CommentActions
            class="ml-auto"
            :is-current-user="isCurrentUser"
            @reply="handleReply"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>

        <div v-if="editing !== comment.id">
          <p class="text-grayish-blue">
            <span v-if="comment.replyingTo" class="text-moderate-blue font-medium">
              @{{ comment.replyingTo }}
            </span>
            {{ comment.content }}
          </p>
        </div>
        <div v-else>
          <CommentForm
            :initial-content="comment.content"
            :user-avatar="currentUserAvatar"
            :username="currentUser.username"
            button-text="Update"
            @submit="handleUpdate"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Reply Form -->
  <div v-if="replyingTo === comment.id" class="ml-10 mb-4">
    <CommentForm
      :user-avatar="currentUserAvatar"
      :username="currentUser.username"
      button-text="Reply"
      placeholder="Add a reply..."
      @submit="handleReplySubmit"
    />
  </div>

  <!-- Nested Replies -->
  <div v-if="comment.replies?.length" class="ml-10 pl-6 border-l-2 border-light-gray">
    <CommentCard v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
  </div>
</template>
