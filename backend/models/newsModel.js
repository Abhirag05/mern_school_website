import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
     
    expiryDate: { type: Date, required: true, index: { expires: 0 } }, 
  },
  { minimize: false }
);

const newsModel = mongoose.models.news || mongoose.model("news", newsSchema);

export default newsModel;
