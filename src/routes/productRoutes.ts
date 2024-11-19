import express from "express";
const productRoutes = express.Router();
import multer from "multer";

import {
  getAllproducts,
  Addproduct,
  editProduct,
  deleteProduct,
  getSingleProduct,
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

// edit product

productRoutes.put("/edit-product", editProduct);

// delete product
productRoutes.delete("/delete", deleteProduct);

// get single product

productRoutes.get("/get-product/:productId", getSingleProduct);

export default productRoutes;
