import mongoose from 'mongoose'

const pageSchema = mongoose.Schema(
    {
        pagename: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Page = mongoose.model('Page', pageSchema)

export default Page;