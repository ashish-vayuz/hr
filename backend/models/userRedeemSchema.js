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
    }
},
    {
        timestamps: true
    }
)


const UserRedem = mongoose.model('UserRedem', URSchema)

export default UserRedem;