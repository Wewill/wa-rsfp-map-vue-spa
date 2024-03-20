import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import AppQuickSearch from '../components/AppQuickSearch.vue';
import AppMap from '../components/AppMap.vue';

/*global wpData:true*/
/*eslint no-undef: "error"*/
// Assuming wpData is globally defined, you might want to provide a more specific type here
// declare global {
//   interface Window { wpData: any; }
// }

// Check if `wpData` is not already defined
if (typeof window.wpData === 'undefined') {
	// Define a mock `wpData` object
	window.wpData = {
	  template_directory_uri: 'http://example.com/wp-content/themes/my-theme',
	  app_path: 'http://example.com/wp-json',
	  rest_url: 'http://example.com/wp-json',
	  nonce: 'abcdef', // Assuming you use a nonce for REST API requests
	  post_categories: ['Category 1', 'Category 2', 'Category 3'],
		geography: ['geography 1', 'geography 2', 'geography 3'],
		production: ['production 1', 'production 2', 'production 3'],
		thematic: ['thematic 1', 'thematic 2', 'thematic 3'],
	  // Add more properties as needed to mimic your actual `wpData` structure
	};
  }


const appPath = `/${window.wpData.app_path}`;

/**
 * Define your routes using the RouteRecordRaw type for better type checking
 */
/**
 * Each route should map to a component.
 * The "component" can either be an actual component or just a component options object.
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/map',
    name: 'Map',
    component: AppMap,
  },
  // {
  //   path: '/advanced',
  //   name: 'CustomSearch',
  //   component: AppCustomSearch,
  // },
  {
    path: '/:catchAll(.*)', // Updated to use the Vue Router 4 syntax for catch all routes
    redirect: { name: 'Map' },
  },
];

const router = createRouter({
  history: createWebHashHistory(appPath), // Use createWebHashHistory for hash mode // path of the SPA relative to the domain.
  routes,
});

export default router;

/*
 * Note: Vue Router 4 (for Vue 3) changes some of the syntax from Vue Router 3 (for Vue 2).
 * For example, the wildcard route syntax and the history mode factory function have been updated.
 * Make sure to refer to the Vue Router 4 documentation for more details on migration and usage.
 */

/*
 * Note: Turning on the HTML5 History Mode with "mode: 'history'" will eliminate the '#' in the URLs. However, as we're loading Vue on a Custom Page Template, the main routing is still handled by WordPress. As a result a page refresh of directly loading a Vue specific link will return 404 Not Found.
 * With the '#' in the URL the Vue specific link will work as regular link.
 * e.g.
 * http://wpvue.test/search-page/#/videos will work directly or even on page refresh but
 * http://wpvue.test/search-page/videos will not as WordPress will try to look for it.
 */
