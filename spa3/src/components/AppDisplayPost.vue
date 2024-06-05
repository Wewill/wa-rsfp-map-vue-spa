<template>

  <div class="card">
    <img
      v-if="postType.vue_meta.media_url"
      :src="postType.vue_meta.media_url"
      :alt="postType.vue_meta.media_alt || 'post thumbnail'"
      class="card-img-top">

    <div class="card-body">
      <h5 class="card-title text-center">
        <a :href="postType.link">
          <span v-html="highlightedPostTitle || postType.title.rendered" />
        </a>
      </h5>
      <p class="card-text">
				<span v-html="highlightedPostExcerpt || postType.vue_meta.custom_excerpt"/>
      </p>
    </div><!-- .card-body -->

    <div
		class="card-footer">
      <small class="text-muted">
        <span
          v-if="postType.vue_meta.terms.length"
          v-html="postType.vue_meta.term_links.join(', ')"/>
        <span v-else>uncategorized</span>
      </small>
    </div><!-- .card-footer -->

  </div><!-- .card -->

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

const highlightedPostExcerpt = computed(() => {
  if (props.searchTerm && props.postType.vue_meta.custom_excerpt) {
    return highlightData(props.postType.vue_meta.custom_excerpt, props.searchTerm);
  }
  return props.postType.vue_meta.custom_excerpt;
});

// Method to add span tags with the hl-search CSS class to the search term
function highlightData(data: string, searchTerm: string): string {
  const pattern = new RegExp(_.lowerCase(_.deburr(searchTerm)), 'i');
  const highlightedData = _.lowerCase(_.deburr(data)).replace(
    pattern,
    `<span class="hl-search">${searchTerm}</span>`
  );
  return highlightedData;
}
</script>

<style scoped>
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
