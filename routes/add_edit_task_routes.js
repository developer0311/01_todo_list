import express from "express";
import { addTask, editTask, completeTask } from "../controllers/add_edit_task_controllers.js";

const router = express.Router();

router.post("/add", addTask);
router.post("/edit/:taskId", editTask);
router.post("/complete/:taskId", completeTask);


export default router;