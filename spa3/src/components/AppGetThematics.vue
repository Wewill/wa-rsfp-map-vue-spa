<template>
	  <div
    v-if="isDataAvailable"
    class="rest-data">
	<!-- BEGIN: Thematics -->
	<!-- Title + number of Terms -->
	<h6 class="fw-bold">Thématique <span class="text-muted" v-if="filteredResults.length === wpTerms.length">{{ wpTerms.length }}</span><span class="text-muted" v-else>{{ filteredResults.length }}+</span></h6>

	<div class="h-200-px overflow-y-scroll scrollbar-white me-n3 pe-3">
		<ul class="list-unstyled card-items">
			<!-- AppDisplayThematic Component -->
			<app-display-thematic
			v-for="item in filteredResults"
			:key="item.id"
			:search-term="searchTerm"
			:item="item"
			role="article" >
			<!-- AppDisplayThematic is called for each post in the filteredResults -->
			</app-display-thematic>
		</ul>
	</div>
	<!-- END: Thematics -->
</div><!-- .rest-data -->
  <div v-else>
    <p
      class="text-center"
      v-html="apiResponse" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';
import { WpTerms } from '../types/wpTypes'; // Assuming you have a type definition for posts
import AppDisplayThematic from './AppDisplayThematic.vue';

// Define props with TypeScript
const props = withDefaults(defineProps<{
  searchTerm?: string;
  appFilters?: string[];
//   route?: string;
//   fetchNow?: number;
}>(), {
  searchTerm: '',
  appFilters: () => [], // Use a factory function for default array to avoid shared state
//   route: 'posts',
//   fetchNow: 1,
});

// Reactive data
const apiResponse = ref<string>('');
const wpTerms = ref<WpTerms>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Computed property for filtered results
const filteredResults = computed(() => {
  if (wpTerms.value.length) {
    const pattern = new RegExp(props.searchTerm, 'i');
    const filteredTerms = wpTerms.value.filter((t) =>
      t.name.match(pattern) ||
      t.description.match(pattern) ||
      t.vue_meta.content.match(pattern)
    );

    if (props.appFilters && props.appFilters.length) {
      return filteredTerms.filter((t) =>
          props.appFilters.includes(t.slug.toLowerCase())
      );
    } else {
      return filteredTerms;
    }
  }
  return [];
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
	console.log('getTerms::', route)
  try {
    const termsPerPage = 100;
    const restURL = window.wpData.rest_url;
    const fields = 'id,slug,name,description,link,count,vue_meta';

    const response = await axios(`${restURL}/${namespace}/${route}?per_page=${termsPerPage}&page=1&_fields=${fields}`);

    wpTerms.value = response.data;
    isDataAvailable.value = true;

    // Handle pagination...
    // Refer to the original method for additional pagination logic
  } catch (error) {
    apiResponse.value = `The request could not be processed! <br> <strong>${error}</strong>`;
  }
}
</script>

<style scoped>
</style>
