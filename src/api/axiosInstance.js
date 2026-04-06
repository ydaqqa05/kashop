import axios from "axios";
import i18n from "../i18next";
export const axiosInstance= axios.create({
    baseURL:'https://knowledgeshop.runasp.net/api',
    withCredentials: true
    
});

axiosInstance.interceptors.request.use((config) => {
    const lang = i18n.language?.split('-')[0] || 'en';
    config.headers["Accept-Language"] = lang;
    console.log("LANG SENT:", lang);
    return config;
});
export default axiosInstance