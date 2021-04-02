import express from "express";
const router = express.Router();
import {
  addAdmin,
  authAdmin,
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
} from "../controllers/adminController.js";
import { getReviewer } from "../controllers/reviewerController.js";
import { protect } from "../middlewares/authMiddlewares.js";

router.route("/signin").post(authAdmin);
router.route("/signup").post(addAdmin);
router.route("/").get(getAllAdmin);
router.route("/:id").put(updateAdmin).delete(deleteAdmin);
router.route("/reviewer").get(getReviewer);

export default router;
