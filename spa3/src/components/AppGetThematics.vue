<template>
	<div v-if="isDataAvailable" class="rest-data">
		<!-- BEGIN: Thematics -->
		<h6 class="fw-bold">
			Thématique
			<span class="--text-muted --muted fw-medium op-5" v-if="filteredResults.length === wpTerms.length">
				{{ wpTerms.length }}
			</span>
			<span class="--text-muted --muted fw-medium op-5" v-else>
				{{ filteredResults.length }}+
			</span>
		</h6>

		<div class="wrapper position-relative">
			<div class="h-800-px overflow-y-scroll scrollbar-dark me-n3 pe-3">
				<ul class="list-unstyled card-items">
					<app-display-thematic v-for="item in filteredResults" :key="item.id" :search-term="searchTerm"
						:appFilters="appFilters ?? undefined" @onFilterChange="updateFilters($event)" :item="item" role="article" :collapse-states="{}" />
				</ul>
			</div>
			<div class="position-absolute w-100 h-20-px w-100 bottom-0 left-0 bg-v-gradient-color-bg"></div>
		</div>
		<!-- END: Thematics -->
	</div>
	<div v-else>
		<p class="text-center" v-html="apiResponse" />
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, computed } from 'vue';
import axios from 'axios';
import { WpTerms, WpTerm } from '../types/wpTypes'; // Assuming you have a type definition for posts
import AppDisplayThematic from './AppDisplayThematic.vue';
import _ from "lodash";

// Define props with TypeScript
const props = withDefaults(defineProps<{
	searchTerm?: string;
	appFilters?: string[] | undefined;
}>(), {
	searchTerm: '',
	appFilters: () => [],
});

// Reactive data
const apiResponse = ref<string>('');
const wpTerms = ref<WpTerms>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Get props
const { appFilters } = toRefs(props);
// Define emit
const emit = defineEmits(['onFilterChange'])

function updateFilters(filter: string) {
	console.log('updateFilters::', filter, appFilters.value);
	// Emit event to parent component
	if (appFilters.value.includes(filter)) {
		appFilters.value = appFilters.value.filter((item) => item !== filter);
	} else {
		appFilters.value.push(filter);
	}
	emit('onFilterChange', appFilters.value);
}

// Computed property for filtered results
const filteredResults = computed(() => {
	if (wpTerms.value.length) {
		//const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
		const pattern = new RegExp(_.escapeRegExp(_.deburr(props.searchTerm)), 'gi');

		// Verifier
		console.log(_.lowerCase(_.deburr(wpTerms.value.find(t => t.id === 22)?.children?.map(c => c.name).join())));
		console.log(_.lowerCase(_.deburr(wpTerms.value.find(t => t.id === 22)?.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).join())));

		const filteredTerms = wpTerms.value.filter(t =>
			_.lowerCase(_.deburr(t.name)).match(pattern) ||
			_.lowerCase(_.deburr(t.description)).match(pattern) ||
			_.lowerCase(_.deburr(t.vue_meta.content)).match(pattern) ||
			_.lowerCase(_.deburr(t.children?.map(c => c.name).join())).match(pattern)
		);

		if (props.appFilters && props.appFilters.length) {
			return filteredTerms.filter(t =>
				props.appFilters.includes(t.name.toLowerCase()) ||
				// (t.children && !props.appFilters.includes(t.name.toLowerCase())) ? t.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).reduce((a, v) => a || v, false) : false
				t.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).reduce((a, v) => a || v, false)
			);
		} else {
			return filteredTerms;
		}
	}
	return [];
	// if (wpTerms.value.length) {
	//   const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
	//   let filteredTerms = wpTerms.value.map(term => filterTerms(term, pattern)).reduce((acc, val) => acc.concat(val), []);

	//   if (props.appFilters && props.appFilters.length) {
	//     filteredTerms = filteredTerms.filter(t =>
	//       props.appFilters.includes(t.slug.toLowerCase())
	//     );
	//   }

	//   return filteredTerms;
	// }
	// return [];
});

// Mounted lifecycle hook
onMounted(() => {
	fetchData();
});

// Methods
async function fetchData() {
	apiResponse.value = 'Loading ⏳';
	await getTerms('thematic');
}

async function getTerms(route = 'category', namespace = 'wp/v2') {
	console.log('getTerms::', route);
	try {
		const restURL = window.wpData?.rest_url;
		const fields = 'id,slug,name,description,link,count,parent,vue_meta';
		const perPage = 100; // Maximum allowed per page
		let page = 1;
		let allTerms: WpTerms = []; // Array to store all terms

		let hasMoreData = true;

		while (hasMoreData) {
			const response = await axios(`${restURL}/${namespace}/${route}?per_page=${perPage}&page=${page}&_fields=${fields}`);
			const terms = buildHierarchy(response.data);

			allTerms = [...allTerms, ...terms];

			// Check if there are more pages
			const totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
			if (page >= totalPages) {
				hasMoreData = false;
			} else {
				page++;
			}
		}

		wpTerms.value = allTerms;
		isDataAvailable.value = true;
		console.log('Fetched all terms:', allTerms);
	} catch (error) {
		apiResponse.value = `<small>La demande n'a pas pu être traitée! <br> <strong>${error}</strong></small>`;
	}
}

// Build term hierarchy to handle accordion
function buildHierarchy(terms: WpTerm[]): WpTerm[] {
	const map: { [key: number]: WpTerm } = {};
	const roots: WpTerm[] = [];

	terms.forEach(term => {
		if (term.id !== undefined) {
			term.children = [];
			map[term.id] = term;
		}
	});

	terms.forEach(term => {
		if (term.id !== undefined) {
			if (term.parent === 0) {
				roots.push(term);
			} else if (term.parent && map[term.parent]) {
				map[term.parent].children!.push(term);
			}
		}
	});

	return roots;
}
</script>

<style scoped></style>
