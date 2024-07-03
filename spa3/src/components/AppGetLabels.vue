<template>
	  <div
    class="rest-data">
	<!-- BEGIN: Labels -->
	<p v-if="displayTitle" class="f-12 font-weight-bold m-0">Label <span class="--text-muted --muted fw-medium op-5" v-if="filteredResults.length === wpLabels.length">{{ wpLabels.length }}</span><span class="--text-muted --muted fw-medium op-5" v-else>{{ filteredResults.length }}+</span></p>

	<Multiselect
		class="multiselect-tag-label"
		v-model="selectedwpLabels"
		:options="filteredResults"
		mode="tags"
		:close-on-select="false"
		:searchable="true"
		placeholder="Filtrer"
		@click.stop.prevent
	/>

	<!-- END: Labels -->
</div>
</template>

<script setup lang="ts">
import { ref,  computed, watch, toRefs} from 'vue';
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

// Get datas
const wpLabels = ref<any>(window.wpData.label);

// Reactive state
const selectedwpLabels = ref<any>([]); // Use a more specific type if available

// Define emit
const emit = defineEmits(['onFilterChange'])

// Watcher
watch(selectedwpLabels, (filter) => {
  // Emit event to parent component
  // notify the parent component when an input switch is toggled
  emit('onFilterChange', filter);
});

watch(appFilters, (filter) => {
  // Emit event to parent component
  // notify the parent component when an input switch is toggled
  selectedwpLabels.value = filter;
});

// Computed property for filtered results
const filteredResults = computed(() => {
  if (wpLabels.value.length) {
    const pattern = new RegExp(_.lowerCase(_.deburr(props.searchTerm)), 'i');
    const filteredTerms = wpLabels.value.filter((t: any) =>
			_.lowerCase(_.deburr(t.label)).match(pattern) //||
      // t.description.match(pattern) ||
      // t.code.match(pattern)
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
</script>

<style scoped>
</style>
