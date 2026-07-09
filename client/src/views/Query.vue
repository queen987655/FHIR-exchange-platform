<template>
<!-- 查詢指定 Patient、查詢某 Organization 底下所有 Patient -->
<div class="container mt-4">
    <h2>FHIR Patient 查詢</h2>
    <hr>
    <h4>查詢指定 Patient</h4>
    <div class="mb-3">
        <label> Patient Resource ID </label>
        <input class="form-control" v-model="patientId" />
    </div>
    <button class="btn btn-primary" @click="searchPatient"> 查詢 Patient </button>
    <hr>
    <h4> 查詢 Organization 所有 Patient </h4>
    <div class="mb-3">
        <label> Organization Resource ID </label>
        <input class="form-control" v-model="organizationId" />
    </div>
    <button class="btn btn-success" @click="searchOrganization"> 查詢所有 Patient </button>

<FhirResult
:status="status"
:resourceId="resourceId"
:json="fhirJson"
/>
</div>
</template>

<script setup>
import { ref } from "vue";
import FhirResult from "../components/FhirResult.vue";
import { getPatient, getPatientsByOrganization } from "../services/patientService";

const patientId = ref("");
const organizationId = ref("");
const status = ref("");
const resourceId = ref("");
const fhirJson = ref("");

async function searchPatient () {
    try{
        const patient = await getPatient ( patientId.value);
        status.value = 200;
        resourceId.value = patient.id;
        fhirJson.value = JSON.stringify ( patient, null, 2 );
    }
    catch(err) { status.value = err.response?.status || 500; resourceId.value=""; 
    fhirJson.value = JSON.stringify( err.response?.data || { message:err.message }, null, 2 );
    }
}

async function searchOrganization () {
    try{
        const bundle = await getPatientsByOrganization (organizationId.value );
        status.value = 200;
        resourceId.value = "Bundle";
        fhirJson.value = JSON.stringify ( bundle, null, 2 );
    }
    catch(err){
        status.value = err.response?.status || 500; resourceId.value=""; 
        fhirJson.value = JSON.stringify ( err.response?.data || { message:err.message }, null, 2 );
    }
}
</script>