// 定義REST API
// 接收 Vue 傳來的 Organization FHIR JSON，再呼叫 fhirService.create() 寫入 HAPI FHIR Server
const express = require("express");
const router = express.Router();

const logger = require("../utils/logger");
const fhirService = require("../services/fhirService");

router.post("/", async (req, res) => {
    try {
        logger.log("Receive Organization", req.body);
        const result = await fhirService.create(req.body);
        logger.success(
            "Organization",
            result.data.id,
            result.status
        );
        res.status(result.status).json(result.data);
    } catch (err) {
        logger.error("Create Organization Error", err);
        res.status(
            err.response?.status || 500
        ).json(
            err.response?.data || {
                message: err.message
            }
        );
    }
});

module.exports = router;