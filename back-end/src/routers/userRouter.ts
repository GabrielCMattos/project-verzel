import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/profile", authMiddleware, UserController.updateProfile);
router.post("/favorites", authMiddleware, UserController.addFavorite);
router.get("/favorites", authMiddleware, UserController.getFavorites);

export default router;

