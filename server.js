const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>SUCCESS: Bridge is Open! ✅</h1>");
});

app.get("/api/download", (req, res) => {
    res.json({ message: "API is working!" });
});

app.listen(process.env.PORT || 10000);
