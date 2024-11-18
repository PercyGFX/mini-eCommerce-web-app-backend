import express from "express";
const productRoutes = express.Router();
import {
  getAllproducts,
  Addproduct,
} from "../controllers/productController.js";

// add new product
productRoutes.post("/add-new", Addproduct);

// get all products

productRoutes.get("/all", getAllproducts);

export default productRoutes;
