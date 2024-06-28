import express from 'express'
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js'

const router = express.Router()

router.post('/', createCategory)

router.get('/', getAllCategories)

router.put('/:categoryId', updateCategory)

router.delete('/:categoryId', deleteCategory)

export default router
