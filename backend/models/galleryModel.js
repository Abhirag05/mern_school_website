import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }, 
    tag: { 
      type: String, 
      enum: ["school", "events", "facilities"], 
      required: true 
    }, 
  },
  { minimize: false }
);

const galleryModel = mongoose.models.gallery || mongoose.model("gallery", gallerySchema);

export default galleryModel;
