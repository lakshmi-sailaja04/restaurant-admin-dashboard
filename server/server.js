const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const {
  getTopSellers,
  getAnalyticsSummary,
} = require("./controllers/orderController");

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- ENV CHECK ---------------- */
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing!");
  console.error("➡️  Add MONGODB_URI to your server .env file");
  process.exit(1);
}

/* ---------------- DB ---------------- */
connectDB();

/* ---------------- ROUTES ---------------- */
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Analytics routes
app.get("/api/analytics/top-sellers", getTopSellers);
app.get("/api/analytics/summary", getAnalyticsSummary);

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`✅ Eatoes Server running on port ${PORT}`);
});
