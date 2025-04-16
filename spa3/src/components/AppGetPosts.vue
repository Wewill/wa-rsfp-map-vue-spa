<template>

	<div v-if="isDataAvailable" class="rest-data">

		<!-- Template considering route -->
		<!-- Directory -->
		<template v-if="route === 'directory'">

			<!-- Title + number of Posts -->
			<div class="d-flex justify-content-between align-items-center">
				<h6 class="fw-bold">Savoir-faire <span
						class="----text-muted --muted fw-medium op-5 --muted fw-medium op-5"
						v-if="filteredResults.length === wpPosts.length">{{ wpPosts.length }}</span><span
						class="--text-muted --muted fw-medium op-5" v-else>{{ filteredResults.length }}+</span></h6>
				<!-- <div class=""><button type="button" class="btn --btn-sm --p-0 --btn-light py-0 px-1 mb-0"><i
							class="bi bi-plus h3 text-light"></i></button></div> -->
			</div>

			<!-- Results -->
			<!-- <div class="wrapper position-relative">
				<div class="h-550-px overflow-y-scroll scrollbar-white me-n3 pe-3">
					<ul class="list-unstyled card-items d-flex flex-column align-items-center mb-2"> -->
			<!-- <div class="wrapper position-relative">
				<div class="--h-550-px overflow-x-scroll scrollbar-white --me-n3 --ps-3 --pe-0 container-xl"> -->

			<!-- Results in a grid w/ x scroll : https://codepen.io/WAGxW/pen/emmORzM -->
			<!-- <div class="grid-scroll-wrapper border rounded"> -->

			<!-- Results in a grid w/ x scroll : https://codepen.io/WAGxW/pen/emmORzM -->
			<div class="overflow-y-hidden overflow-x-scroll scrollbar-dark ps-2 ms-n2"><!-- ps-2 ms-n2 prevents overflow for animated thumbs-->
					<ul class="grid-list p-0 m-0 list-unstyled card-items align-items-center mb-2">

						<!-- AppDisplayDirectory Component -->
						<app-display-directory v-for="postType in filteredResults" :key="postType.id"
							:search-term="searchTerm" :post-type="postType" role="article">
							<!-- AppDisplayDirectory is called for each post in the filteredResults -->
						</app-display-directory>

						<!-- <li class="d-flex align-items-center justify-content-center"><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></li> -->
					</ul>
					<!-- Plus button -->
					<!-- <div class="d-flex flex-center"><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></div> -->

				</div>
				<div class="position-absolute w-100 h-20-px w-100 bottom-0 left-0 bg-v-gradient-action-3 d-none"></div>
			<!-- </div> -->

		</template>

		<!-- Farm -->
		<template v-else-if="route === 'farm'">

			<!-- Title + number of Posts -->
			<div class="d-flex justify-content-between align-items-center">
				<h6 class="fw-bold">Ferme <span class="--text-muted --muted fw-medium op-5"
						v-if="filteredResults.length === wpPosts.length">{{ wpPosts.length }}</span><span
						class="--text-muted --muted fw-medium op-5" v-else>{{ filteredResults.length }}+</span></h6>
				<div class=""><button type="button" class="btn --btn-sm --p-0 --btn-light py-0 px-1 mb-0"><i
							class="bi bi-plus h3 text-light"></i></button></div>
			</div>

			<div class="h-300-px overflow-y-scroll scrollbar-white me-n3 pe-3">
				<ul
					class="--farm-slide list-unstyled card-items --d-flex --flex-grid row g-2 g-lg-1 align-items-start justify-content-between --mb-4">

					<!-- AppDisplayFarm Component -->
					<app-display-farm v-for="postType in filteredResults" :key="postType.id" :search-term="searchTerm"
						:post-type="postType" role="article">
						<!-- AppDisplayFarm is called for each post in the filteredResults -->
					</app-display-farm>

					<!-- <li class="d-flex align-items-center justify-content-center"><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></li> -->
				</ul>
			</div>
			<!-- Plus button -->
			<!-- <div class="d-flex flex-center"><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></div> -->

		</template>

		<!-- Posts -->
		<template v-else>

			<!-- Number of Posts -->
			<small v-if="filteredResults.length === wpPosts.length">
				{{ wpPosts.length }} Posts
			</small>
			<small v-else>
				Found {{ filteredResults.length }} of {{ wpPosts.length }}
			</small>

			<div class="card-group" v-if="route === 'posts'">

				<!-- AppDisplayPost Component -->
				<app-display-post v-for="postType in filteredResults" :key="postType.id" :search-term="searchTerm"
					:post-type="postType" role="article">
					<!-- AppDisplayPost is called for each post in the filteredResults -->
				</app-display-post>

			</div><!-- .card-group -->
		</template>

	</div><!-- .rest-data -->
	<div v-else>
		<p class="text-center" v-html="apiResponse" />
	</div>

	<!-- <code>DEBUG : {{ route }}</code>
