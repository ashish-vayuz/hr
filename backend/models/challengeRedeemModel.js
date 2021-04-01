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
    }
},
    {
        timestamps: true
    }
)


const ChalRedem = mongoose.model('ChalRedem', CRSchema)

export default ChalRedem;