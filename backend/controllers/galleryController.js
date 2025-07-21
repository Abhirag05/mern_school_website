import galleryModel from "../models/galleryModel.js";
import cloudinary from "cloudinary";

// Add gallery image
const addGallery = async (req, res) => {
  try {
    const { tag } = req.body;
    let imageUrl = "";

    
    if (req.file) {
      const cloudRes = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "gallery",
        resource_type: "image",
      });
      imageUrl = cloudRes.secure_url;
    } else {
      return res.status(400).json({ success: false, message: "Image file required" });
    }

    const gallery = new galleryModel({
      imageUrl,
      tag,
    });

    await gallery.save();
    res.json({ success: true, gallery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit gallery image
const editGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;
    let imageUrl;

    // Only upload image if a new file is provided
    if (req.file) {
      const cloudRes = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "gallery",
        resource_type: "image",
      });
      imageUrl = cloudRes.secure_url;
    }

    const updateFields = {};
    if (tag) updateFields.tag = tag;
    if (imageUrl) updateFields.imageUrl = imageUrl;

    const gallery = await galleryModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found" });

    res.json({ success: true, gallery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete gallery image
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await galleryModel.findByIdAndDelete(id);

    if (!gallery)
      return res.status(404).json({ success: false, message: "Gallery item not found" });

    res.json({ success: true, deleted: gallery });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all gallery images (no filtering here)
const getAllGallery = async (req, res) => {
  try {
    const galleryList = await galleryModel.find();
    res.json({ success: true, gallery: galleryList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addGallery, editGallery, deleteGallery, getAllGallery };
