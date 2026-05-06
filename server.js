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
                // تأكد من وضع مفتاحك هنا
                "x-rapidapi-key": "820b95c15bmshea62780db1f1771p18b997jsndd50fbd9367d",
                "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com"
            }
        });
        res.json(response.data);
    } catch (err) {
        res.json({ error: "فشل الجلب" });
    }
});

app.listen(3000, () => {
    console.log("السيرفر يعمل الآن على: http://localhost:3000");
});