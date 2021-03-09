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
     review_status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Reject']
  },
})

const PartChal = mongoose.model('Participate', participateChal)

export default PartChal;