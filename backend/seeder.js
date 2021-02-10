import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import Challenge from './models/challengeModel.js'

import connectDB from './Config/db.js'
import challenge from './data/challenge.js'
import User from './models/userModel.js'
import user from './data/user.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Challenge.deleteMany()
        await User.deleteMany()
        await Challenge.insertMany(challenge)
        await User.insertMany(user)


        console.log(`Data Idported!`.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

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

importData()