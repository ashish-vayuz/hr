
import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import Challenge from '../models/challengeModel.js'
import User from '../models/userModel.js'

const data = asyncHandler(async (req, res) => {
    const challenge = await Challenge.find({})
    const user = await User.find({})
    const reviewer = await User.find({ reviewerRequest: true})
    const category = await Category.find({})
    res.send({
        totalRegisterdUser = user.length(),
        totalNoofchallenge = challenge.length(),
        totalNoofcategory = category.length(),
        totalNoofreviewer = reviewer.length(),
    })
})