import express from 'express'
import { createComment, updateComment, deleteComment, getCommentsByPost } from '../controllers/commentController.js'

const router = express.Router()

// Create new comment
router.post('/', createComment)

// Update comment
router.put('/:commentId', updateComment)

// Delete comment
router.delete('/:commentId', deleteComment)

// Get comments by post
router.get('/post/:postId', getCommentsByPost)

export default router
