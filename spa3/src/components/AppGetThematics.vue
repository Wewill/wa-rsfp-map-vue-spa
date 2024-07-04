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
      <div class="h-550-px overflow-y-scroll scrollbar-white me-n3 pe-3">
        <ul class="list-unstyled card-items">
          <app-display-thematic
            v-for="item in filteredResults"
            :key="item.id"
            :search-term="searchTerm"
						:appFilters="appFilters"
            :item="item"
            role="article"
						:collapse-states="{}"
          />
        </ul>
      </div>
      <div class="position-absolute w-100 h-20-px w-100 bottom-0 left-0 bg-v-gradient-action-3"></div>
    </div>
    <!-- END: Thematics -->
  </div>
  <div v-else>
    <p class="text-center" v-html="apiResponse" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { WpTerms, WpTerm} from '../types/wpTypes'; // Assuming you have a type definition for posts
import AppDisplayThematic from './AppDisplayThematic.vue';
import _ from "lodash";

// Define props with TypeScript
const props = withDefaults(defineProps<{
  searchTerm?: string;
  appFilters?: string[];
}>(), {
  searchTerm: '',
  appFilters: () => [],
});

// Reactive data
const apiResponse = ref<string>('');
const wpTerms = ref<WpTerms>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Computed property for filtered results
const filteredResults = computed(() => {
  if (wpTerms.value.length) {
    //const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
    const pattern = new RegExp(_.escapeRegExp(_.deburr(props.searchTerm)), 'gi');

		// Verifier
		console.log( _.lowerCase(_.deburr( wpTerms.value.find(t => t.id === 22)?.children?.map(c => c.name).join() )) );
		console.log( _.lowerCase(_.deburr( wpTerms.value.find(t => t.id === 22)?.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).join() )) );

    const filteredTerms = wpTerms.value.filter(t =>
      _.lowerCase(_.deburr(t.name)).match(pattern) ||
      _.lowerCase(_.deburr(t.description)).match(pattern) ||
      _.lowerCase(_.deburr(t.vue_meta.content)).match(pattern) ||
			_.lowerCase(_.deburr( t.children?.map(c => c.name).join() )).match(pattern)
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
    const termsPerPage = 100;
    const restURL = window.wpData.rest_url;
    const fields = 'id,slug,name,description,link,count,parent,vue_meta';

    const response = await axios(`${restURL}/${namespace}/${route}?per_page=${termsPerPage}&page=1&_fields=${fields}`);

    wpTerms.value = buildHierarchy(response.data);
    isDataAvailable.value = true;

    // Handle pagination...
    // Refer to the original method for additional pagination logic
  } catch (error) {
    apiResponse.value = `The request could not be processed! <br> <strong>${error}</strong>`;
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

<style scoped>
</style>
