import express from 'express'
import { adminLogin} from '../controllers/adminController.js'
import {addStaff,editStaff, deleteStaff,getAllStaff} from '../controllers/staffController.js'
import upload from "../middleware/multer.js";
import adminAuth from '../middleware/adminAuth.js';
import { addNews,editNews,deleteNews,getAllNews } from '../controllers/newsController.js';
import { addGallery, deleteGallery, editGallery,getAllGallery } from '../controllers/galleryController.js';




const adminRouter=express.Router();

//Admin login
adminRouter.post('/login',adminLogin);

//Staff
adminRouter.get("/staff/all", upload.single("photo"), getAllStaff);
adminRouter.post("/staff/add", adminAuth, upload.single("photo"), addStaff);
adminRouter.put("/staff/edit/:id", adminAuth, upload.single("photo"), editStaff);
adminRouter.delete("/staff/delete/:id", adminAuth, deleteStaff);

//News
adminRouter.post("/news/add", adminAuth, addNews);
adminRouter.put("/news/edit/:id", adminAuth, editNews);
adminRouter.delete("/news/delete/:id", adminAuth, deleteNews);
adminRouter.get("/news/all", getAllNews);


//gallery

adminRouter.post("/gallery/add", adminAuth, upload.single("image"), addGallery);
adminRouter.put("/gallery/edit/:id", adminAuth, upload.single("image"), editGallery);
adminRouter.delete("/gallery/delete/:id", adminAuth, deleteGallery);
adminRouter.get("/gallery/all", getAllGallery);

export default adminRouter;