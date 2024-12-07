export interface User {
  image: {
    png: string
    webp: string
  }
  username: string
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies?: Comment[]
  replyingTo?: string
}

export interface CurrentUser {
  image: {
    png: string
    webp: string
  }
  username: string
}

export interface CommentsData {
  currentUser: CurrentUser
  comments: Comment[]
}
