import express from "express";
import multer from "multer";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/profile", authMiddleware, getProfile);

export default router;
