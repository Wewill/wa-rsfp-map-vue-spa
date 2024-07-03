<template>
	  <div
    v-if="isDataAvailable"
    class="rest-data">
	<!-- BEGIN: Geographies -->
	<p v-if="displayTitle" class="f-12 font-weight-bold m-0">Géographie <span class="--text-muted --muted fw-medium op-5" v-if="filteredResults.length === wpTerms.length">{{ wpTerms.length }}</span><span class="--text-muted --muted fw-medium op-5" v-else>{{ filteredResults.length }}+</span></p>

	<Multiselect
		class="multiselect-tag-geography"
		v-model="selectedWpTerms"
		:options="filteredResults"
		mode="tags"
		:close-on-select="false"
		:searchable="true"
		placeholder="Filtrer"
		@click.stop.prevent
	/>

	<!-- END: Geographies -->
</div><!-- .rest-data -->
  <div v-else>
    <p
      class="text-center"
      v-html="apiResponse" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, toRefs} from 'vue';
import axios from 'axios';
import { WpTerm, WpTerms } from '../types/wpTypes'; // Assuming you have a type definition for posts
import Multiselect from '@vueform/multiselect'
import _ from "lodash";

// Define props with TypeScript
const props = withDefaults(defineProps<{
  displayTitle?: boolean;
  searchTerm?: string;
  appFilters?: any[]; // Replace `any` with a more specific type if known
//   route?: string;
//   fetchNow?: number;
}>(), {
  displayTitle: false,
  searchTerm: '',
  appFilters: () => [], // Use a factory function for default array to avoid shared state
//   route: 'posts',
//   fetchNow: 1,
});

const { appFilters } = toRefs(props);

// Reactive data
const apiResponse = ref<string>('');
const wpTerms = ref<WpTerms>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Reactive state
const selectedWpTerms = ref<WpTerms>([]); // Use a more specific type if available

// Define emit
const emit = defineEmits(['onFilterChange'])

// Watcher
watch(selectedWpTerms, (filter) => {
  // Emit event to parent component
  // notify the parent component when an input switch is toggled
  emit('onFilterChange', filter);
});

watch(appFilters, (filter) => {
  // Emit event to parent component
  // notify the parent component when an input switch is toggled
  selectedWpTerms.value = filter;
});

// Computed property for filtered results
const filteredResults = computed(() => {
  if (wpTerms.value.length) {
    const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
    const filteredTerms = wpTerms.value.filter((t) =>
			_.lowerCase(_.deburr(t.name)).match(pattern) //||
      // _.lowerCase(_.deburr(t.description)).match(pattern) ||
      // _.lowerCase(_.deburr(t.code)).match(pattern)
    );

    // if (props.appFilters && props.appFilters.length) {
    //   return filteredTerms.filter((t) =>
    //       props.appFilters.includes(t.code?.toString())
    //   );
    // } else {
      return filteredTerms;
    // }
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
  await getTerms('geography');
}

async function getTerms(route = 'category', namespace = 'wp/v2') {
	console.log('getTerms::', route)
  try {
    const termsPerPage = 100;
    const restURL = window.wpData.rest_url;
    const fields = 'id,slug,name,description,link,count,vue_meta';

    const response = await axios(`${restURL}/${namespace}/${route}?per_page=${termsPerPage}&page=1&_fields=${fields}`);

    //wpTerms.value = response.data;
		console.log("response.data::", response.data);
    wpTerms.value = response.data.map((d: WpTerm) => { return {name: d.name, label: d.name, value: d.vue_meta.g_special_code.toString(), code: d.vue_meta.g_special_code}});
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
