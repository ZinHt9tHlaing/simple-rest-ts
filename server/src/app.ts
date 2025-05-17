import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { connectDB } from "./db";

dotenv.config({ path: ".env" });

const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});
