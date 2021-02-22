import express from 'express'
const router = express.Router()
import { addPage, deletePage, getPage, getPageById, updatePage } from '../controllers/pageController.js'

router.route('/').get(getPage).post(addPage)
router.route('/:id').get(getPageById).delete(deletePage).put(updatePage)

export default router;