const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const clipboardRoutes = require("./routes/clipboard");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/clipboard", clipboardRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Clipboard API is running!" });
});

const path = require("path");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