<code>wpPosts = {{ wpPosts }}</code> -->
	<!-- <pre>wpData = {{ wpData }}</pre> -->

</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';
import AppDisplayPost from './AppDisplayPost.vue';
import AppDisplayDirectory from './AppDisplayDirectory.vue';
import AppDisplayFarm from './AppDisplayFarm.vue';
import { WpPosts } from '../types/wpTypes'; // Assuming you have a type definition for posts
import _ from "lodash";

// Define props with TypeScript
const props = withDefaults(defineProps<{
	searchTerm?: string;
	appFilters?: string[];
	opentostageFilter?: boolean;
	opentovisitFilter?: boolean;
	route?: string;
	fetchNow?: number;
}>(), {
	searchTerm: '',
	appFilters: () => [], // Use a factory function for default array to avoid shared state
	opentostageFilter: false,
	opentovisitFilter: false,
	route: 'posts',
	fetchNow: 1,
});

// const wpData = ref(window.wpData); // Use a more specific type if available


// Reactive data
const apiResponse = ref<string>('');
const wpPosts = ref<WpPosts>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Computed property for filtered results
const filteredResults = computed(() => {
	if (wpPosts.value.length) {
		const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
		// const filteredPosts = wpPosts.value.filter((post) =>
		//   post.title.rendered.match(pattern) ||
		//   post.vue_meta.custom_excerpt.match(pattern)
		// );
		const filteredPosts = wpPosts.value.filter((post) =>
			(
				_.lowerCase(_.deburr(post.title.rendered)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.additionnal_content)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.custom_excerpt)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.content)).match(pattern)
			)
			&&
			(
				(!props.opentostageFilter && !props.opentovisitFilter) ||
				(props.opentostageFilter && post.vue_meta.opentostage) ||
				(props.opentovisitFilter && post.vue_meta.opentovisit) ||
				(props.opentostageFilter && props.opentovisitFilter && post.vue_meta.opentostage && post.vue_meta.opentovisit)
			)
		);


		if (props.appFilters && props.appFilters.length) {
			return filteredPosts.filter((post) =>
				post.vue_meta.terms.some((term) =>
					props.appFilters.includes(term.toLowerCase())
				)
			);
		} else {
			return filteredPosts;
		}
	}
	return [];
});

// Watching `fetchNow` prop for changes to trigger `fetchData`
watch(() => props.fetchNow, (newVal) => {
	if (newVal > 0) {
		fetchData();
	}
});

// Mounted lifecycle hook
onMounted(() => {
	fetchData();
});

// Methods
async function fetchData() {
	apiResponse.value = 'Loading ⏳';
	await getPosts(props.route);
}

async function getPosts(route = 'posts', namespace = 'wp/v2') {
	console.log('getPosts::', route)
	try {
		const postsPerPage = 100;
		const restURL = window.wpData?.rest_url;
		const fields = 'id,title,link,vue_meta'; //content,author,parent,menu_order

		const response = await axios(`${restURL}/${namespace}/${route}?per_page=${postsPerPage}&page=1&_fields=${fields}`);

		wpPosts.value = response.data;
		isDataAvailable.value = true;

		// Handle pagination...
		// Refer to the original method for additional pagination logic
	} catch (error) {
		apiResponse.value = `The request could not be processed! <br> <strong>${error}</strong>`;
	}
}
</script>

<style scoped>
    /* .grid-scroll-wrapper {
      overflow-x: auto;
      padding: 1rem;
    } */

    .grid-list {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(5, 1fr); /* 5 éléments en hauteur */
      gap: 0; /*.5rem;*/
	  row-gap: 0.5rem;
    }

    .grid-list li {
		min-width: 350px;
		max-width: 450px;
    }
  </style>
