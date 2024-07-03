<template>
	<!-- BEGIN: Farm item -->
	<li class="--farm-slide-item list-item me-2 col --flex-fill --w-25 w-80-px">
		<div class="card my-0 border-0 bg-transparent">
			<div class="h-80-px w-80-px">
				<img v-if="postType.vue_meta.thumbnail_url" :src="postType.vue_meta.thumbnail_url" :alt="postType.vue_meta.media_alt || 'post thumbnail'" class="img-fluid fit-image rounded-4 --img-transition-scale h-80-px w-80-px">
				<div v-else class="h-80-px w-80-px"><div class="h-80-px w-80-px rounded-4 bg-color-layout d-flex flex-center"><i class="bi bi-image text-action-3"></i></div></div>
			</div>
			<div class="card-body py-2 px-0">
				<p class="card-text fs-xs fw-bold"><span v-html="highlightedPostTitle || postType.title.rendered"></span></p>
			</div>
		</div>
	</li>
	<!-- END: Farm item | do not link <a :href="postType.link" class="stretched-link"></a> -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WpPost } from '../types/wpTypes'; // Assuming you have a type definition for posts
import _ from "lodash";

// Defining props with TypeScript types
// Note: Vue 3 `<script setup>` uses `defineProps` to declare props.
const props = defineProps<{
  postType: WpPost;
  searchTerm: string;
}>();

// Computed properties to highlight search terms
const highlightedPostTitle = computed(() => {
  if (props.searchTerm && props.postType.title.rendered) {
    return highlightData(props.postType.title.rendered, props.searchTerm);
  }
  return props.postType.title.rendered;
});

// const highlightedPostExcerpt = computed(() => {
//   if (props.searchTerm && props.postType.vue_meta.custom_excerpt) {
//     return highlightData(props.postType.vue_meta.custom_excerpt, props.searchTerm);
//   }
//   return props.postType.vue_meta.custom_excerpt;
// });

// Method to add span tags with the hl-search CSS class to the search term
function highlightData(data: string, searchTerm: string): string {
//   const pattern = new RegExp(_.lowerCase(_.deburr(searchTerm)), 'i');
//   const highlightedData = _.lowerCase(_.deburr(data)).replace(
//     pattern,
//     `<span class="hl-search">${searchTerm}</span>`
//   );
  // Preserve original text
  const pattern = new RegExp(_.escapeRegExp(_.deburr(searchTerm)), 'gi');
  // Use replace with a function to preserve the original case
  const highlightedData = data.replace(pattern, (match) => {
    return `<span class="hl-search">${match}</span>`;
  });
  return highlightedData;
}
</script>

<style scoped>
</style>
