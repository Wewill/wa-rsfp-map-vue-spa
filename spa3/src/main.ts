import { createApp } from "vue";
import "./style.scss";
import "@vueform/multiselect/themes/default.css";
import AppMap from "./AppMap.vue";

/*global wpData:true*/
/*eslint no-undef: "error"*/
// Check if `wpData` is not already defined
if (typeof window.wpData === "undefined") {
	// Define a mock `wpData` object
	window.wpData = {
		template_directory_uri: "http://example.com/wp-content/themes/my-theme",
		app_path: "http://example.com/wp-json",
		rest_url: "http://example.com/wp-json",
		nonce: "abcdef", // Assuming you use a nonce for REST API requests
		post_categories: ["Category 1", "Category 2", "Category 3"],
		geography: ["geography 1", "geography 2", "geography 3"],
		production: ["production 1", "production 2", "production 3"],
		thematic: ["thematic 1", "thematic 2", "thematic 3"],
		label: ["label 1", "label 2", "label 3"],
		// Add more properties as needed to mimic your actual `wpData` structure
	};
}

/**
 * Mount the Vue instance on the DOM element "#wp-vue-app" in the Custom Page Template
 */

createApp(AppMap).mount("#wp-vue-app");
