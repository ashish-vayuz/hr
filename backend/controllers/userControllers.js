import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import Challenge from '../models/challengeModel.js'

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
    const user = await User.findById(req.user._id)
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
    const user = await User.findById(req.user.id).select('-password -OTP -verified -isDeleted -report').populate('myChallenges bookmarks participatedChallenges liked')
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
        user.categories = req.body.categories || user.categories
        const updatedUser = await user.save()
        res.send(updatedUser)
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
    const users = await User.find({}).select('name image totalFollowings totalFollowers location')
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        "list": users
    })
})

// @desc fetch single user
// route POST users/:id
// access Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -OTP -verified -isDeleted -report').populate('myChallenges bookmarks participatedChallenges followings followers liked')
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        user
    })
})


// @desc Allow user to booknark challenge
// route POST users/bookmark/:id
// access Private
const addToBookmark = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const challenge = await Challenge.findById(req.params.id)
    if (challenge) {
        const alreadtBookmarked = await user.bookmarks.find(
            (r) => r.toString() === req.params.id.toString()
        )

        if (alreadtBookmarked) {
            res.status(400)
            throw new Error('Challenge already Bookmarked')
        }
    }

    if (user) {
        user.bookmarks.push(challenge)
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
    if (user) {
        user.bookmarks.pull({ _id: req.params.id })
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

        if (alreadyFollow){
            
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
    const { password, newpassword } = req.body
    const user = await User.findById(req.user._id)
    if (user.password === password) {
        user.password = newpassword
        await user.save()
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

// @desc Allow user to become Reviewer
// route POST users/reviewer
// access Private
const reviewerRequest = asyncHandler(async (req, res) => {
    const { DOB, age, bankName, branchName, IFSCcode, UploadID } = req.body
    const user = await User.findById(req.user.id)

    if (user) {
        user.reviewerData = { DOB, age, bankName, branchName, IFSCcode, UploadID }
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

export { signup, authUser, otp, uploadImg, location, category, changePassword, getProfile, reportUser, updateProfile, addToBookmark, removeFromBookmark, addToFollowing, removeFromFollowing, getAllUsers, getUserById, forgotOtp, reviewerRequest, followingList, followerList, test1 }