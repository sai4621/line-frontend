const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Loads-Scanner-1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema and Model
const LineSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  ClusterCount: { type: Number, required: true },
});

const Line = mongoose.model("Line", LineSchema);

// API Endpoint to Get Latest Data
app.get("/api/line-info", async (req, res) => {
  try {
    const latestEntry = await Line.findOne().sort({ timestamp: -1 });
    if (latestEntry) {
      res.json({
        ClusterCount: latestEntry.ClusterCount,
        timestamp: latestEntry.timestamp,
      });
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
