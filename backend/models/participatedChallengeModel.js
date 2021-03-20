import mongoose from 'mongoose'

const participateChal = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    },
    video: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    review_status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Reject']
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
    participates: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalLikes: {
        type: Number,
        required: true,
        default: "0"
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

const PartChal = mongoose.model('Participate', participateChal)

export default PartChal;