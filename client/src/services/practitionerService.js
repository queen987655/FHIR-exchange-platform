// 呼叫 Express 後端的 Practitioner API
import axios from "axios";
import { API_BASE } from "../config/api";

const API = `${API_BASE}/practitioner`;

export async function createPractitioner(resource) {
    return await axios.post(API, resource);
}