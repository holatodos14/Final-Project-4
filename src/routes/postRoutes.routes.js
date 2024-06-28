import express from 'express'
import {
  createPost, updatePost, deletePost, getAllPosts, getPostsByCategory, searchPosts
} from '../controllers/postController.js'

const router = express.Router()

router.post('/', createPost)

router.put('/:postId', updatePost)

router.delete('/:postId', deletePost)

router.get('/', getAllPosts)

router.get('/category/:categoryId', getPostsByCategory)

router.get('/search', searchPosts)

export default router
