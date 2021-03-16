import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddlewares.js'
import { getPaticipation, updateParticipation } from '../controllers/challengeControllers.js'

router.route('/')
    .get(protect, getPaticipation)

router.route('/:id').put(protect, updateParticipation)

export default router;