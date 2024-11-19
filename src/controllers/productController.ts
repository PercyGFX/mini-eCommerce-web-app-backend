import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import ProductModel from "../models/ProductModel.js";
import Joi from "joi";

//////////////////////////////// get all products ////////////////////////////////
export const getAllproducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    // if (products.length === 0) {
    //   return res.status(404).json({ message: "No products found" });
    // }

    res.status(200).json({
      message: products.length === 0 ? "No products found" : "Success",
      count: products.length,
      data: products.length === 0 ? [] : products,
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

//////////////////////////////// edit product ////////////////////////////////

const EditSchema = Joi.object({
  id: Joi.string().required(),
  sku: Joi.string().required(),
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  description: Joi.string().required(),
});

export const editProduct = async (req: Request, res: Response) => {
  try {
    // validations
    const { error, value } = EditSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id, sku, name, quantity, description } = value;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { sku, name, quantity: Number(quantity), description },
      { new: true }
    );

    res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// delete product

const deleteSchema = Joi.object({
  id: Joi.string().required(),
});

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { error, value } = deleteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = value;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//////////////////////////////// get single product ////////////////////////////////
const getSingleProductSchema = Joi.object({
  productId: Joi.string().required(),
});

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    // Validate
    const { error } = getSingleProductSchema.validate({
      productId: req.params.productId,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await ProductModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product found successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
