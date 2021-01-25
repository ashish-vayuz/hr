import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const challengeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalLikes:{
        type: Number,
        required: true,
        default:"0"
    },
    description: {
        type: String,
        required: true,
    },
    hashtags: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rewards: {
        type: String,
        required: true,
    },
    coinAllocated: {
        type: Number,
        required: true,
    },
    coinRequired: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    reviewAmount: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    active:{
        type: String,
        required: true,
        default: true
    }
}, { timestamps: true })


const Challenge = mongoose.model('Challenge', challengeSchema)

export default Challenge;