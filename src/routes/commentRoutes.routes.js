import express from 'express'
import { createComment, updateComment, deleteComment, getCommentsByPost } from '../controllers/commentController.js'

const router = express.Router()

router.post('/', createComment)

router.put('/:commentId', updateComment)

router.delete('/:commentId', deleteComment)

router.get('/post/:postId', getCommentsByPost)

export default router
