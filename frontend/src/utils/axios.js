import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        '' : 'http://localhost:4000'
})


axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function(response){
    return response;
}, function(error){
    if(error.response.date == 'jwt expired'){
        window.location.reload();
    }
})

export default axiosInstance;