import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        status: {
            type: "String",
            required: true,
            default: "Pending"
        }
    },
    {
        timestamps: true,
    }
)

const challengeSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalLikes: {
        type: Number,
        required: true,
        default: "0"
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    rewards: {
        type: String,
        required: true,
    },
    rewardDetails: {
        type: String,
    },
    rewardContactNo: {
        type: String,
    },
    rewardEmail: {
        type: String,
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
    },
    reviews: [reviewSchema],
    totalparticipated: {
        type: Number,
        default: 0
    },
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participate',
    }],
    participation:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    video: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    paymentId: {
        type: String,
    },
    isPaymentDone: {
        type: Boolean,
        required: true,
        default: false
    },
    isliked: {
        type: Boolean,
        default: false
    },
    isBookmarked: {
        type: Boolean,
        default: false
    },
    isParticipated: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)


const Challenge = mongoose.model('Challenge', challengeSchema)

export default Challenge;