import express from 'express'
const router = express.Router()
import { addAdmin, authAdmin } from '../controllers/adminController.js'

router.route('/signin').post(authAdmin)
router.route('/signup').post(addAdmin)

export default router;