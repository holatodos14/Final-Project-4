/* eslint-disable camelcase */
import { pool } from '../config/db.js'

// Create a new category
export async function createCategory (req, res) {
  try {
    const { category_name } = req.body
    await pool.query('INSERT INTO Categories (category_name) VALUES (?)', [category_name])
    res.status(201).json({ message: 'Category created successfully' })
  } catch (error) {
    console.error('Error creating category:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all categories
export async function getAllCategories (req, res) {
  try {
    const [categories] = await pool.query('SELECT * FROM Categories')
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update a category
export async function updateCategory (req, res) {
  try {
    const categoryId = req.params.categoryId
    const { category_name } = req.body
    await pool.query('UPDATE Categories SET category_name = ? WHERE category_id = ?', [category_name, categoryId])
    res.json({ message: 'Category updated successfully' })
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a category
export async function deleteCategory (req, res) {
  try {
    const categoryId = req.params.categoryId
    await pool.query('DELETE FROM Categories WHERE category_id = ?', [categoryId])
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
