import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["favorite"] ||
  mongoose.model("favorite", FavoriteSchema);
