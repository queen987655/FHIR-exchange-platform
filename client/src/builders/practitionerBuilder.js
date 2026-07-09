// 建立 Practitioner Resource
export function buildPractitioner(data) {
    return {
        resourceType: "Practitioner",
        meta: {
            profile: [
                "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/Practitioner-twcore"
            ]
        },
        identifier: [
            {
                system: "https://www.mohw.gov.tw",
                value: data.identifier
            }
        ],
        active: true,
        name: [
            {
                use: "official",
                text: data.name
            }
        ],
        gender: data.gender
    };
}