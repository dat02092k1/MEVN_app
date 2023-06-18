import axios from 'axios';

const axiosIns = axios.create({
    baseURL: 'https://mevnapp-server.up.railway.app/api'
});


axiosIns.interceptors.response.use((response) => {
    return (response);
}, async (err) => {
    const originalRequest = err.config;
    console.log(originalRequest.headers.token);

    // if (err.response.status === 500) {
    //     const newRefreshToken = '8939n3xmx33nzja2'
    //     const newAccessToken = '982nxm02'
    //     const refreshToken = localStorage.setItem('refreshToken', newRefreshToken);
    //     const accessToken = localStorage.setItem('accessToken', newAccessToken); 
  
    //     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //     return axiosIns(originalRequest);
    //   }

    return Promise.reject(err);
});

export { axiosIns };
