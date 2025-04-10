<template>
	<!-- BEGIN: Directory item -->
	<li class="list-item card-item p-0 bg-transparent w-100 mb-2">
		<div class="card my-0 border-0 bg-transparent">
			<div class="d-flex align-items-center">
				<!-- <div class="h-100-px w-100-px"> -->
					<img v-if="postType.vue_meta.thumbnail_url" :src="postType.vue_meta.thumbnail_url" :alt="postType.vue_meta.media_alt || 'post thumbnail'" class="img-fluid fit-image rounded-4 img-transition-scale h-100-px w-100-px">
					<div v-else class="h-100-px w-100-px"><div class="h-100-px w-100-px rounded-4 bg-color-layout d-flex flex-center"><i class="bi bi-image text-action-3"></i></div></div>
				<!-- </div> -->
				<div class="">
					<div class="card-body py-2 pe-0">

						<!-- Example <div class="production--s-list d-inline-block">
							<template v-for="t_production in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production' )" >
								<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
								<div class="production-list d-inline-block"><span class="production-item" data-bs-toggle="collapse" data-bs-target="#collapseWidthExampleProd" aria-expanded="false" aria-controls="collapseWidthExample">+2</span></div>
								<div class="production-more d-inline-block collapse collapse-horizontal" id="collapseWidthExampleProd----">
									<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
									<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
								</div>
							</template>
						</div> -->

						<div class="more-container">
							<!-- Production -->
							<div class="productions d-inline-block align-top">
								<template v-if="postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production').length > maxListElements">
									<template v-for="(t_production, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production')" >
										<div v-if="index < maxListElements" class="production-list d-inline-block">
											<a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name }}</a>
										</div>
									</template>
									<div class="production-list more-trigger d-inline-block">
										<span class="production-more">+{{ postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production').length - maxListElements }}</span>
									</div>
									<div class="more d-inline-block">
										<template v-for="(t_production, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production')" >
											<div v-if="index >= maxListElements" class="production-list d-inline-block">
												<a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name }}</a>
											</div>
										</template>
									</div>
								</template>
								<template v-else>
									<template v-for="t_production in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'production')" >
										<div class="production-list d-inline-block">
											<a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name }}</a>
										</div>
									</template>
								</template>
							</div>

							<!-- Thematics -->
							<div class="thematics d-inline-block align-top">
								<template v-if="postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' && t.parent !== 0 ).length > maxListElements">
									<template v-for="(t_thematic, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' && t.parent !== 0 )" >
										<div v-if="index < maxListElements" class="thematic-list d-inline-block">
											<a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name }}</a>
										</div>
									</template>
									<div class="thematic-list more-trigger d-inline-block">
										<span class="thematic-more">+{{ postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' && t.parent !== 0 ).length - maxListElements }}</span>
									</div>
									<div class="more d-inline-block">
										<template v-for="(t_thematic, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' && t.parent !== 0 )" >
											<div v-if="index >= maxListElements" class="thematic-list d-inline-block">
												<a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name }}</a>
											</div>
										</template>
									</div>
								</template>
								<template v-else>
									<template v-for="t_thematic in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'thematic' && t.parent !== 0 )" >
										<div class="thematic-list d-inline-block">
											<a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name }}</a>
										</div>
									</template>
								</template>
							</div>

							<!-- Geography -->
							<div class="geographys d-inline-block align-top">
								<template v-if="postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography').length > maxListElements">
									<template v-for="(t_geography, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography')" >
										<div v-if="index < maxListElements" class="geography-list d-inline-block">
											<a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name }}</a>
										</div>
									</template>
									<div class="geography-list more-trigger d-inline-block">
										<span class="geography-more">+{{ postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography').length - maxListElements }}</span>
									</div>
									<div class="more d-inline-block">
										<template v-for="(t_geography, index) in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography')" >
											<div v-if="index >= maxListElements" class="geography-list d-inline-block">
												<a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name }}</a>
											</div>
										</template>
									</div>
								</template>
								<template v-else>
									<template v-for="t_geography in postType.vue_meta.terms_data.filter((t) => t.taxonomy == 'geography')" >
										<div class="geography-list d-inline-block">
											<a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name }}</a>
										</div>
									</template>
								</template>
							</div>
						</div>

						<h6 class="card-title mt-2"><a :href="postType.link" class="stretched-link">
							<span v-html="highlightedPostTitle || postType.title.rendered"></span>
						</a></h6>

						<p class="card-text fs-xs mb-0"><span v-html="highlightedPostExcerpt || postType.vue_meta.custom_excerpt"></span></p>
						<p class="card-text mt-n1 mb-0" v-if="postType.vue_meta.farm_title != ''"><small class="text-muted">{{ postType.vue_meta.farm_title }}</small></p>
					</div>
				</div>
			</div>
		</div>
	</li>
	<!-- END: Directory item -->
</template>

<style scoped lang="scss">

.more-container {
	// display: inline-block;
	// vertical-align: top;
	--delayW: 0s;
	--delayH: 0s;

	z-index: 2; /* https://stackoverflow.com/questions/73912957/how-to-escape-stretched-link-in-html-block-content */
    position: relative;

	.more {
		max-width: 0px; /* Controlling lines */
		max-height: 24px; /* Controling rows */
		overflow: hidden;
		vertical-align: top;
		--delayW: .4s;
		--delayH: 0s;
		transition: max-width 0.5s ease-in-out var(--delayW), max-height 0.5s ease-in-out var(--delayH);
		// white-space: nowrap; /* Issued when many items because of the overflow */
	}

	&:hover {
		.more {
			max-width: 700px;
			max-height: calc( 4 * 24px ); /* 4 rows */
			--delayW: 0s;
			--delayH: .4s;
		}
	}

	.more-trigger {
		cursor: pointer;
		max-width: 35px;
		max-height: 24px;
		// overflow: hidden;
		overflow: hidden;
		vertical-align: top;
		transition: max-width .5s ease-in-out;
	}

	&:hover {
		.more-trigger {
			max-width: 0px;
		}
	}

}

</style>


<script setup lang="ts">
import { computed } from 'vue';
import { WpPost } from '../types/wpTypes'; // Assuming you have a type definition for posts
import _ from "lodash";

const maxListElements = 1;

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

