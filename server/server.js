// Imports
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// Local Imports
import connectDB from "./db/connect.js";

// Routes Imports
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// Configuration
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// Route
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
