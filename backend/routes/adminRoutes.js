import express from 'express'
const router = express.Router()
import { addAdmin, authAdmin, deleteAdmin, getAllAdmin, updateAdmin } from '../controllers/adminController.js'
import { protect } from '../middlewares/authMiddlewares.js'

router.route('/signin').post(authAdmin)
router.route('/signup').post(addAdmin)
router.route('/').get(protect, getAllAdmin)
router.route('/:id')
    .put(protect, updateAdmin)
    .delete(protect, deleteAdmin)



export default router;