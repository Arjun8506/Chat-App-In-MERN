import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUersForSideBar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute,getUersForSideBar)

export default router;