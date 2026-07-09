// 設定 Vue Router
// 由 Vue Router 根據網址切換不同元件
import { createRouter, createWebHistory } from "vue-router";
import Practitioner from "../views/Practitioner.vue";
import Organization from "../views/Organization.vue";
import Patient from "../views/Patient.vue";
import Query from "../views/Query.vue";

const routes = [
    {
        path: "/organization",
        component: Organization
    },
    {
        path: "/practitioner",
        component: Practitioner
    },
    {
        path: "/patient",
        component: Patient
    },
    {
        path: "/query",
        component: Query
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;