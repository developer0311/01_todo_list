import express from "express";
import { isAuthenticated } from "../middlewares/auth_middleware.js";
import {
  showHomePage,
  showRegisterPage,
  showLoginPage,
  showTasksPage,
  addEditPage,
} from "../controllers/page_controllers.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/register", showRegisterPage);
router.get("/login", showLoginPage);
router.get("/tasks", isAuthenticated, showTasksPage);
router.get("/tasks/add", isAuthenticated, addEditPage);         // For adding
router.get("/tasks/edit/:id", isAuthenticated, addEditPage);    // For editing



export default router;
