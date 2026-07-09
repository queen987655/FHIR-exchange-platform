<!-- 使用者輸入醫療院所名稱後，前端會透過 organizationBuilder.js 產生 FHIR JSON，再透過 organizationService.js 送到 Expres -->
<template>
<div class="container mt-4">
    <h2>建立 Organization</h2>
    <div class="mb-3">
        <label class="form-label"> 醫療院所名稱 </label>
        <!-- v-model="organizationName" 表示輸入框內容會和 organizationName 這個 ref 綁定。 -->
        <input class="form-control" v-model="organizationName" placeholder="例如：台大醫院">
    </div>

    <!-- 建立按鈕，點擊後呼叫 createOrganization 函式-->
    <button class="btn btn-primary" @click="createOrganization"> 建立 Organization </button>
    <hr>
<FhirResult
:status="status"
:resourceId="resourceId"
:json="fhirJson"
/>
</div>
</template>

<script setup>
// 宣告畫面資料，呼叫 Builder 建立 FHIR JSON，呼叫 Service 送到 Express，將結果顯示到畫面
import { ref } from "vue";
import FhirResult from "../components/FhirResult.vue";
import { buildOrganization } from "../builders/organizationBuilder";
import { createOrganization as saveOrganization } from "../services/organizationService";

const organizationName = ref("");        //使用者輸入的醫療院所名稱
const status = ref("");                  //API 回傳狀態碼  例如：201 Created、400 Bad Request、500 Server Error
const resourceId = ref("");              //FHIR Server 建立後回傳的 Resource ID
const fhirJson = ref("");                //要顯示在 textarea 的完整 FHIR JSON 字串

async function createOrganization () {
    try {
        const organization = buildOrganization({ name: organizationName.value });
        const result = await saveOrganization( organization );
        status.value = result.status;
        resourceId.value = result.data.id;
        fhirJson.value = JSON.stringify( result.data, null, 2 );
    }
    // 如果建立失敗，例如 FHIR Server 回傳 OperationOutcome，就把錯誤內容顯示在畫面上。
    catch (err) {
        status.value = err.response?.status || 500;
        resourceId.value = "";
        fhirJson.value = JSON.stringify( err.response?.data || { message: err.message }, null, 2 );
    }
}
</script>