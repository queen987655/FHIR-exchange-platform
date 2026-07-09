// 接收 Vue 傳來的 Practitioner FHIR JSON，再送到 HAPI FHIR Server 建立醫事人員 Resource
const express = require("express");
const router = express.Router();

const logger = require("../utils/logger");
const fhirService = require("../services/fhirService");

router.post("/", async (req, res) => {
    try {
        logger.log("Receive Practitioner", req.body);
        const result = await fhirService.create(req.body);
        logger.success(
            "Practitioner",
            result.data.id,
            result.status
        );
        res.status(result.status).json(result.data);
    } catch (err) {
        logger.error("Create Practitioner Error", err);
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