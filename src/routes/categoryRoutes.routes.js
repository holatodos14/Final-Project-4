import express from 'express'
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js'

const router = express.Router()

// Create new category
router.post('/', createCategory)

// Get all categories
router.get('/', getAllCategories)

// Update category
router.put('/:categoryId', updateCategory)

// Delete category
router.delete('/:categoryId', deleteCategory)

export default router
