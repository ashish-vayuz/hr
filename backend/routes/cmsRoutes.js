import express from 'express'
const router = express.Router()
import { getPage, postPage, putPage } from '../controllers/pageController.js'
router.get("/", getPage);

//CREATE ROUTE

router.post("/add", postPage);

///UPDATE ROUTE

router.put("/update/:id", putPage)

export default router;