import express from "express";
import { DeleteMytask, getMytask, newTask, upDateMytask } from "../controllers/task.js";
import { isAuthenticated } from "../MiddleWares/auth.js";



const router = express.Router();

router.post ("/new",isAuthenticated,newTask)


router.get ("/my",isAuthenticated,getMytask)


router.route("/:id")
.put(isAuthenticated,upDateMytask)
.delete(isAuthenticated,DeleteMytask)

export default router;