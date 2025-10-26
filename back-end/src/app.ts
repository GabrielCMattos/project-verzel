import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRouter from "./routers/movieRouter";
import userRouter from "./routers/userRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);

export default app;
