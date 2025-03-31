const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors({ origin: "*" })); // Allow all origins


const app = express();
const PORT = process.env.PORT || 5000;  // Use dynamic port for deployment

app.use(cors());
app.use(express.json()); 

// ✅ Replace local MongoDB with MongoDB Atlas connection string
mongoose.connect("mongodb+srv://<nagarvikas456>:<vjTtfl27OREUvuE8>@cluster0.mongodb.net/visitorDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

// Default Route
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
