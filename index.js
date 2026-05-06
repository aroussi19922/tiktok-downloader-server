const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// هذا السطر هو الحل.. يسمح لمدونتك بالاتصال بالسيرفر
app.use(cors({ origin: '*' })); 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Server is Live and Ready! ✅</h1>");
});

app.get("/api/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.json({ error: "No URL provided" });

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
        res.status(500).json({ error: "API Error" });
    }
});

app.listen(process.env.PORT || 10000);
