import { Router } from "express";
import { MovieController } from "../controllers/movieController";

const router = Router();
const movieController = new MovieController();

router.get("/search", (req, res) => movieController.search(req, res));
router.get("/:id", (req, res) => movieController.getDetails(req, res));

export default router;
