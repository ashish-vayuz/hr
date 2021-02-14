import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'
import category from '../data/category.js'

// @desc update category image
// route POST category/upload
// access Public
const uploadCat = asyncHandler(async (req, res) => {
    res.json({ image: `/${req.file.path}` })
})

// @desc Get all category
// route POST category
// access Public
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find({})
    res.json({
        "res": "chal",
        "errorcode": 1,
        "errormessage": "Records found",
        "list": category
    })
})

// @desc Add category
// route POST category
// access Public
const addCategory = asyncHandler(async (req, res) => {
    const { name, image } = req.body
    const categoryExist = await Category.findOne({ name })
    if (categoryExist) {
        res.status(400)
        throw new Error("Category already exists")
    }

    const category = await Category.create({
        name, image
    })

    if (category) {
        res.status(201)
        res.send(category)
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

// @desc Delete category
// route delete category/:id
// access Public
const deleteCategory = asyncHandler(async (req, res) => {
    await Category.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ message: "Category Removed" })
        }
        else {
            res.status(404)
            throw new Error("Category not Found")
        }
    });
})

// @desc Update category
// route put category/:id
// access Public
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = req.body.name || category.name
        category.image = req.body.image || category.image
        category.active = req.body.active 

        const updatedCategory = await category.save()

        res.send(updatedCategory)
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

export { uploadCat, getCategory, addCategory, deleteCategory, updateCategory }