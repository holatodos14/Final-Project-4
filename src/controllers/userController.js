/* eslint-disable camelcase */
import { pool } from '../config/db.js'

// User registration
export async function register (req, res) {
  try {
    const { username, email, password } = req.body
    const role_id = 1 // Default role for new users

    // Check if username or email already exists
    const [existingUser] = await pool.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email])
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' })
    }

    // Insert new user
    await pool.query('INSERT INTO Users (username, email, password, role_id) VALUES (?, ?, ?, ?)', [username, email, password, role_id])

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update user profile
export async function updateProfile (req, res) {
  try {
    const userId = req.params.userId
    const { username, email } = req.body

    // Update user information
    await pool.query('UPDATE Users SET username = ?, email = ? WHERE user_id = ?', [username, email, userId])

    res.json({ message: 'User profile updated successfully' })
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete user account
export async function deleteAccount (req, res) {
  try {
    const userId = req.params.userId

    // Delete user account
    await pool.query('DELETE FROM Users WHERE user_id = ?', [userId])

    res.json({ message: 'User account deleted successfully' })
  } catch (error) {
    console.error('Error deleting user account:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
