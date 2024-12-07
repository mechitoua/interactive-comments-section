<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from '@/types/comment'
import { useComments } from '@/composables/useComments'
import CommentForm from './CommentForm.vue'

const props = defineProps<{
  comment: Comment
}>()

const { currentUser, replyingTo, editing, addReply, updateComment, deleteComment, updateScore } =
  useComments()

const isCurrentUser = computed(() => props.comment.user.username === currentUser.value.username)

// Import avatars
const commentUserAvatar = new URL(
  `../assets/images/avatars/image-${props.comment.user.username}.webp`,
  import.meta.url,
).href

const currentUserAvatar = new URL(
  `../assets/images/avatars/image-${currentUser.value.username}.webp`,
  import.meta.url,
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
  <div class="space-y-4">
    <!-- Main comment card -->
    <div class="bg-white rounded-lg p-4 md:p-6">
      <div class="flex flex-col md:flex-row md:gap-6">
        <!-- Vote buttons (desktop) -->
        <div
          class="hidden md:flex flex-col items-center bg-very-light-gray rounded-lg px-3 py-2 h-fit select-none"
        >
          <button
            @click="handleUpvote"
            class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
          >
            <img src="@/assets/images/icon-plus.svg" alt="plus" class="w-3 h-3" />
          </button>
          <span class="text-moderate-blue font-medium text-base py-1">{{ comment.score }}</span>
          <button
            @click="handleDownvote"
            class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
          >
            <img src="@/assets/images/icon-minus.svg" alt="minus" class="w-3 h-3" />
          </button>
        </div>

        <!-- Comment content -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <img :src="commentUserAvatar" alt="avatar" class="w-8 h-8 rounded-full" />
              <span class="font-medium text-dark-blue">{{ comment.user.username }}</span>
              <span
                v-if="isCurrentUser"
                class="bg-moderate-blue text-white px-1.5 py-[1px] text-[13px] font-medium rounded"
              >
                you
              </span>
              <span class="text-grayish-blue">{{ comment.createdAt }}</span>
            </div>

            <!-- Action buttons (desktop) -->
            <div class="hidden md:flex items-center gap-6">
              <button
                v-if="isCurrentUser"
                @click="handleDelete"
                class="flex items-center gap-2 text-soft-red hover:text-pale-red font-medium transition-colors group"
              >
                <img src="@/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3" />
                <span class="text-[16px]">Delete</span>
              </button>
              <button
                v-if="isCurrentUser"
                @click="handleEdit"
                class="flex items-center gap-2 text-moderate-blue hover:text-light-grayish-blue font-medium transition-colors"
              >
                <img src="@/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3" />
                <span class="text-[16px]">Edit</span>
              </button>
              <button
                v-else
                @click="handleReply"
                class="flex items-center gap-2 text-moderate-blue hover:text-light-grayish-blue font-medium transition-colors"
              >
                <img src="@/assets/images/icon-reply.svg" alt="reply" class="w-3 h-3" />
                <span class="text-[16px]">Reply</span>
              </button>
            </div>
          </div>

          <!-- Comment text -->
          <div v-if="editing === comment.id">
            <CommentForm
              :content="comment.content"
              :user-avatar="currentUserAvatar"
              :username="currentUser.username"
              button-text="UPDATE"
              @submit="handleUpdate"
            />
          </div>
          <p v-else class="text-grayish-blue text-[16px] leading-6">
            <span v-if="comment.replyingTo" class="text-moderate-blue font-medium"
              >@{{ comment.replyingTo }}
            </span>
            {{ comment.content }}
          </p>

          <!-- Mobile footer (votes + actions) -->
          <div class="flex md:hidden items-center justify-between mt-4">
            <div class="flex items-center bg-very-light-gray rounded-lg px-3 py-2 select-none">
              <button
                @click="handleUpvote"
                class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
              >
                <img src="@/assets/images/icon-plus.svg" alt="plus" class="w-3 h-3" />
              </button>
              <span class="text-moderate-blue font-medium text-base px-4">{{ comment.score }}</span>
              <button
                @click="handleDownvote"
                class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
              >
                <img src="@/assets/images/icon-minus.svg" alt="minus" class="w-3 h-3" />
              </button>
            </div>

            <div class="flex items-center gap-4">
              <button
                v-if="isCurrentUser"
                @click="handleDelete"
                class="flex items-center gap-2 text-soft-red hover:text-pale-red font-medium transition-colors"
              >
                <img src="@/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3" />
                <span class="text-[16px]">Delete</span>
              </button>
              <button
                v-if="isCurrentUser"
                @click="handleEdit"
                class="flex items-center gap-2 text-moderate-blue hover:text-light-grayish-blue font-medium transition-colors"
              >
                <img src="@/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3" />
                <span class="text-[16px]">Edit</span>
              </button>
              <button
                v-else
                @click="handleReply"
                class="flex items-center gap-2 text-moderate-blue hover:text-light-grayish-blue font-medium transition-colors"
              >
                <img src="@/assets/images/icon-reply.svg" alt="reply" class="w-3 h-3" />
                <span class="text-[16px]">Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reply form -->
    <div v-if="replyingTo === comment.id" class="pl-0 md:pl-11">
      <CommentForm
        :user-avatar="currentUserAvatar"
        :username="currentUser.username"
        :replying-to="comment.user.username"
        @submit="handleReplySubmit"
      />
    </div>

    <!-- Nested replies -->
    <div
      v-if="comment.replies?.length"
      class="pl-4 md:pl-11 border-l-2 border-light-gray space-y-4"
    >
      <CommentCard v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
    </div>
  </div>
</template>
