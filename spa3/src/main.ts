import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

/**
 * Mount the Vue instance on the DOM element "#wp-vue-app" in the Custom Page Template
 */

createApp(App).use(router).mount("#wp-vue-app");
