import express from "express";
const favouriteRoutes = express.Router();
import { ValidateAuth } from "../middlewares/auth.middleware.js";


import {
  getFavorites,
  updateFavorites,
} from "../controllers/favouriteController.js";

favouriteRoutes.get("/get-favorites", ValidateAuth,  getFavorites);
favouriteRoutes.post("/update-favorites",ValidateAuth,  updateFavorites);

export default favouriteRoutes;
