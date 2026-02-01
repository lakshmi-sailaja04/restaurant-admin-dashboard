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

app.use(cors());
app.use(express.json());

if (!process.env.MONGODB_URI) {
  console.error(" MONGODB_URI is missing!");
  console.error(" Add MONGODB_URI to your server .env file");
  process.exit(1);
}

connectDB();

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/analytics/top-sellers", getTopSellers);
app.get("/api/analytics/summary", getAnalyticsSummary);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


app.listen(PORT, () => {
  console.log(`Eatoes Server running on port ${PORT}`);
});
