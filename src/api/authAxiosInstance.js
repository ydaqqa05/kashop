import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { useAuthStore } from "../store/useAuthStore";
import i18n from "../i18next";
const authaxiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
    withCredentials:true,
})

authaxiosInstance.interceptors.request.use((config)=>{
    const {token}=useAuthStore.getState()
    config.headers["Accept-Language"]=i18n.language;
    config.headers["Authorization"]=`Bearer ${token}`
    return config
})
authaxiosInstance.interceptors.response.use((response)=>response,async (error)=>{
    const originalRequest=error.config
    if(error.response?.status==401 && !originalRequest._retry)
    {
        originalRequest._retry=true
        try{
const refreshResponse = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/RefreshToken',{},{
withCredentials:true,
});
const newAccessToken=refreshResponse.data.accessToken;
console.log(refreshResponse)
useAuthStore.getState().setToken(newAccessToken);
originalRequest.headers.Authorization=`Bearer ${newAccessToken}`
return authaxiosInstance(originalRequest)
        }catch(error){
            console.log("error")
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
}
)
export default authaxiosInstance