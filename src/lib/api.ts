import axios from "axios";
import { API_BASE } from "@/config";

export const api = axios.create({
    baseURL: API_BASE,
    timeout: 10_000,
});

api.defaults.paramsSerializer = (params) => {
    const qs = new URLSearchParams();

    Object.entries(params || {}).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") {
            return;
        }

        if (Array.isArray(v)) {
            v.forEach((x) => qs.append(k, String(x)));
        } else {
            qs.set(k, String(v));
        }
    });
    return qs.toString();
};
