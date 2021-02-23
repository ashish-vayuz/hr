import asyncHandler from 'express-async-handler'
import Page from '../models/cmsModel.js'


// @desc Get all page
// route POST page
// access Public
const getPage = asyncHandler(async (req, res) => {
    const page = await Page.find({})
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        "list": page
    })
})

// @desc Get pagebyid
// route GET page/:id
// access Public
const getPageById = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id)
    res.json({
        "errorcode": 1,
        "errormessage": "Records found",
        "list": page
    })
})

// @desc Add page
// route POST page
// access Public
const addPage = asyncHandler(async (req, res) => {
    const { name, desc } = req.body
    const pageExist = await Page.findOne({ name })
    if (pageExist) {
        res.status(400)
        throw new Error("Page already exists")
    }

    const page = await Page.create({
        name, desc
    })

    if (page) {
        res.status(201)
        res.send(page)
    } else {
        res.status(400)
        throw new Error("Invalid Page Data")
    }
})

// @desc Delete page
// route delete page/:id
// access Public
const deletePage = asyncHandler(async (req, res) => {
    await Page.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ message: "Page Removed" })
        }
        else {
            res.status(404)
            throw new Error("Page not Found")
        }
    });
})

// @desc Update page
// route put page/:id
// access Public
const updatePage = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id)

    if (page) {
        page.name = req.body.name || page.name
        page.desc = req.body.desc || page.desc
        page.active = req.body.active

        const updatedPage = await page.save()

        res.send(updatedPage)
    } else {
        res.status(404)
        throw new Error('Page not found')
    }
})

export { getPage, addPage, deletePage, updatePage,getPageById }