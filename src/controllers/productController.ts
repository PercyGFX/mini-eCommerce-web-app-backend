import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import ProductModel from "../models/ProductModel.js";

//////////////////////////////// get all products ////////////////////////////////
export const getAllproducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Success", data: "data" });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////// add new product ////////////////////////////////

export const Addproduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Success", data: "data" });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
