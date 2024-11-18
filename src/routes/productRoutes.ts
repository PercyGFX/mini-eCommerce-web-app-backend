import express from "express";
const productRoutes = express.Router();
import { getAllproducts } from "../controllers/productController.js";

// get all
productRoutes.post("/login", getAllproducts);

export default productRoutes;
