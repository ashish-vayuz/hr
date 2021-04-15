import Admin from "../models/AdminModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Challenge from "../models/challengeModel.js";
import Category from "../models/categoryModel.js";
import moment from "moment";

// @desc Signin Admin to Platform
// route POST admin/signin
// access Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

// @desc Allow Admin to add new subadmins
// route POST admin/signup
// access Private
const addAdmin = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    res.status(400);
    throw new Error("Admin already Exist");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    res.status(201).send(admin);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Delete Admin
// route delete admin/:id
// access Public
const deleteAdmin = asyncHandler(async (req, res) => {
  await Admin.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      res.json({ message: "Admin Removed" });
    } else {
      res.status(404);
      throw new Error("Admin not Found");
    }
  });
});

// @desc Update Admin
// route put admin/:id
// access Public
const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.active = req.body.active;
    admin.role = req.body.role || admin.role;

    const updatedAdmin = await admin.save();

    res.send(updatedAdmin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
updateAdmin;
updateAdmin;

// @desc fetch all admin
// @route GET /admin
// @access Private
const getAllAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.find({});
  res.json({
    res: "chal",
    errorcode: 1,
    errormessage: "Records found",
    list: admin.reverse(),
  });
});

// @desc fetch all user
// @route GET /admin
// @access Private
const getAllUser = asyncHandler(async (req, res) => {
  const category = await User.find({});
  res.json({
    res: "chal",
    errorcode: 1,
    errormessage: "Records found",
    list: category.reverse(),
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  await User.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      res.json({ message: "Challenge Removed" });
    } else {
      res.status(404);
      throw new Error("Challenge not Found");
    }
  });
});
//Hello this is a test commit


// @desc Update category
// route put category/:id
// access Public
const updateUser = asyncHandler(async (req, res) => {
  const category = await User.findById(req.params.id);

  if (category) {
    category.active = req.body.active;
    category.name = req.body.name || category.name;
    category.email = req.body.email || category.email;
    category.location = req.body.location || category.location;
    const updatedCategory = await category.save();

    res.send(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const DashboardView = asyncHandler(async (req, res) => {
  const TotalRegisterUser = await User.find({ isDeleted: false });
  const TotalChalange = await Challenge.find();
  const TotalCategory = await Category.find();

  var start = moment().startOf("day"); // set to 12:00 am today
  var end = moment().endOf("day"); // set to 23:59 pm today
  const userRegisterToday = await User.find({
    createdAt: { $gte: start, $lt: end },
  });
  res.status(200).json({
    godView: {
      TotalRegisterUser,
      userRegisterToday,
      TotalChalange,
      TotalCategory,
    },
  });
});

export {
  authAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAllAdmin,
  getAllUser,
  updateUser,
  deleteUserById,
  DashboardView,
};
