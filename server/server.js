// Express 後端主入口檔案
// 啟動 Express,Server、載入環境變數.env、啟用 CORS、啟用 JSON Body Parser、掛載各個 Resource Route

// 載入 .env，讓 process.env 可以讀取 FHIR_BASE、PORT 等設定
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
// 使用 .env 的 PORT
const PORT = 3000;

// 啟用 CORS，讓 Vue 前端 http://localhost:5173，可以呼叫 Express 後端 http://localhost:3000
app.use(cors());
// 啟用 JSON Body Parser，讓 Express 可以讀取 req.body 裡面的 JSON
app.use(express.json());

// 匯入各個路由檔案
const patientRoute = require("./routes/patient");
const organizationRoute = require("./routes/organization");
const practitionerRoute = require("./routes/practitioner");

// 掛載 API 路由
app.use("/api/patient", patientRoute);
app.use("/api/organization", organizationRoute);
app.use("/api/practitioner", practitionerRoute);

// 測試用首頁，可用瀏覽器開啟：http://localhost:3000
app.get("/", (req, res) => {
    res.send("FHIR Exchange Server");
});

// 啟動 Server
app.listen(PORT, () => {
    console.log(`Server started : http://localhost:${PORT}`);
});