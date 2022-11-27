import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { plugin, defaultConfig } from '@formkit/vue'
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia, VueAxios, axios, plugin, defaultConfig);
app.mount("#app");
