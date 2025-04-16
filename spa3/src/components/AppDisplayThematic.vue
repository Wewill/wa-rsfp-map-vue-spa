<template>
	<!-- BEGIN: Thematic item -->
	<li class="list-item my-2">
		<!-- {{  collapseStates }} -->
		<div class="card card-cover overflow-hidden rounded-4 shadow-sm border-0 text-bg-action-2 ---- bg-cover bg-position-center-center"
			:style="`background-image: url('${item.vue_meta.media_url}');`">
			<!-- Accordion header : list parents -->
			<div class="accordion-header position-relative z-2" :id="`heading_${item.id}`">
				<a @click="$emit('onFilterChange', item.name.toLowerCase())">
					<div class="d-flex justify-content-between align-items-center text-white text-shadow-1 p-4 z-2">
						<p class="text-white m-0 fw-bold ps-3 flex-grow-1" v-html="highlightedPostTitle || item.name"></p>
						<span v-if="item && appFilters.includes(item.name.toLowerCase())" class="fw-bold bg-transparent h5 m-0">
							<i class="bi bi-x-square-fill" style="position:relative;top:2px;"></i>
						</span>
						<a :href="item.link" class="text-white fw-bold h5 m-0 mx-2"><i class="bi bi-box-arrow-up-right"></i></a>
						<span class="badge text-bg-color-accent-2 fw-bold py-2">{{ item.count
						}}<!--id:{{  item.id  }} p:{{  item.parent  }}--></span>
					</div>
				</a>
				<button class="accordion-button collapsed position-absolute top-50 start-0 translate-middle-y w-40-px"
					type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse_${item.id}`"
					:aria-expanded="collapseStates[Number(item.id)] ? 'true' : 'false'"
					:aria-controls="`collapse_${item.id}`" v-if="item.children && item.children.length">
					<i class="bi fs-5 ps-3"
						:class="!collapseStates[Number(item.id)] ? 'bi-chevron-expand' : 'bi-chevron-contract op-5'"></i>
				</button>
			</div>
			<!-- Display overlay -->
			<div class="overlay card-overlay bg-image op-5 z-0"
				:class="item.parent !== 0 ? 'bg-action-2' : 'bg-action-2'">
			</div>
		</div>
		<!-- Accordion content : list children -->
		<div :id="`collapse_${item.id}`" class="accordion-collapse collapse" :aria-labelledby="`heading_${item.id}`"
			:data-bs-parent="`#parent_${item.parent}`">
			<div class="accordion-body">
				<!-- Check if the item has children and display them in an accordion -->
				<ul v-if="filteredItemChildren && filteredItemChildren.length" class="list-unstyled ms-4">
					<app-display-thematic v-for="child in filteredItemChildren" :key="child.id" :item="child"
						:search-term="searchTerm" :collapse-states="collapseStates" :app-filters="appFilters" @onFilterChange="updateChildFilters($event)"/>
				</ul>
			</div>
		</div>
	</li>
	<!-- END: Thematic item -->
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ref, toRefs, computed, onMounted, onBeforeUnmount } from 'vue';
import { WpTerm } from '../types/wpTypes'; // Assuming you have a type definition for posts
import _ from "lodash";

// Defining props with TypeScript types
const props = withDefaults(defineProps<{
	item: WpTerm;
	searchTerm: string;
	appFilters: string[];
	collapseStates: { [key: string]: boolean }; // Define collapseStates prop
}>(), {
	searchTerm: '',
	appFilters: () => [],
});

// Get props
const { appFilters } = toRefs(props);
// Define emit
const emit = defineEmits(['onFilterChange'])

function updateChildFilters(filter: string) {
	console.log('updateChildFilters::', filter, appFilters.value);
	emit('onFilterChange', filter);
}

// Computed property for filtered results
const filteredItemChildren = computed(() => {
	if (props.item.children) {

		// Verifier
		console.log(_.lowerCase(_.deburr(props.item.children.find(t => t.id === 22)?.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).join())));

		if (props.appFilters && props.appFilters.length && !props.appFilters.includes(props.item.name.toLowerCase())) {
			return props.item.children.filter(t =>
				props.appFilters.includes(t.name.toLowerCase()) ||
				// (t.children && !props.appFilters.includes(t.name.toLowerCase())) ? t.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).reduce((a, v) => a || v, false) : false
				t.children?.map(c => props.appFilters.includes(c.name.toLowerCase())).reduce((a, v) => a || v, false)
			);
		} else {
			return props.item.children;
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


// Computed properties to highlight search terms
const highlightedPostTitle = computed(() => {
	if (props.searchTerm && props.item.name) {
		return highlightData(props.item.name, props.searchTerm);
	}
	return props.item.name;
});

// Method to add span tags with the hl-search CSS class to the search term
function highlightData(data: string, searchTerm: string): string {
	// const pattern = new RegExp(_.lowerCase(_.deburr(searchTerm)), 'i');
	// const highlightedData = _.lowerCase(_.deburr(data)).replace(
	//   pattern,
	//   `<span class="hl-search">${searchTerm}</span>`
	// );
	// Preserve original text
	const pattern = new RegExp(_.escapeRegExp(_.deburr(searchTerm)), 'gi');
	// Use replace with a function to preserve the original case
	const highlightedData = data.replace(pattern, (match) => {
		return `<span class="hl-search">${match}</span>`;
	});
	return highlightedData;
}

// Define an object to store collapse states indexed by accordion ID
const collapseStates = ref<{ [key: number]: boolean }>(props.collapseStates);

// Method to toggle collapse state for a specific accordion item
const toggleCollapse = (itemId: number) => {
	collapseStates.value[itemId] = !collapseStates.value[itemId];
};

// Attach Bootstrap collapse event listeners
onMounted(() => {
	const collapseElement = document.getElementById(`collapse_${props.item.id}`);
	collapseElement?.addEventListener('shown.bs.collapse', () => toggleCollapse(Number(props.item.id)));
	collapseElement?.addEventListener('hidden.bs.collapse', () => toggleCollapse(Number(props.item.id)));
});

// Clean up event listeners on unmount
onBeforeUnmount(() => {
	const collapseElement = document.getElementById(`collapse_${props.item.id}`);
	collapseElement?.removeEventListener('shown.bs.collapse', () => toggleCollapse(Number(props.item.id)));
	collapseElement?.removeEventListener('hidden.bs.collapse', () => toggleCollapse(Number(props.item.id)));
});


</script>

<style scoped></style>
