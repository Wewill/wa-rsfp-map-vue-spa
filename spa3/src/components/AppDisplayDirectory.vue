<template>
	<!-- BEGIN: Directory item -->
	<li class="list-item card-item p-0 bg-transparent">
		<div class="card my-0 border-0 bg-transparent">
			<div class="row g-0 align-items-center">
			<div class="col-md-3 order-first" v-if="postType.vue_meta.thumbnailmedia_url">
				<img :src="postType.vue_meta.thumbnailmedia_url" :alt="postType.vue_meta.featuredmedia_alt || 'post thumbnail'" class="img-fluid rounded-4 img-transition-scale">
			</div>
			<div class="col-md-9">
				<div class="card-body py-2 pe-0">

					<template v-for="t_production in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production' )" >
						<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
					</template>
					<template v-for="t_thematic in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' )" >
						<div class="thematic-list d-inline-block"><a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name}}</a></div>
					</template>
					<template v-for="t_geography in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography' )" >
						<div class="geography-list d-inline-block"><a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name}}</a></div>
					</template>

					<h5 class="card-title mt-2"><a :href="postType.link" class="stretched-link">
						<span v-html="highlightedPostTitle || postType.title.rendered"></span>
					</a></h5>
				<p class="card-text fs-xs"><span v-html="highlightedPostExcerpt || postType.vue_meta.custom_excerpt"></span></p>
				<!-- <p class="card-text mt-n2"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
			</div>
			</div>
			</div>
		</div>
	</li>
	<!-- END: Directory item -->
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

const highlightedPostExcerpt = computed(() => {
  if (props.searchTerm && props.postType.vue_meta.custom_excerpt) {
    return highlightData(props.postType.vue_meta.custom_excerpt, props.searchTerm);
  }
  return props.postType.vue_meta.custom_excerpt;
});

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

<style>
.card {
	min-width: 33%;
}

.card-img-top {
	height: 15vw;
	object-fit: cover;
}

.card .hl-search {
	background-color: yellow;
}

@media only screen and (max-width: 768px) {
	.card {
		min-width: 50%;
	}
}

@media only screen and (max-width: 480px) {
	.card {
		min-width: 100%;
	}
}
</style>
