import asyncHandler from 'express-async-handler'
import Challenge from '../models/challengeModel.js'
import User from '../models/userModel.js'

// @desc Get all challenge
// route GET challenge
// access Public
const getChallenge = asyncHandler(async (req, res) => {
    const challenge = await Challenge.find({}).populate("creator", 'name image').populate('category', 'name image')
    res.json({
        res: "chal",
        chalData: challenge
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
    const challenge = await Challenge.findById(req.params.id)
    if (challenge) {
        res.send(challenge)
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

        await challenge.save()
        res.status(201).json({ message: 'Like added' })
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
    if (challenge) {
        const alreadyLiked = await challenge.likes.find(
            (r) => r.toString() === req.user._id.toString()
        )

        if (!alreadyLiked) {
            res.status(400)
            throw new Error('Challenge never liked')
        }

        challenge.likes.pull({ _id: req.user.id })
        challenge.totalLikes=challenge.likes.length
        await challenge.save()

        res.status(200).json({ message: 'Like removed' })
    } else {
        res.status(404)
        throw new Error('Challenge not found')
    }
})

// @desc upload challenge video
// route POST challenge/upload
// access Public
const uploadChal = asyncHandler(async (req, res) => {
    res.json({ link: `/${req.file.path}` })
})

export { getChallenge, postChallenge, uploadChal, getChallengeById, likeChallengeById,unlikeChallengeById }