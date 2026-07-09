<!-- 所有畫面，共同使用。  共用顯示元件 -->
<template>
<div class="card mt-4">
    <div class="card-header">
        <h4>FHIR 回傳結果</h4>     
    </div>

    <div class="card-body">
        <p> <strong>Status：</strong> {{ status }} </p>
        <p> <strong>Resource ID：</strong> {{ resourceId }} </p>
        <!-- 使用 textarea 顯示完整 FHIR JSON。 readonly 表示使用者只能複製，不能在這裡修改       -->
        <textarea class="form-control" rows="18" readonly :value="json" />         
        <button class="btn btn-success mt-3" @click="copy"> 複製 JSON </button>      
    </div>
</div>
</template>

<script setup>
const props = defineProps({            //props 是父元件傳進來的資料
    status: Number,                    //HTTP 狀態碼
    resourceId: String,                //FHIR Resource ID
    json: String                       //顯示完整 FHIR JSON 字串
})

function copy () {
    navigator.clipboard.writeText(props.json);
    alert("已複製 JSON");
}
</script>