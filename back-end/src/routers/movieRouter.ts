import { Router } from "express";
import { MovieController } from "../controllers/movieController";

const router = Router();

router.get("/top-rated", MovieController.getTopRated);
router.get("/movie/:id", MovieController.getMovie);
router.get("/search", MovieController.search);

export default router;
