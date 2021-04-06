import mongoose from 'mongoose'

const URSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    amount: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Reject']
    }
},
    {
        timestamps: true
    }
)


const UserRedem = mongoose.model('UserRedem', URSchema)

export default UserRedem;