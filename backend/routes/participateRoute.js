import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddlewares.js'
import { getParticipationById, getPaticipation, updateParticipation } from '../controllers/challengeControllers.js'

router.route('/')
    .get(protect, getPaticipation)

router.route('/:id').put(protect, updateParticipation).get(protect, getParticipationById)

export default router;