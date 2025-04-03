import { createApp } from "vue";
import "./style.scss";
import "@vueform/multiselect/themes/default.css";
import AppMap from "./AppMap.vue";

/**
 * Mount the Vue instance on the DOM element "#wp-vue-app" in the Custom Page Template
 */

createApp(AppMap).mount("#wp-vue-app");
