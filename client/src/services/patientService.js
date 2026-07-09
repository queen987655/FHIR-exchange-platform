// 把 Patient Resource 傳給 Express
// 呼叫 Express 後端的 Patient API
import axios from "axios";
import { API_BASE } from "../config/api";
const API = `${API_BASE}/patient`;

// 建立 Patient
export async function createPatient(resource) {
    const response = await axios.post(API, resource);
    return response.data;
}

// 查詢指定 Patient Resource
export async function getPatient(id) {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
}

// 查詢某個 Organization 底下的所有 Patient
export async function getPatientsByOrganization(id) {
    const response = await axios.get(`${API}/organization/${id}`);
    return response.data;
}