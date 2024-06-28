import express from 'express'
import { register, updateProfile, deleteAccount } from '../controllers/userController.js'
const router = express.Router()

router.post('/register', register)

router.put('/profile/:userId', updateProfile)

router.delete('/delete/:userId', deleteAccount)

export default router
