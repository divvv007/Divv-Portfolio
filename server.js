const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware for JSON parsing

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect("mongodb://localhost:27017/visitorDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Default Route (Fix for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Welcome to the Visitor Counter API!");
});

// Define Schema & Model
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 1 }
});
const Visitor = mongoose.model("Visitor", visitorSchema);

// Visitor Count Route
app.get("/visitor-count", async (req, res) => {
    try {
        let visitorData = await Visitor.findOne();
        
        if (!visitorData) {
            visitorData = new Visitor({ count: 1 });
        } else {
            visitorData.count++;
        }

        await visitorData.save();
        res.json({ count: visitorData.count });

    } catch (error) {
        console.error("Error updating visitor count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
