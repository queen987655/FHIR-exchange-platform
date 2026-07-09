
const express = require("express");
const router = express.Router();

const logger = require("../utils/logger");
const fhirService = require("../services/fhirService");

// 建立 Patient
router.post("/", async (req, res) => {
    try {
        const result = await fhirService.create(req.body);
        logger.success(
            "Patient",
            result.data.id,
            result.status
        );
        res.status(result.status).json({
            status: result.status,
            resourceId: result.data.id,
            resource: result.data
        });
    } catch (err) {
        logger.error( "Create Patient Error", err );
        return res.status( err.response?.status || 500 ).json( err.response?.data || { message: err.message });
    }
});

// 查詢指定 Patient
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        logger.log(`Search Patient : ${id}`);
        const result = await fhirService.read(
            "Patient",
            id
        );
        logger.success(
            "Patient",
            result.data.id,
            result.status
        );
        res.status(result.status).json(result.data);
    }
    catch(err){
        logger.error( "Search Patient Error", err );
        res.status( err.response?.status || 500 ).json( err.response?.data || {message: err.message});
    }
});

// 查詢某 Organization 底下所有 Patient
//  FHIR Server 實際收到：GET /Patient?organization={organizationId}
router.get("/organization/:id", async (req, res) => {
    try {
        const organizationId = req.params.id;
        logger.log(`Search Patients by Organization : ${organizationId}`);
        const result = await fhirService.search ( "Patient", { organization: organizationId });
        logger.success( "Patient Search", organizationId, result.status );
        res.status(result.status).json(result.data);
    }
    catch (err) {
        logger.error( "Search Organization Patient", err);
        res.status( err.response?.status || 500).json( err.response?.data || { message: err.message });
    }
});

module.exports = router;