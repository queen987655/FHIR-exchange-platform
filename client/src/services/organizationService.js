// 呼叫 Express 後端的 Organization API
import axios from "axios";
import { API_BASE } from "../config/api";

// Organization API 基礎路徑
const API = `${API_BASE}/organization`;

export async function createOrganization(resource) {
    return await axios.post(API, resource);          //回傳 response.data
}