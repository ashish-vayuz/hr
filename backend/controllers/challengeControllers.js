import asyncHandler from 'express-async-handler'
import Challenge from '../models/challengeModel.js'
import User from '../models/userModel.js'
import PartChal from '../models/participatedChallengeModel.js'

// @desc Get all challenge
// route GET challenge
// access Public
const getChallenge = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            description: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const count = await Challenge.countDocuments({ ...keyword })
    const challenge = await Challenge.find({ ...keyword })
        .populate("creator", 'name image')
        .populate('category', 'name image')
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({
        res: "chal",
        "errorcode": 1,
        "errormessage": "Records found",
        page,
        pages: Math.ceil(count / pageSize),
        "list": challenge.reverse()

    })
})

// @desc Add new challenge
// route Post /challenge
// access Public
const postChallenge = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        hashtags,
        category,
        rewards,
        rewardDetails,
        rewardContactNo,
        rewardEmail,
        coinAllocated,
        coinRequired,
        visibility,
        reviewAmount,
        duration,
        video } = req.body
    const { id } = req.user
    const challenge = await Challenge.create({
        title, description, hashtags, category, rewards, rewardDetails, rewardContactNo, rewardEmail, coinAllocated, coinRequired, visibility, reviewAmount, duration, video, creator: id
    })
    const user = await User.findById(req.user.id)
    if (user) {
        user.myChallenges.push(challenge._id)
        await user.save()
    }
    if (challenge) {
        res.status(201).json({

            errorcode: 1,
            errormessage: "Challenge Added",
            res: "challenge",
            _id: challenge._id,
            creator: challenge.creator,
            title: challenge.title,
            description: challenge.description,
            hashtags: challenge.hashtags,
            category: challenge.category,
            rewards: challenge.rewards,
            rewardDetails: challenge.rewardDetails,
            rewardContactNo: challenge.rewardContactNo,
            rewardEmail: challenge.rewardEmail,
            coinAllocated: challenge.coinAllocated,
            coinRequired: challenge.coinRequired,
            visibility: challenge.visibility,
            reviewAmount: challenge.reviewAmount
        })
    } else {
        res.status(400)
        throw new Error("Invalid Challenge Data")
    }
})

// @desc Update a challenge
// route GET challenge
// access Public

// @desc get single challenge data
// route POST challenge/:id
// access Public
const getChallengeById = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id).populate('creator')
    if (challenge) {
        res.json({
            "errorcode": 1,
            "errormessage": "Records found",
            "list": challenge
        })
    } else {
        res.status(404)
        throw new Error("Challenge not found")
    }
})

// @desc like a single challenge
// route POST challenge/like/:id
// access Public
const likeChallengeById = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id)
    const user = await User.findById(req.user.id)
    const creator = await User.findById(challenge.creator)
    if (challenge) {
        const alreadyLiked = await challenge.likes.find(
            (r) => r.toString() === req.user._id.toString()
        )

        if (alreadyLiked) {
            res.status(400)
            throw new Error('Challenge already liked')
        }

        challenge.likes.push(req.user._id)
        challenge.totalLikes = challenge.likes.length
        creator.totalChallengeLikes += 1
        user.liked.push(req.params.id)
        await creator.save()
        await user.save()
        await challenge.save()
        res.status(201).json({
            errorcode: 1,
            errormessage: 'Like added'
        })
    } else {
        res.status(404)
        throw new Error('Challenge not found')
    }
})

// @desc dislike a single challenge
// route POST challenge/unlike/:id
// access Public
const unlikeChallengeById = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id)
    const user = await User.findById(req.user.id)
    const creator = await User.findById(challenge.creator)
    if (challenge) {
        const alreadyLiked = await challenge.likes.find(
            (r) => r.toString() === req.user._id.toString()
        )

        if (!alreadyLiked) {
            res.status(400)
            throw new Error('Challenge never liked')
        }

        challenge.likes.pull({ _id: req.user.id })
        challenge.totalLikes = challenge.likes.length
        creator.totalChallengeLikes -= 1
        user.liked.pull({ _id: req.params.id })
        await creator.save()
        await user.save()
        await challenge.save()

        res.status(200).json({
            errorcode: 1,
            errormessage: 'Like removed'
        })
    } else {
        res.status(404)
        throw new Error('Challenge not found')
    }
})

// @desc change the payment status
// route POST challenge/payment/:id
// access Public
const changePayment = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id)
    const { PaymentId } = req.query
    if (challenge) {
        challenge.paymentId = PaymentId
        challenge.isPaymentDone = "true"
        await challenge.save()
        res.status(200).json({
            errorcode: 1,
            errormessage: 'Payment Status Updated'
        })
    } else {
        res.status(404)
        throw new Error('Challenge not found')
    }
})

// @desc Delete Challenge
// route delete challenge/:id
// access Private
const deleteChallenge = asyncHandler(async (req, res) => {
    await Challenge.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ message: "Challenge Removed" })
        }
        else {
            res.status(404)
            throw new Error("Challenge not Found")
        }
    });
})



// @desc Paticipate in Challenge
// route post challenge/:id/participate
// access Private
const participateChallenge = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const { video } = req.body
    const challenge = await Challenge.findById(req.params.id)
    if (challenge) {

        const newParticipation = await PartChal.create({
            user: req.user.id,
            video: video,
            challenge: challenge
        })
        challenge.participant.push(newParticipation.id)
        await challenge.save()
        user.participatedChallenges.push(newParticipation.id)
        await user.save()

        if (newParticipation) {
            res.status(201).json({
                errorcode: 1,
                errormessage: 'Challenge Participated'
            })
        } else {
            res.status(400).json()
            throw new Error("Invalid Data")
        }

    } else {
        res.status(404)
        throw new Error('Challenge not found')
    }

})

// @desc upload challenge video
// route POST challenge/upload
// access Public
const uploadChal = asyncHandler(async (req, res) => {
    res.json({
        errorcode: 1,
        errormessage: 'Video Uploaded',
        link: `/${req.file.path}`
    })
})

const updateChallenge = asyncHandler(async (req, res) => {
    const category = await Challenge.findById(req.params.id)

    if (category) {
        category.name = req.body.name || category.name
        category.image = req.body.image || category.image
        category.active = req.body.active

        const updatedCategory = await category.save()

        res.send(updatedCategory)
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

export { getChallenge, postChallenge, uploadChal, getChallengeById, likeChallengeById, unlikeChallengeById, changePayment, deleteChallenge, participateChallenge, updateChallenge }