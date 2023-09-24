import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = import.meta.env.VITE_BACKEND_HTTP;

export const api = axios.create({
    baseURL,
})

export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})

authAxios.interceptors.request.use(async (config) => {
    const access = localStorage.getItem('access')

    config.headers = {
        'Authorization': `Bearer ${access}`,
    }

    const decoded = jwt_decode(access)

    const exp = new Date(decoded.exp * 1000)
    const now = new Date()
    const five = 1000 * 60 * 5

    if(exp.getTime() - now.getTime() < five) {

        try {
            const oldRefresh = localStorage.getItem('refresh')
            const res = await api.post('/users/refresh/', { oldRefresh })
            const { access, refresh } = res.data

            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)

        } catch(err) {
            localStorage.clear()
            window.location.href = '/'
        }
    } else {
        return config
    }

    return config
})

