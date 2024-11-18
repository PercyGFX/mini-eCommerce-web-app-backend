import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import ProductModel from "../models/ProductModel.js";
import Joi from "joi";

//////////////////////////////// get all products ////////////////////////////////
export const getAllproducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Success",
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////// add new product ////////////////////////////////

const productSchema = Joi.object({
  sku: Joi.string().required(),
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  description: Joi.string().required(),
  mainImage: Joi.string().required(),
  otherImages: Joi.array().items(Joi.string()),
});

export const Addproduct = async (req: Request, res: Response) => {
  try {
    const mainImage = req.files?.["mainImage"]?.[0]?.filename;
    const otherImages =
      req.files?.["otherImages"]?.map((file) => file.filename) || [];

    const productData = {
      sku: req.body.sku,
      name: req.body.name,
      quantity: Number(req.body.quantity),
      description: req.body.description,
      mainImage,
      otherImages,
    };

    const { error } = productSchema.validate(productData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await ProductModel.create(productData);
    res.status(201).json({ message: "Product created", data: product });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
