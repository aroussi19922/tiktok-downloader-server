const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/api/download", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.json({ error: "ضع رابط الفيديو" });

    try {
        const response = await axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com/", {
            params: { url: url },
            headers: {
                // هنا قمنا بتغيير المفتاح ليكون مخفياً (متغير بيئة)
                "x-rapidapi-key": process.env.MY_TIKTOK_KEY, 
                "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com"
            }
        });
        res.json(response.data);
    } catch (err) {
        res.json({ error: "فشل الجلب" });
    }
});

// تعديل بسيط ليعمل السيرفر على أي منفذ توفره الاستضافة
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل الآن على المنفذ: ${PORT}`);
});