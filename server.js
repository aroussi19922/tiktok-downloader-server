const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// تفعيل الجسر (CORS) للسماح لبلوجر بالاتصال بالسيرفر
app.use(cors());
app.use(express.json());

// مسار للتحقق من أن السيرفر يعمل (للتجربة فقط)
app.get("/", (req, res) => {
    res.send("Server is Running and Bridge is Open! ✅");
});

app.get("/api/download", async (req, res) => {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
        return res.json({ error: "يرجى وضع رابط الفيديو" });
    }

    try {
        const response = await axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com/", {
            params: { url: videoUrl },
            headers: {
                "x-rapidapi-key": process.env.MY_TIKTOK_KEY, 
                "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com"
            }
        });
        
        // إرسال البيانات المستلمة من تيك توك إلى بلوجر
        res.json(response.data);
    } catch (err) {
        console.error("Error fetching from RapidAPI:", err.message);
        res.status(500).json({ error: "فشل جلب الفيديو من السيرفر" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});