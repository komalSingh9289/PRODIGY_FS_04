import mongoose from "mongoose";

export const Connection = () => {
  const Mongo_url = process.env.MONGODB_URL;
  mongoose
    .connect(Mongo_url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Failed to Connect to MongoDB", error));
};
