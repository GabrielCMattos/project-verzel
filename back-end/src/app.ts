import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRouter from "./routers/movieRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRouter);

export default app;
