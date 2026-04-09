import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { useAuthStore } from "../store/useAuthStore";
const {token,setToken}=useAuthStore.getState()
const authaxiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
    withCredentials:true,
    headers: {
        "Accept-Language": "en",
         Authorization: `Bearer ${token}`
    }
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
            console.log(error)
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
}
)
export default authaxiosInstance