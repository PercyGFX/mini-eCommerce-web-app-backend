import express from "express";
const favouriteRoutes = express.Router();
import multer from "multer";

import {
  getFavorites,
  updateFavorites,
} from "../controllers/favouriteController.js";

favouriteRoutes.get("/get-favorites", getFavorites);
favouriteRoutes.post("/update-favorites", updateFavorites);

export default favouriteRoutes;
