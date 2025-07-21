import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();  // 👈 Load .env file

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });