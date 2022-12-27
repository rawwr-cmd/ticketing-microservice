import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
};

start();
