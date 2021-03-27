import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const reportSchema = mongoose.Schema(
    {
        type: { type: String, required: true },
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
        default: "Add Your Bio From Setting"
    },
    email: {
        type: String,
        required: false
    },
    contact: {
        type: Number,
        required: false,
        default: 0
    },
    username: {
        tpye: String,
    },
    OTP: {
        type: String,
        required: true,
        default: "0",
    },
    verified: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true,
        default: "None"
    },
    myChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge',
    }],
    participatedChallenges: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participate',
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participate',
    }],
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participate',
    }],
    totalChallengeLikes: {
        type: Number,
        default: 0
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    }],
    categoryCoin:[{
        coins:{
            type:Number,
            default:0
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        }
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
        default: "/uploads\\ProfileImg\\image-1611683137144.png"
    },
    password: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    totalReports: {
        type: Number,
        default: 0
    },
    reports: [reportSchema],
    isReviewer: {
        type: Boolean,
        default: false
    },
    reviewerRequest: {
        type: Boolean,
        default: false
    },
    reviewerData: {
        DOB: {
            type: String,

        },
        age: {
            type: String,

        },
        bankName: {
            type: String,

        },
        branchName: {
            type: String,

        },
        IFSCcode: {
            type: String,

        },
        googleId: {
            tpye: String,
        },
        googleToken: {
            type: String,
        },
        facebookId: {
            type: String
        },
        facebookToken: {
            type: String
        },
        UploadID: []
    }
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