<template>
	<!-- BEGIN: Farm item -->
	<li class="farm-slide-item list-item me-2 flex-fill">
		<div class="card my-0 border-0 bg-transparent">
			<img v-if="postType.vue_meta.thumbnail_url" :src="postType.vue_meta.thumbnail_url" :alt="postType.vue_meta.media_alt || 'post thumbnail'" class="img-fluid rounded-4 img-transition-scale h-100-px">
			<div v-else class="h-100-px w-100-px rounded-4 bg-light">PAS d'IMAGE</div>
			<div class="card-body py-2 px-0">
				<p class="card-text fs-xs fw-bold"><a :href="postType.link" class="stretched-link"><span v-html="highlightedPostTitle || postType.title.rendered"></span></a></p>
			</div>
		</div>
	</li>
	<!-- END: Farm item -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { WpPost } from '../types/wpTypes'; // Assuming you have a type definition for posts

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
