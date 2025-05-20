import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./db";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({ path: ".env" });

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});
