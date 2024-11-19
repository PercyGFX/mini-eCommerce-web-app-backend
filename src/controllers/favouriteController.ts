import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import ProductModel from "../models/ProductModel.js";
import Joi from "joi";
import FavouriteModel from "../models/FavouriteModel.js";

// get favourites

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await FavouriteModel.findOne();
    const favoriteIds = favorites ? favorites.productIds : [];

    // products
    const products = await ProductModel.find({
      _id: { $in: favoriteIds },
    });

    res.status(200).json({
      message: "Favorites fetched successfully",
      data: {
        favoriteIds: favoriteIds,
        products: products,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// update favourites

const updateFavoritesSchema = Joi.object({
  favorites: Joi.array().items(Joi.string()).required(),
});

export const updateFavorites = async (req: Request, res: Response) => {
  try {
    // validations
    const { error, value } = updateFavoritesSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const { favorites } = value;

    //update or cretae
    const updatedFavorites = await FavouriteModel.findOneAndUpdate(
      {},
      { productIds: favorites },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Favorites updated successfully",
      data: updatedFavorites.productIds,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
