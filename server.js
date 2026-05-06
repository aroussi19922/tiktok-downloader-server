const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// هذا الجزء هو الذي سيقضي على رسالة Not Found
app.get("/", (req, res) => {
    res.send("<h1>Bridge is Open! ✅</h1><p>السيرفر يعمل والجسر مفتوح الآن</p>");
});

// مسار التحميل الذي ستتصل به مدونة بلوجر
app.get("/api/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.json({ error: "ضع الرابط" });
    
    try {
        const response = await axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com/", {
            params: { url: videoUrl },
            headers: {
                "x-rapidapi-key": process.env.MY_TIKTOK_KEY,
                "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com"
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "فشل الجلب" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
