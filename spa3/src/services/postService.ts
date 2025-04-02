// src/services/postService.ts
import axios from 'axios';
import { ref } from 'vue';
import { WpPosts } from '../types/wpTypes'; // Assuming you have a type definition for posts

export const apiResponse = ref<string>('');
export const wpPosts = ref<WpPosts>([]); // Use a more specific type if available
export const isDataAvailable = ref<boolean>(false);

export async function getPosts(routes = ['directory', 'farm', 'operation', 'structure'], namespace = 'wp/v2', s = '') {
	console.log('getPosts::', routes, namespace, s);
	try {
	  const postsPerPage = 100;
	  const restURL = window.wpData.rest_url;
	  const fields = 'id,title,vue_meta';
	  let allPosts = <WpPosts>[];

	  // Boucle sur chaque route (post type)
	  for (const route of routes) {
		// Construction de l'URL pour chaque route
		let url = `${restURL}/${namespace}/${route}?per_page=${postsPerPage}&page=1&_fields=${fields}`;
		if (s) {
		  url += `&search=${encodeURIComponent(s)}`; // Ajout du paramètre de recherche 's'
		}

		const response = await axios(url);

		// Concaténer les résultats de chaque route à allPosts
		allPosts = allPosts.concat(response.data);
	  }

	  // Mise à jour de wpPosts avec les données de toutes les routes
	  wpPosts.value = allPosts;
	  isDataAvailable.value = true;

	  // Gestion de la pagination à ajouter ici, si nécessaire

	} catch (error) {
	  apiResponse.value = `The request could not be processed! <br> <strong>${error}</strong>`;
	}
  }
