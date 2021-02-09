import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import Challenge from './models/challengeModel.js'

import connectDB from './Config/db.js'
import challenge from './data/challenge.js'
import User from './models/userModel.js'

dotenv.config()
connectDB()



const destroyData = async () => {
    try {
        await Challenge.deleteMany()
        await User.deleteMany()


        console.log(`Data Destroyed!`.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

destroyData()