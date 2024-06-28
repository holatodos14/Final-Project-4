/* eslint-disable camelcase */
import { pool } from '../config/db.js'

export async function createPost (req, res) {
  try {
    const { user_id, category_id, title, content } = req.body

    await pool.query('INSERT INTO Posts (user_id, category_id, title, content) VALUES (?, ?, ?, ?)', [user_id, category_id, title, content])

    res.status(201).json({ message: 'Post created successfully' })
  } catch (error) {
    console.error('Error creating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function updatePost (req, res) {
  try {
    const postId = req.params.postId
    const { title, content } = req.body

    await pool.query('UPDATE Posts SET title = ?, content = ? WHERE post_id = ?', [title, content, postId])

    res.json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function deletePost (req, res) {
  try {
    const postId = req.params.postId

    await pool.query('DELETE FROM Posts WHERE post_id = ?', [postId])

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function getAllPosts (req, res) {
  try {
    const [posts] = await pool.query('SELECT * FROM Posts')

    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function getPostsByCategory (req, res) {
  try {
    const categoryId = req.params.categoryId

    const [posts] = await pool.query('SELECT * FROM Posts WHERE category_id = ?', [categoryId])

    res.json(posts)
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function searchPosts (req, res) {
  try {
    const { title } = req.query

    const [posts] = await pool.query('SELECT * FROM Posts WHERE LOWER(title) LIKE ?', [`%${title.toLowerCase()}%`])

    res.json(posts)
  } catch (error) {
    console.error('Error searching posts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
