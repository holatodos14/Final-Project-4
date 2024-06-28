/* eslint-disable camelcase */
import { pool } from '../config/db.js'

// Create a new comment
export async function createComment (req, res) {
  try {
    const { post_id, user_id, content } = req.body

    // Insert new comment
    await pool.query('INSERT INTO Comments (post_id, user_id, content) VALUES (?, ?, ?)', [post_id, user_id, content])

    res.status(201).json({ message: 'Comment created successfully' })
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update a comment
export async function updateComment (req, res) {
  try {
    const commentId = req.params.commentId
    const { content } = req.body

    // Update comment
    await pool.query('UPDATE Comments SET content = ? WHERE comment_id = ?', [content, commentId])

    res.json({ message: 'Comment updated successfully' })
  } catch (error) {
    console.error('Error updating comment:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a comment
export async function deleteComment (req, res) {
  try {
    const commentId = req.params.commentId

    // Delete comment
    await pool.query('DELETE FROM Comments WHERE comment_id = ?', [commentId])

    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
export async function getCommentsByPost (req, res) {
  try {
    const postId = req.params.postId

    // Fetch comments by post ID
    const [comments] = await pool.query('SELECT * FROM Comments WHERE post_id = ?', [postId])

    res.json(comments)
  } catch (error) {
    console.error('Error fetching comments by post:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
