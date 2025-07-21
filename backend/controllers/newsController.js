import newsModel from "../models/newsModel.js";

// Add news
const addNews = async (req, res) => {
  try {
    const { title, expiryDate } = req.body;

    if (!title || !expiryDate)
      return res.status(400).json({ success: false, message: "All fields required" });

    const news = new newsModel({
      title,
      
      expiryDate: new Date(expiryDate),
    });

    await news.save();
    res.json({ success: true, news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit news
const editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expiryDate } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    
    if (expiryDate) updateFields.expiryDate = new Date(expiryDate);

    const news = await newsModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    if (!news) return res.status(404).json({ success: false, message: "News not found" });

    res.json({ success: true, news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsModel.findByIdAndDelete(id);
    if (!news) return res.status(404).json({ success: false, message: "News not found" });

    res.json({ success: true, deleted: news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all news (including expired, for admin)
const getAllNews = async (req, res) => {
  try {
    const newsList = await newsModel.find();
    res.json({ success: true, news: newsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addNews, editNews, deleteNews, getAllNews };
