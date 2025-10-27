import express from "express";
import multer from "multer";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:id", getProfile);

router.put("/update", authMiddleware, upload.single("avatar"), updateProfile);

export default router;
