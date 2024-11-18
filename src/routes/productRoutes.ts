import express from "express";
const productRoutes = express.Router();
import multer from "multer";

import {
  getAllproducts,
  Addproduct,
} from "../controllers/productController.js";

// multer configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// add new product
productRoutes.post(
  "/add-new",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
  ]),
  Addproduct
);

// get all products

productRoutes.get("/all", getAllproducts);

export default productRoutes;
