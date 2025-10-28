
import { Router } from "express";
import { FavoriteController } from "../controllers/favoriteController";
import { authMiddleware } from "../middleware/authMiddleware"; 

const router = Router();

router.post("/toggle", authMiddleware, FavoriteController.toggleFavorite);
router.get("/:id", FavoriteController.getUserFavorites);

export default router;
