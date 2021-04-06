import mongoose from 'mongoose'

const CRSchema = mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Reject']
    }
},
    {
        timestamps: true
    }
)


const ChalRedem = mongoose.model('ChalRedem', CRSchema)

export default ChalRedem;