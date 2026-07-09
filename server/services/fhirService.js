// 負責與 HAPI FHIR Server 溝通
const axios = require("axios");
//  從 .env 讀取 FHIR Server URL
const BASE_URL = process.env.FHIR_BASE;

// 建立 FHIR Resource
// resource.resourceType 會決定送到哪個 endpoint
async function create(resource) {
    const response = await axios.post(`${BASE_URL}/${resource.resourceType}`,
        resource,
        {
            headers: {"Content-Type": "application/fhir+json"}
        }
    );
    return {
        status: response.status,
        data: response.data
    };
}

// 讀取指定 FHIR Resource
async function read (resourceType, id) {
    const response = await axios.get( `${BASE_URL}/${resourceType}/${id}`);
    return{
        status:response.status,
        data:response.data
    };
}

async function search (resourceType, params) {
    const response = await axios.get(`${BASE_URL}/${resourceType}`, {params});
    return{
        status:response.status,
        data:response.data
    };
}

module.exports = {create, read, search};