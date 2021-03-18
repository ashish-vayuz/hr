import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddlewares.js'
import multer from 'multer'
import path from 'path'
import { getParticipationById, getPaticipation, likeChallengeById, unlikeChallengeById, updateParticipation, uploadChal } from '../controllers/challengeControllers.js'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/ChallengeImg')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /mp4/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Videos only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.route('/upload').post(upload.single('video'), uploadChal)
router.route('/like/:id').get(protect, likeChallengeById)
router.route('/unlike/:id').get(protect, unlikeChallengeById)
router.route('/')
    .get(protect, getPaticipation)
router.route('/:id').put(protect, updateParticipation).get(protect, getParticipationById)

export default router;