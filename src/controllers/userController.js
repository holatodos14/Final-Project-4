/* eslint-disable camelcase */
import { pool } from '../config/db.js'

export async function register (req, res) {
  try {
    const { username, email, password } = req.body
    const role_id = 1

    const [existingUser] = await pool.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email])
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' })
    }

    await pool.query('INSERT INTO Users (username, email, password, role_id) VALUES (?, ?, ?, ?)', [username, email, password, role_id])

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function updateProfile (req, res) {
  try {
    const userId = req.params.userId
    const { username, email } = req.body

    await pool.query('UPDATE Users SET username = ?, email = ? WHERE user_id = ?', [username, email, userId])

    res.json({ message: 'User profile updated successfully' })
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function deleteAccount (req, res) {
  try {
    const userId = req.params.userId

    await pool.query('DELETE FROM Users WHERE user_id = ?', [userId])

    res.json({ message: 'User account deleted successfully' })
  } catch (error) {
    console.error('Error deleting user account:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
