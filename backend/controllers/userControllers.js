import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import Challenge from '../models/challengeModel.js'
import PartChal from '../models/participatedChallengeModel.js'

// @desc Signup User to Platform
// route POST user/signup
// access Public
const signup = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email })
    if (user) {
        if (!user.verified) {
            const val = Math.floor(1000 + Math.random() * 9000);
            //STEP 1
            let transporter = await nodemailer.createTransport({

                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,//
                    pass: process.env.PASSWORD
                }

            })

            //STEP 2
            let info = {
                from: process.env.EMAIL,
                to: email,
                subject: "OTP VERIFICATION",
                text: `Your OTP is ${val}`
            }
            //STEP 3
            transporter.sendMail(info, function (err, data) {
                if (err) {
                    console.log(err)
                }

                else {
                    console.log("Email Sent")
                }
            })
            user.OTP = val
            await user.save()
            res.status(200).json({
                errorcode: 1,
                res: "otp",
                errormessage: "otp",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                OTP: user.OTP
            })

        } else if (user.location === "None") {
            res.status(400).json({
                errorcode: 1,
                res: "location",
                errormessage: "location",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else if (user.categories.length == "0") {
            res.status(400).json({
                errorcode: 1,
                res: "categories",
                errormessage: "categories",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({
                errorcode: 1,
                res: "registered",
                errormessage: "registered",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
    } else {
        const val = Math.floor(1000 + Math.random() * 9000);
        //STEP 1
        let transporter = await nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.EMAIL,//
                pass: process.env.PASSWORD
            }

        })

        //STEP 2
        let info = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP VERIFICATION",
            text: `Your OTP is ${val}`
        }
        //STEP 3
        transporter.sendMail(info, function (err, data) {
            if (err) {
                console.log(err)
            }

            else {
                console.log("Email Sent")
                res.status(200).json({ val })
            }
        })
        const newUser = await User.create({
            name,
            email,
            password,
            OTP: val,
        })

        if (newUser) {
            res.status(201).json({
                errorcode: 1,
                res: 'done',
                errormessage: 'done',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400).json()
            throw new Error("Invalid User Data")
        }
    }
})

// @desc Signin User to Platform
// route POST users/signin
// access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        if (!user.verified) {
            const val = Math.floor(1000 + Math.random() * 9000);
            //STEP 1
            let transporter = await nodemailer.createTransport({

                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,//
                    pass: process.env.PASSWORD
                }

            })

            //STEP 2
            let info = {
                from: process.env.EMAIL,
                to: email,
                subject: "OTP VERIFICATION",
                text: `Your OTP is ${val}`
            }
            //STEP 3
            transporter.sendMail(info, function (err, data) {
                if (err) {
                    console.log(err)
                }

                else {
                    console.log("Email Sent")
                }
            })
            user.OTP = val
            await user.save()
            res.status(200).json({
                errorcode: 1,
                errormessage: "otp",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                OTP: user.OTP
            })

        } else if (user.location === "None") {
            res.status(400).json({
                errorcode: 1,
                errormessage: "location",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else if (user.categories.length == "0") {
            res.status(400).json({
                errorcode: 1,
                errormessage: "categories",
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.json({
                errorcode: 1,
                errormessage: "Authorised access",
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                contactNo: user.contactNo,
                token: generateToken(user._id)
            })
        }
    } else {
        res.status(401)
        throw new Error('Invalid email or Password')
    }
})



// @desc allow user to verify otp
// route POST users/OTP
// access Public
const otp = asyncHandler(async (req, res) => {
    const { OTP } = req.body
    console.log(req.user);
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(400)
        throw new Error('User doesn\'t Exist')
    }

    if (req.user.OTP == OTP) {
        user.verified = "true"
        const updatedUser = await user.save()
        res.json({
            errorcode: 1,
            errormessage: "User Verified",
            flow: 'signup',
            _id: updatedUser._id,
            secret: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            email: updatedUser.email,
            image: updatedUser.image,
            contactNo: updatedUser.contactNo,
            location: updatedUser.location,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Incorrect OTP')
    }
})

// @desc allow user to forgot otp
// route POST users/OTP
// access Public
const forgotOtp = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const val = Math.floor(1000 + Math.random() * 9000);
        //STEP 1
        let transporter = await nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.EMAIL,//
                pass: process.env.PASSWORD
            }

        })

        //STEP 2
        let info = {
            from: process.env.EMAIL,
            to: req.user.email,
            subject: "OTP VERIFICATION",
            text: `Your OTP is ${val}`
        }
        //STEP 3
        transporter.sendMail(info, function (err, data) {
            if (err) {
                console.log(err)
            }

            else {
                console.log("Email Sent")
                res.status(200).json({ val })
            }
        })
        user.OTP = val
        const updatedUser = await user.save()
        res.status(201).json({
            errorcode: 1,
            flow: 'forget',
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
            otp: val
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc User to update Profile Image
// route POST users/upload
// access Public
const uploadImg = asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user.id)
    if (user) {
        user.image = `/${req.file.path}`
        const updatedUser = await user.save()
        res.json({
            errorcode: 1,
            errormessage: "Profile Image Updated",
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            email: updatedUser.email,
            image: updatedUser.image,
            contactNo: updatedUser.contactNo,
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to update location
// route POST users/location
// access Public
const location = asyncHandler(async (req, res) => {
    const { location } = req.body
    console.log(req.user);
    const user = await User.findById(req.user._id)
    if (user) {
        user.location = location
        const updatedUser = await user.save()
        res.json({
            errorcode: 1,
            errormessage: "Location Updated",
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            email: updatedUser.email,
            image: updatedUser.image,
            contactNo: updatedUser.contactNo,
            location: updatedUser.location
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to add category
// route POST users/category
// access Public
const category = asyncHandler(async (req, res) => {
    const { category } = req.body
    const { email } = req.user
    if (req.user) {

        const updatedUser = await User.findById(req.user.id)
        updatedUser.categories = category
        await updatedUser.save()
        res.json({
            errorcode: 1,
            errormessage: "Category Updated",
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            categories: updatedUser.categories,
            email: updatedUser.email,
            image: updatedUser.image,
            contactNo: updatedUser.contactNo,
            location: updatedUser.location
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc allow user to get profile data
// route POST users/profile
// access Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .select('-password -OTP -verified -isDeleted -report')
        .populate('myChallenges bookmarks participatedChallenges liked')
        .populate("followings", 'name image')
        .populate("followers", 'name image')
        .populate("categories", "name image")
    if (user) {
        res.json({
            "errorcode": 1,
            "errormessage": "Records found",
            "list": user
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

// @desc allow user to update profile data
// route POST users/profile
// access Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        user.name = req.body.name || user.name
        user.categories = req.body.category || user.category
        user.about = req.body.about || user.about
        user.location = req.body.location || user.location
        const updatedUser = await user.save()
        res.json({
            "errorcode": 1,
            "errormessage": "Profile Updated",
            updatedUser
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

// @desc report a user
// route POST users/report/:id
// access Private
const reportUser = asyncHandler(async (req, res) => {
    const { type } = req.body
    const target = await User.findById(req.params.id)
    if (target) {
        const alreadyReported = target.reports.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        if (alreadyReported) {
            res.status(400)
            throw new Error('User already reported')
        }

        const report = {
            type: type,
            user: req.user._id
        }

        target.reports.push(report)
        target.totalReports = target.reports.length

        await target.save()
        res.status(201).json({
            errorcode: 1,
            errormessage: 'User Reported'
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc fetch all users
// route POST users/all
// access Public
const getAllUsers = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const count = await User.countDocuments({ ...keyword })
    const users = await User.find({ ...keyword })
        .select('name image totalFollowings totalFollowers location')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        "list": users,
        page,
        pages: Math.ceil(count / pageSize),
    })
})

// @desc fetch single user
// route POST users/:id
// access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password -OTP -verified -isDeleted -report')
        .populate('myChallenges bookmarks participatedChallenges liked')
        .populate("followings", 'name')
        .populate("followers", 'name')
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        user: user
    })
})


// @desc Allow user to booknark challenge
// route POST users/bookmark/:id
// access Private
const addToBookmark = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const challenge = await PartChal.findById(req.params.id)
    if (challenge) {
        const alreadtBookmarked = await challenge.bookmarks.find(
            (r) => r.toString() === req.params.id.toString()
        )

        if (alreadtBookmarked) {
            res.status(400)
            throw new Error('Challenge already Bookmarked')
        }
    }

    if (user) {
        user.bookmarks.push(challenge)
        challenge.bookmarks.push(user)
        await challenge.save()
        const updatedUser = await user.save()
        res.json({

            errorcode: 1,
            errormessage: "Added to Bookmark",
            _id: updatedUser._id,
            name: updatedUser.name,
            bookmarks: updatedUser.bookmarks
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to remove booknark challenge
// route PUT users/unsave/:id
// access Private
const removeFromBookmark = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const challenge = await PartChal.findById(req.params.id)
    if (user) {
        user.bookmarks.pull({ _id: req.params.id })
        challenge.bookmarks.pull({ _id: req.user.id })
        await challenge.save()
        const updatedUser = await user.save()
        res.json({

            errorcode: 1,
            errormessage: "Removed from Bookmark",
            _id: updatedUser._id,
            name: updatedUser.name,
            bookmarks: updatedUser.bookmarks
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to follow
// route POST users/follow/:id
// access Private
const removeFromFollowing = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const target = await User.findById(req.params.id)
        user.followings.pull({ _id: req.params.id })
        console.log(user);
        user.totalFollowings = user.followings.length
        const updatedUser = await user.save()
        user.followers.pull({ _id: req.params.id })
        target.totalFollowers = target.followers.length
        await target.save()
        res.json({
            errorcode: 1,
            errormessage: "Removed Following",
            _id: updatedUser._id,
            name: updatedUser.name,
            followings: updatedUser.followings
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to unfollow
// route POST users/unfollow/:id
// access Private
const addToFollowing = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {

        const alreadyFollow = await user.followings.find(
            (r) => r.toString() === req.params.id.toString()
        )

        if (alreadyFollow) {

        }

        const target = await User.findById(req.params.id)
        user.followings.push(target)
        user.totalFollowings = user.followings.length
        const updatedUser = await user.save()
        target.followers.push(user)
        target.totalFollowers = target.followers.length
        await target.save()
        res.json({
            errorcode: 1,
            errormessage: "Started Following",
            _id: updatedUser._id,
            name: updatedUser.name,
            followings: updatedUser.followings
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Allow user to change password
// route POST users/changePassword
// access Public
const changePassword = asyncHandler(async (req, res) => {
    const { password, secret } = req.body
    const user = await User.findById(secret)
    if (password) {
        user.password = password
        const updatedUser = await user.save()
        res.json({
            errorcode: 1,
            errormessage: "Password Changed",
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            categories: updatedUser.categories,
            email: updatedUser.email,
            image: updatedUser.image,
            contactNo: updatedUser.contactNo,
            location: updatedUser.location
        })
    } else {
        res.status(400)
        throw new Error("Incorrect Password")
    }
})

// @desc Allow user to update password
// route PUT users/changePassword
// access Public
const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, password } = req.body
    const user = await User.findById(req.user.id)
    if (user) {
        if (await user.matchPassword(oldPassword)) {
            user.password = password
            const updatedUser = await user.save()
            res.json({
                errorcode: 1,
                errormessage: "Password Changed",
                _id: updatedUser._id,
                name: updatedUser.name,
                image: updatedUser.image,
                categories: updatedUser.categories,
                email: updatedUser.email,
                image: updatedUser.image,
                contactNo: updatedUser.contactNo,
                location: updatedUser.location
            })
        } else {
            res.status(400)
            throw new Error("Incorrect Password")
        }
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

// @desc Allow user to become Reviewer
// route POST users/reviewer
// access Private
const reviewerRequest = asyncHandler(async (req, res) => {
    const data = req.files.map(x => x.path)
    const { DOB, age, bankName, branchName, IFSCcode, UploadID } = req.body
    const user = await User.findById(req.user.id)

    if (user) {
        user.reviewerData = { DOB, age, bankName, branchName, IFSCcode, UploadID: data }
        user.reviewerRequest = "true"
        await user.save()
        res.json({
            errorcode: 1,
            errormessage: "Request Submitted",
            user: user
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

// @desc Allow user to become Reviewer
// route POST users/reviewer
// access Private
const reviewerUpdateProfile = asyncHandler(async (req, res) => {
    const data = req.files.map(x => x.path)
    const { DOB, age, bankName, branchName, IFSCcode, UploadID } = req.body
    const user = await User.findById(req.user.id)
    
    if (user) {
        user.DOB = req.body.DOB || user.DOB
        user.age = req.body.age || user.age
        user.bankName = req.body.bankName || user.bankName
        user.branchName = req.body.branchName || user.branchName
        user.IFSCcode = req.body.IFSCcode || user.IFSCcode
        user.data = req.body.data || user.data
        user.isReviewer = "true"
        await user.save()
        res.json({
            errorcode: 1,
            errormessage: "Reviewer Profile Updated",
            user: user
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

const followingList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        res.json({

            "errorcode": 1,
            "errormessage": "Records found",
            "list": user.followings

        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }

})

const followerList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        res.json({

            "errorcode": 1,
            "errormessage": "Records found",
            "list": user.followers

        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }

})

const test1 = asyncHandler(async (req, res) => {
    const user = await User.find({})
    const challenge = await Challenge.find({})
    res.json({
        user: user,
        challenge: challenge
    })
})

const frogetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    console.log(user);
    if (user) {
        const val = Math.floor(1000 + Math.random() * 9000);
        //STEP 1
        let transporter = await nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.EMAIL,//
                pass: process.env.PASSWORD
            }

        })

        //STEP 2
        let info = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP VERIFICATION",
            text: `Your OTP is ${val}`
        }
        //STEP 3
        transporter.sendMail(info, function (err, data) {
            if (err) {
                console.log(err)
            }

            else {
                console.log("Email Sent")
                res.status(200).json({ val })
            }
        })
        user.OTP = val
        await user.save()
        res.status(200).json({
            errorcode: 1,
            token: generateToken(user._id),
            res: "otp",
            errormessage: "otp",
            OTP: user.OTP
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const { password } = req.body
    if (user && await user.matchPassword(password)) {
        await user.remove(function (err) {
            if (!err) {
                res.json({ message: "Account Deleted" })
            }
            else {
                res.status(404)
                throw new Error("Account not Found")
            }
        })
    } else {
        res.status(404)
        throw new Error("Incorrect Password")
    }
})

const googleAuth = asyncHandler(async (req, res) => {
    const { email, name, googleId, googleToken, image } = req.body;
    const verified = "true"
    const user = await User.findOne({ email })
    if (!user) {
        const newUser = await User.create({
            name,
            email,
            googleId,
            image,
            googleToken,
            verified
        })
        if (newUser) {
            res.status(201).json({
                errorcode: 1,
                res: 'google',
                errormessage: 'done',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                googleId: newUser.googleId,
                googleToken: googleToken,
                token: generateToken(newUser._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid Data')
        }
    } else {
        res.status(401)
        throw new Error('User already Exist')
    }
})

const facebookAuth = asyncHandler(async (req, res) => {
    const { name, facebookId, facebookToken,image } = req.body;
    const verified = "true"
    const user = await User.findOne({ email })
    if (!user) {
        const newUser = await User.create({
            name,
            image,
            facebookId,
            facebookToken,
            verified
        })
        if (newUser) {
            res.status(201).json({
                errorcode: 1,
                res: 'google',
                errormessage: 'done',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                facebookId: newUser.facebookId,
                facebookToken: newUser.facebookToken,
                token: generateToken(newUser._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid Data')
        }
    } else {
        res.status(401)
        throw new Error('User already Exist')
    }
})

export { signup, authUser, otp, uploadImg, location, category, changePassword, updatePassword, frogetPassword, getProfile, reportUser, updateProfile, addToBookmark, removeFromBookmark, addToFollowing, removeFromFollowing, getAllUsers, getUserById, forgotOtp, reviewerRequest, followingList, followerList, test1, deleteUser, googleAuth, facebookAuth,reviewerUpdateProfile }