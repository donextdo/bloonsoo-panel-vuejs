import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

let development = process.env.NODE_ENV !== 'production'

const axiosInstance = axios.create({
    baseURL: development ? 'http://localhost:9000' : 'http://api.marriextransfer.com'
})

createApp(App)
    .use(store)
    .use(router)
    .provide('axios', axiosInstance)
    .mount('#app')
