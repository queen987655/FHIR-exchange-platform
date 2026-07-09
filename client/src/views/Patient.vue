<template>
<div class="container mt-4">
    <h2>建立 Patient</h2>
    <div class="mb-3">
        <label>身分證字號</label>
        <input class="form-control" v-model="identifier" placeholder="例如：A123456789">
    </div>
    <div class="mb-3">
        <label>姓名</label>
        <input class="form-control" v-model="name" placeholder="陳小巨">
    </div>
    <div class="mb-3">
        <label>性別</label>
        <select class="form-select" v-model="gender">
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
            <option value="unknown">未知</option>
        </select>
    </div>
    <div class="mb-3">
        <label>出生日期</label>
        <input type="date" class="form-control" v-model="birthDate">
    </div>
    <div class="mb-3">
        <!-- 這裡輸入的是 FHIR Server 建立後回傳的 ID -->
        <label>Organization Resource ID</label>
        <input class="form-control" v-model="organizationId" placeholder="例如：1324789">
    </div>
    <div class="mb-3">
        <label>Practitioner Resource ID</label>
        <input class="form-control" v-model="practitionerId" placeholder="例如：1442676">
    </div>
    <button class="btn btn-primary" @click="createPatient"> 建立 Patient </button>
    
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
import { buildPatient } from "../builders/patientBuilder";
import { createPatient as savePatient } from "../services/patientService";

const identifier = ref("");
const name = ref("");
const gender = ref("male");
const birthDate = ref("");
const organizationId = ref("");
const practitionerId = ref("");

const status = ref("");
const resourceId = ref("");
const fhirJson = ref("");

async function createPatient() {
    try {
        const patient = buildPatient({
            identifier: identifier.value,
            name: name.value,
            gender: gender.value,
            birthDate: birthDate.value,
            organizationId: organizationId.value,
            practitionerId: practitionerId.value
        });
        const result = await savePatient(patient);
        status.value = result.status;
        resourceId.value = result.resourceId;
        fhirJson.value = JSON.stringify( result.resource, null, 2 );
    }
    catch (err) {
        status.value = err.response?.status || 500;
        resourceId.value = "";
        fhirJson.value = JSON.stringify(err.response?.data || { message: err.message}, null, 2 );
        }
}
</script>