const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

console.log("Starting server...");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const mongoURI = "";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});
const NewsSchema = new mongoose.Schema({
    url: String,
    headers: String,
    date: Number,
    category: String,
    number_of_comments: String,
    num_photos: Number,
    content: String,
});

const News = mongoose.model("idnes", NewsSchema);

app.get("/api/news", async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = 10;
        let skip = (page - 1) * limit;

        console.log(`Fetching news: page ${page}`);

        const news = await News.find().skip(skip).limit(limit);
        const totalCount = await News.countDocuments();

        res.json({
            page,
            totalPages: Math.ceil(totalCount / limit),
            totalEntries: totalCount,
            news,
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news", error });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});