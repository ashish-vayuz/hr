import Page from '../models/cmsModel.js'
import asyncHandler from 'express-async-handler'

const getPage = asyncHandler(async (req, res) => {
    Page.find({}, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    })
})
const putPage = asyncHandler(async (req, res) => {
    const post = { pagename: req.body.pagename, status: req.body.status }
    cmsPage.findByIdAndUpdate(req.params.id, post, function (err, updatedPost) {
        if (err) {
            res.status(500).json("something not right");
        } else {
            res.redirect("/cms");
            //            res.json(updatedPost);
        }
    });
})

const postPage = asyncHandler(async (req, res) => {
    const page = new cmsPage({
        pagename: req.body.pagename,
        status: req.body.status
    });

    page.save((err) => {
        if (err) {
            res.status(500).json("not created,something went wrong")
        } else {
            res.redirect("/cms");
        }
    });
})

export { getPage, putPage, postPage }