import express from 'express'
import {
  createPost, updatePost, deletePost, getAllPosts, getPostsByCategory, searchPosts
} from '../controllers/postController.js'

const router = express.Router()

// Create new post
router.post('/', createPost)

// Update post
router.put('/:postId', updatePost)

// Delete post
router.delete('/:postId', deletePost)

// Get all posts
router.get('/', getAllPosts)

// Get posts by category
router.get('/category/:categoryId', getPostsByCategory)

// Search posts by title
router.get('/search', searchPosts)

export default router
