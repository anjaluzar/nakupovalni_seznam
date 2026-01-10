import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import listRoutes from "./routes/lists.js";

dotenv.config();
const app = express();

// Configure CORS: allow specific origin from env in production, otherwise allow all for local dev
if (process.env.CLIENT_ORIGIN) {
  app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
} else {
  app.use(cors());
}

app.use(express.json());

// 🔗 Povezava z MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Povezano z MongoDB"))
  .catch((err) => console.error("❌ Napaka pri povezavi:", err));

// 📦 API poti
app.use("/api/lists", listRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Strežnik posluša na portu ${PORT}`));
