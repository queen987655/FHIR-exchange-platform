<template>

    <div class="container mt-4">
        <h2>建立 Practitioner</h2>
        <div class="mb-3">
            <label>醫師代碼</label>
            <input class="form-control" v-model="identifier" placeholder="例如：123456">
        </div>
        <div class="mb-3">
            <label>姓名</label>
            <input class="form-control" v-model="name" placeholder="例如：王小明">
        </div>
        <div class="mb-3">
            <label>性別</label>
            <select class="form-control" v-model="gender">
                <option value="male">男</option>
                <option value="female">女</option>
            </select>
        </div>
        <button class="btn btn-primary" @click="createPractitioner"> 建立 Practitioner </button>

<FhirResult
:status="status"
:resourceId="resourceId"
:json="fhirJson"
/>
</div>
</template>

<script setup>

import { ref } from "vue";
import axios from "axios";
import FhirResult from "../components/FhirResult.vue";
import { buildPractitioner } from "../builders/practitionerBuilder";

const identifier = ref("");
const name = ref("");
const gender = ref("male");
const resourceId = ref("");
const status = ref("");
const fhirJson = ref("");

async function createPractitioner () {
    try {
        const practitioner = buildPractitioner({
            identifier: identifier.value,
            name: name.value,
            gender: gender.value
});
    const result = await axios.post ("http://localhost:3000/api/practitioner",practitioner);
    status.value = result.status;
    resourceId.value = result.data.id;

    fhirJson.value = JSON.stringify( result.data, null, 2 );
}   catch (err) {
        status.value = err.response?.status || 500;
        resourceId.value = "";
        fhirJson.value = JSON.stringify(err.response?.data || {message: err.message}, null, 2 );
    }
}
</script>