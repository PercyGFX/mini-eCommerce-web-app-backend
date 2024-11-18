import mongoose from "mongoose";

async function ConnectToMongoDB(connectionstring: string | undefined) {
  try {
    if (!connectionstring) {
      throw new Error("MongoDB connection string is not defined.");
    }

    await mongoose.connect(connectionstring);
    console.log("Connected successfully");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

export { ConnectToMongoDB };
