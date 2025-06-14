import { userLogin, userRegister, logout } from "../controllers/auth_controllers.js";
import express from "express";
const router = express.Router();


// Post routes for login and register
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", logout);

export default router;
