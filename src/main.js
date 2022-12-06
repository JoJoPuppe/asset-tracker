import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import router from "./router/index.js";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

console.log(router);

app.use(router);
app.use(pinia);
app.mount("#app");
