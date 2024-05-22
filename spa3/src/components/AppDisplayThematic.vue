<template>
	<!-- BEGIN: Thematic item -->
	<li class="list-item my-2" data-bs-toggle="collapse" :data-bs-target="`#collapse_${item.id}`" aria-expanded="true" :aria-controls="`collapse_${item.id}`">
	<!-- <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample"> -->

		<div class="card card-cover overflow-hidden rounded-4 shadow-sm ---- bg-cover bg-position-center-center" :class="item.parent !== 0?'border-2 border-action-2 text-action-2 bg-transparent':'border-0 text-bg-action-2'" :style="`background-image: url('${item.vue_meta.media_url}');`">
			<a :href="item.link" class="stretched-link z-2">
				<div class="d-flex justify-content-between align-items-center text-white text-shadow-1 p-4 z-2">
					<p class="text-white m-0 fw-bold" v-html="highlightedPostTitle || item.name"></p>
					<span class="badge text-bg-secondary fw-bold py-2">{{ item.count }}</span>
				</div>
			</a>
			<div class="overlay card-overlay bg-image op-2 z-0" :class="item.parent !== 0?'bg-action-3':'bg-action-2'"></div>
		</div>
	</li>
	<!-- END: Thematic item -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WpTerm } from '../types/wpTypes'; // Assuming you have a type definition for posts

// Defining props with TypeScript types
// Note: Vue 3 `<script setup>` uses `defineProps` to declare props.
const props = defineProps<{
  item: WpTerm;
  searchTerm: string;
}>();

// Computed properties to highlight search terms
const highlightedPostTitle = computed(() => {
  if (props.searchTerm && props.item.name) {
    return highlightData(props.item.name, props.searchTerm);
  }
  return props.item.name;
});

// const highlightedPostExcerpt = computed(() => {
//   if (props.searchTerm && props.item.vue_meta.custom_excerpt) {
//     return highlightData(props.item.vue_meta.custom_excerpt, props.searchTerm);
//   }
//   return props.item.vue_meta.custom_excerpt;
// });

// Method to add span tags with the hl-search CSS class to the search term
function highlightData(data: string, searchTerm: string): string {
  const pattern = new RegExp(searchTerm, 'i');
  const highlightedData = data.replace(
    pattern,
    `<span class="hl-search">${searchTerm}</span>`
  );
  return highlightedData;
}
</script>

<style scoped>
</style>
