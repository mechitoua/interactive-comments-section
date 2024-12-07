<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Comment } from '@/types/comment'
import { useComments } from '@/composables/useComments'
import CommentForm from './CommentForm.vue'
import DeleteConfirmationModal from './ConfirmationModal.vue'

const props = defineProps<{
  comment: Comment
}>()

const { currentUser, replyingTo, editing, addReply, updateComment, deleteComment, updateScore } =
  useComments()

const commentUserAvatar = new URL(
  `../assets/images/avatars/image-${props.comment.user.username}.webp`,
  import.meta.url,
).href

const currentUserAvatar = new URL(
  `../assets/images/avatars/image-${currentUser.value.username}.webp`,
  import.meta.url,
).href

const isDeleteModalVisible = ref(false)

/**
 * Increases the vote score for the current comment
 * Calls the updateScore method from the comments composable
 */
function handleUpvote() {
  updateScore(props.comment.id, true)
}

/**
 * Decreases the vote score for the current comment
 * Calls the updateScore method from the comments composable
 */
function handleDownvote() {
  updateScore(props.comment.id, false)
}

/**
 * Initiates the reply process for the current comment
 */
function handleReply() {
  replyingTo.value = props.comment.id
}

/**
 * Initiates the edit process for the current comment
 */
function handleEdit() {
  editing.value = props.comment.id
}

/**
 * Initiates the delete process by showing the confirmation modal
 */
function handleDelete() {
  isDeleteModalVisible.value = true
}

/**
 * Confirms and executes the deletion of the current comment
 * Closes the delete confirmation modal after deletion
 */
function confirmDelete() {
  deleteComment(props.comment.id)
  isDeleteModalVisible.value = false
}

/**
 * Cancels the delete process and hides the confirmation modal
 */
function cancelDelete() {
  isDeleteModalVisible.value = false
}

/**
 * Updates the content of the current comment
 * @param {string} content - The new content for the comment
 */
function handleUpdate(content: string) {
  updateComment(props.comment.id, content)
}

/**
 * Adds a new reply to the current comment
 * @param {string} content - The content of the reply
 */
function handleReplySubmit(content: string) {
  addReply(props.comment.id, content, props.comment.user.username)
}

/**
 * Determines if the current comment belongs to the logged-in user
 * @returns {boolean} True if the comment is by the current user, false otherwise
 */
const isCurrentUser = computed(() => props.comment.user.username === currentUser.value.username)
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
          <span class="text-moderate-blue font-medium text-base py-3">{{ comment.score }}</span>
          <button
            @click="handleDownvote"
            class="text-light-grayish-blue hover:text-moderate-blue transition-colors p-1"
          >
            <img src="@/assets/images/icon-minus.svg" alt="minus" class="w-3 h-3" />
          </button>
        </div>

        <!-- Comment content -->
        <div class="flex-1 min-w-0">
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
                <span class="text-[16px] hover:text-light-blue">Edit</span>
              </button>
              <button
                v-else
                @click="handleReply"
                class="flex items-center gap-2 text-moderate-blue hover:text-light-grayish-blue font-medium transition-colors"
              >
                <img src="@/assets/images/icon-reply.svg" alt="reply" class="w-3 h-3" />
                <span class="text-[16px] hover:text-light-blue">Reply</span>
              </button>
            </div>
          </div>

          <!-- Comment text -->
          <div v-if="editing === comment.id">
            <CommentForm
              :initial-content="comment.content"
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

    <DeleteConfirmationModal
      :visible="isDeleteModalVisible"
      @close="cancelDelete"
      @confirm="confirmDelete"
    />

    <!-- Reply form -->
    <div v-if="replyingTo === comment.id" class="pl-0">
      <CommentForm
        :user-avatar="currentUserAvatar"
        :username="currentUser.username"
        :replying-to="comment.user.username"
        button-text="REPLY"
        @submit="handleReplySubmit"
      />
    </div>

    <!-- Nested replies -->
    <div
      v-if="comment.replies?.length"
      class="pl-4 md:pl-16 ml-0 md:ml-10 border-l-2 border-light-gray space-y-4"
    >
      <CommentCard
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :class="{ 'pl-0 md:pl-0': !reply.replies?.length }"
      />
    </div>
  </div>
</template>
