import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photoUrl: { type: String}, 
    type: { 
      type: String, 
      enum: ["teaching", "non teaching"], 
      required: true 
    }, 
  },
  { minimize: false }
);

const staffModel = mongoose.models.staff || mongoose.model("staff", staffSchema);

export default staffModel;
