import express from 'express'
import { signup, authUser, otp, uploadImg, location, category, getProfile, addToBookmark, removeFromBookmark, addToFollowing, removeFromFollowing, getAllUsers, getUserById, forgotOtp, updateProfile, reportUser, reviewerRequest, test1, followingList, followerList } from '../controllers/userControllers.js'
import { protect } from '../middlewares/authMiddlewares.js'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/ProfileImg')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/
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

router.route('/signup').post(signup)
router.route('/signin').post(authUser)
router.route('/OTP').post(protect, otp)
router.route('/upload').post(protect, upload.single('image'), uploadImg)
router.route('/location').post(protect, location)
router.route('/category').post(protect, category)
router.route('/forgotOtp').post(protect, forgotOtp)
router.route('/all').get(protect, getAllUsers)
router.route('/profile')
    .get(protect, getProfile)
    .post(protect, updateProfile)
router.route('/report/:id').post(protect, reportUser)
router.route('/save/:id').put(protect, addToBookmark)
router.route('/unsave/:id').put(protect, removeFromBookmark)
router.route('/follow/:id').put(protect, addToFollowing)
router.route('/unfollow/:id').put(protect, removeFromFollowing)
router.route('/followingList').get(protect,followingList)
router.route('/followerList').get(protect,followerList)
router.route('/reviewer').post(protect, reviewerRequest)
router.route('/test1').get(protect, test1)
router.route('/:id').get(protect, getUserById)

export default router;