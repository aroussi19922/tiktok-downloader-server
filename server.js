const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// تفعيل الاتصال من أي مكان (مهم جداً لبلوجر)
app.use(cors());
app.use(express.json());

// 1. معالجة الصفحة الرئيسية (تمنع ظهور Not Found)
app.get("/", (req, res) => {
    res.send("<h1>Server is Live! ✅</h1><p>السيرفر يعمل الآن وجاهز لاستقبال الطلبات من بلوجر</p>");
});

// 2. مسار التحميل الذي يطلبه كود بلوجر الخاص بك
app.get("/api/download", async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: "الرجاء توفير رابط الفيديو" });
    }

    try {
        const options = {
            method: 'GET',
            url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
            params: { url: videoUrl, hd: '1' },
            headers: {
                'x-rapidapi-key': process.env.MY_TIKTOK_KEY, // سيقرأ المفتاح من الصورة التي أرفقتها
                'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        
        // إرسال البيانات لكود بلوجر
        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "حدث خطأ أثناء جلب الفيديو من RapidAPI" });
    }
});

// تشغيل السيرفر على المنفذ المطلوب
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
