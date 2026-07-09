// 統一管理 Server Console Log
// 建立 Resource 時可以清楚看到流程，發生錯誤時容易 Debug，讓 Organization、Practitioner、Patient 共用同一套 Log 格式
function log(title, data) {
    console.log("\n===================================");
    console.log(title);
    if (data) {
        console.log(JSON.stringify(data, null, 2));
    }
    console.log("===================================\n");
}

function success(resourceType, id, status) {
    console.log("******** SUCCESS ********");
    console.log("Resource :", resourceType);
    console.log("Resource ID :", id);
    console.log("Status :", status);
    console.log("*************************\n");
}

function error(title, err) {
    console.log("!!!!!!!! ERROR !!!!!!!!");
    console.log(title);
    if (err.response) {
        console.log(err.response.status);
        console.log(JSON.stringify(err.response.data, null, 2));
    } else {
        console.log(err.message);
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
}

module.exports = {log, success, error};