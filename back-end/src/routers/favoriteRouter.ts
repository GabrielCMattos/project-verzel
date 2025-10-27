import express from "express";
import { addFavorite, removeFavorite, getUserFavorites } from "../controllers/favoriteController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", getUserFavorites);
router.post("/", authMiddleware, addFavorite);
router.delete("/:movieId", authMiddleware, removeFavorite);

export default router;
