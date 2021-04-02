import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Get all Reviewer
// route GET Reviewer
// access Public/admin

const getReviewer = asyncHandler(async (req, res) => {
  const reviewer = await User.find({ isReviewer: true });
  res.json({
    res: "rev",
    errorcode: 1,
    errormessage: "Records found",
    list: reviewer.reverse(),
  });
});

export { getReviewer };
