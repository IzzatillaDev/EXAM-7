import axios from "axios";
import { getDataFromCookie } from "../../utils/data-service";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


request.interceptors.request.use((config) => {
    const token = getDataFromCookie("token")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

export default request