import express from "express";
const app = express();
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { ConnectToMongoDB } from "./utils/database.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

// cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// middlewares //
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

// mongo connect //
ConnectToMongoDB(process.env.MONGO_URI);

// routes

app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Express Server is Working");
});

// app start
const port = process.env.PORT || 5000;

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error: any) {
  console.error("Error starting the server:", error.message);
}
