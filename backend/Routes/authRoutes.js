import express from "express";
import { getUsers, login, Register, verifyToken } from "../Controllers/authController.js";
import upload from "../Middleware/multerConfig.js";
const router = express.Router();

router.post("/register",upload.single("profileImage"), Register);
router.post("/login", login);
router.get('/profile', verifyToken);
router.get('/users', getUsers);

export default router;
