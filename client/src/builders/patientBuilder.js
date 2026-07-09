// 建立 Patient Resource
// 需要Reference Organization及Practitioner資訊
export function buildPatient(data) {
    return {
        resourceType: "Patient",
        meta: {
            profile: [
                "https://twcore.mohw.gov.tw/ig/twcore/StructureDefinition/Patient-twcore"
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
        gender: data.gender,
        birthDate: data.birthDate,
        managingOrganization:{
                reference: `Organization/${data.organizationId}`
            },
        generalPractitioner: [
            {
                reference: `Practitioner/${data.practitionerId}`
            }
        ]
    };
}