import staffModel from "../models/staffModel.js";
import cloudinary from "cloudinary";




//Fetch all staff 
const getAllStaff = async (req, res) => {
  try {
    const staffList = await staffModel.find();
    res.json({ success: true, staff: staffList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add staff
const addStaff = async (req, res) => {
  try {
    const { name, type } = req.body;
    let photoUrl = "";

    // If file was uploaded, upload to Cloudinary
    if (req.file) {
      const cloudRes = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "staff",
        resource_type: "image",
      });
      photoUrl = cloudRes.secure_url;
    }

    const staff = new staffModel({
      name,
      type,
      photoUrl, // Will be "" if not uploaded
    });

    await staff.save();
    res.json({ success: true, staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit staff
const editStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    let photoUrl = req.body.photoUrl || "";

    // If new photo was uploaded, upload to Cloudinary
    if (req.file) {
      const cloudRes = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "staff",
        resource_type: "image",
      });
      photoUrl = cloudRes.secure_url;
    }

    const updateFields = { name, type };
    if (photoUrl) updateFields.photoUrl = photoUrl;

    const staff = await staffModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    res.json({ success: true, staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await staffModel.findByIdAndDelete(id);

    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    res.json({ success: true, deleted: staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addStaff, editStaff, deleteStaff,getAllStaff };
