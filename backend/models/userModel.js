import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const reportSchema = mongoose.Schema(
    {
        reason: { type: String, required: true },
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

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true
    },
    contactNo: {
        type: Number,
        unique: true
    },
    username: {
        tpye: String,
        unique: true
    },
    myChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    }],
    participatedChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalFollowings: {
        type: Number,
        required: true,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    totalFollowers: {
        type: Number,
        required: true,
        default: 0
    },
    coinsEarned: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    report: [reportSchema]
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User;