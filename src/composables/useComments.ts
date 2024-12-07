import commentsData from '@/data/comments.json'
import type { Comment, CommentsData } from '@/types/comment'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useComments() {
  const data = useLocalStorage<CommentsData>('comments-data', commentsData)
  const replyingTo = ref<number | null>(null)
  const editing = ref<number | null>(null)

  const currentUser = computed(() => data.value.currentUser)
  const comments = computed(() => data.value.comments)

  function addComment(content: string) {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: 'just now',
      score: 0,
      user: currentUser.value,
      replies: [],
    }
    data.value.comments.push(newComment)
  }

  function addReply(parentId: number, content: string, replyingToUsername: string) {
    const newReply: Comment = {
      id: Date.now(),
      content,
      createdAt: 'just now',
      score: 0,
      replyingTo: replyingToUsername,
      user: currentUser.value,
    }

    const findAndAddReply = (comments: Comment[]) => {
      for (const comment of comments) {
        if (comment.id === parentId) {
          comment.replies = comment.replies || []
          comment.replies.push(newReply)
          return true
        }
        if (comment.replies?.length) {
          if (findAndAddReply(comment.replies)) return true
        }
      }
      return false
    }

    findAndAddReply(data.value.comments)
    replyingTo.value = null
  }

  function updateComment(id: number, content: string) {
    const findAndUpdateComment = (comments: Comment[]) => {
      for (const comment of comments) {
        if (comment.id === id) {
          comment.content = content
          return true
        }
        if (comment.replies?.length) {
          if (findAndUpdateComment(comment.replies)) return true
        }
      }
      return false
    }

    findAndUpdateComment(data.value.comments)
    editing.value = null
  }

  function deleteComment(id: number) {
    const findAndDeleteComment = (comments: Comment[]) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
          comments.splice(i, 1)
          return true
        }
        if (comments[i].replies?.length) {
          if (findAndDeleteComment(comments[i].replies!)) return true
        }
      }
      return false
    }

    findAndDeleteComment(data.value.comments)
  }

  function updateScore(id: number, increment: boolean) {
    const findAndUpdateScore = (comments: Comment[]) => {
      for (const comment of comments) {
        if (comment.id === id) {
          comment.score += increment ? 1 : -1
          return true
        }
        if (comment.replies?.length) {
          if (findAndUpdateScore(comment.replies)) return true
        }
      }
      return false
    }

    findAndUpdateScore(data.value.comments)
  }

  return {
    currentUser,
    comments,
    replyingTo,
    editing,
    addComment,
    addReply,
    updateComment,
    deleteComment,
    updateScore,
  }
}
