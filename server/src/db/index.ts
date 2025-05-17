import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let DB_CONNECTION = "";
    if (process.env.NODE_ENV === "development") {
      DB_CONNECTION = process.env.MONGODB_LOCAL_URI!;
    }

    if (process.env.NODE_ENV === "production") {
      DB_CONNECTION = process.env.MONGODB_ATLAS_URI!;
    }

    const dbResponse = await mongoose.connect(DB_CONNECTION);
    console.log("DB connected successfully.", dbResponse.connection.host);
  } catch (error) {
    console.log("DB connection error :", error);
    process.exit(1);
  }
};
