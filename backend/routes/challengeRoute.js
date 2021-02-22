import express from 'express'
const router = express.Router()
import { getChallenge, getChallengeById, postChallenge, uploadChal, likeChallengeById, unlikeChallengeById, changePayment, deleteChallenge, participateChallenge, updateChallenge } from '../controllers/challengeControllers.js'
import multer from 'multer'
import path from 'path'
import { protect } from '../middlewares/authMiddlewares.js'

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

router.route('/')
    .get(getChallenge)
    .post(protect, postChallenge)
router.route('/upload').post(upload.single('challenge'), uploadChal)
router.route('/like/:id').get(protect, likeChallengeById)
router.route('/unlike/:id').get(protect, unlikeChallengeById)
router.route('/payment/successful/:id').get(changePayment)
router.route('/:id/participate').post(protect, participateChallenge)
router.route('/:id').get(getChallengeById).delete(deleteChallenge).put(updateChallenge)

export default router;