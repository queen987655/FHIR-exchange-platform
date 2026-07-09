// 建立符合 TW Core Profile 的 Organization Resource
// 接收畫面輸入資料，組成 FHIR JSON
export function buildOrganization(data) {
    return {
        resourceType: "Organization",
        meta: {
            profile: [
                "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/Organization-hosp-twcore"
            ]
        },
        active: true,       // 是否啟用
        name: data.name
    };
}