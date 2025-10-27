import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";
import movieRouter from "./routers/movieRouter";
import favoriteRouter from "./routers/favoriteRouter";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/favorites", favoriteRouter);
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 3301, () =>
  console.log("Server running on port", process.env.PORT || 3301)
);
