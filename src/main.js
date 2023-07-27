import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

let development = process.env.NODE_ENV !== "production";

const axiosInstance = axios.create({
  // baseURL: development ? 'http://localhost:9000' : 'https://api.bloonsoo.com'
  // baseURL: 'http://localhost:9000'
  baseURL: "https://api.bloonsoo.com",
  // baseURL: development ? 'https://api.bloonsoo.com' : 'https://api.bloonsoo.com'
});

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .provide("axios", axiosInstance)
  .mount("#app");
