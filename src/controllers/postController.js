/* eslint-disable camelcase */
import { pool } from '../config/db.js'

// Create a new post
export async function createPost (req, res) {
  try {
    const { user_id, category_id, title, content } = req.body

    // Insert new post
    await pool.query('INSERT INTO Posts (user_id, category_id, title, content) VALUES (?, ?, ?, ?)', [user_id, category_id, title, content])

    res.status(201).json({ message: 'Post created successfully' })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update a post
export async function updatePost (req, res) {
  try {
    const postId = req.params.postId
    const { title, content } = req.body

    // Update post
    await pool.query('UPDATE Posts SET title = ?, content = ? WHERE post_id = ?', [title, content, postId])

    res.json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a post
export async function deletePost (req, res) {
  try {
    const postId = req.params.postId

    // Delete post
    await pool.query('DELETE FROM Posts WHERE post_id = ?', [postId])

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all posts
export async function getAllPosts (req, res) {
  try {
    // Fetch all posts
    const [posts] = await pool.query('SELECT * FROM Posts')

    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get posts by category
export async function getPostsByCategory (req, res) {
  try {
    const categoryId = req.params.categoryId

    // Fetch posts by category
    const [posts] = await pool.query('SELECT * FROM Posts WHERE category_id = ?', [categoryId])

    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Search posts by title
export async function searchPosts (req, res) {
  try {
    const { title } = req.query

    // Search posts by title (assuming case-insensitive search)
    const [posts] = await pool.query('SELECT * FROM Posts WHERE LOWER(title) LIKE ?', [`%${title.toLowerCase()}%`])

    res.json(posts)
  } catch (error) {
    console.error('Error searching posts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
