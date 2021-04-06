import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Get all Reviewer
// route GET Reviewer
// access Public/admin

const getReviewer = asyncHandler(async (req, res) => {
  const reviewer = await User.find({ isReviewer: true });
  if (reviewer) {
    res.send({
      "res": "chal",
      "errorcode": 1,
      "errormessage": "Records found",
      "list": reviewer.reverse()
    })
  } else {
    res.send(404)
    throw new Error("Not Found")
  }
});

// @desc Get all Reviewer Request
// route GET Reviewer
// access Public/admin

const getReviewerReuqest = asyncHandler(async (req, res) => {
  const reviewer = await User.find({ reviewerRequest: true });
  if (reviewer) {
    res.send({
      "res": "chal",
      "errorcode": 1,
      "errormessage": "Records found",
      "list": reviewer.reverse()
    })
  } else {
    res.send(404)
    throw new Error("Not Found")
  }
});

// @desc Get all Reviewer Request
// route GET Reviewer
// access Public/admin
const updateReviewerRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const { status } = req.body
  if (reviewer) {
    isReviewer = status || user.isReviewer
    reviewerRequest = false
    await user.save()
    res.send({
      "res": "chal",
      "errorcode": 1,
      "errormessage": "Status Updated",
    })
  } else {
    res.send(404)
    throw new Error("Not Found")
  }
});



export { getReviewer };
