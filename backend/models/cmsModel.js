import mongoose from 'mongoose'

const pageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Page = mongoose.model('Page', pageSchema)

export default Page;