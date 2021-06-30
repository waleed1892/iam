import axios from "axios";
import {authHeader} from "../helpers/authHeader";
import router from "../router/router";

const apiService = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: authHeader()
});

apiService.interceptors.response.use(res => {
        return res
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                if (router.currentRoute.name !== 'login') {
                    router.push('/login').then(() => {
                        localStorage.removeItem('token')
                        apiService.defaults.headers = authHeader()
                    })
                }
            }
        }
    }
)
export default apiService

