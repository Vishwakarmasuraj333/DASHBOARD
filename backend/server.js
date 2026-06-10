const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

/* CORS */
app.use(cors());

/* Body Parser */
app.use(express.json());

/* Health Check */
app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "Suraj Tech Backend Running Successfully 🚀",
});
});

/* Auth Routes */
app.use("/api/auth", authRoutes);

/* MongoDB Connection */
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("✅ MongoDB Connected");
})
.catch((err) => {
console.log("❌ MongoDB Error:", err);
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
