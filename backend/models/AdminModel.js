import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    active: {
        type: String,
        reuired: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

adminSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin;