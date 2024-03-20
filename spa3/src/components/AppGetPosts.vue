<template>

  <div
    v-if="isDataAvailable"
    class="container--">

    <!-- Number of Posts -->
    <small v-if="filteredResults.length === wpPosts.length">
      {{ wpPosts.length }} Posts
    </small>
    <small v-else>
      Found {{ filteredResults.length }} of {{ wpPosts.length }}
    </small>

    <div class="card-group--">

			<!-- AppDisplayPost Component -->
			<app-display-post
			v-if="route === 'posts'"
			v-for="postType in filteredResults"
			:key="postType.id"
			:search-term="searchTerm"
			:post-type="postType"
			role="article" >
			<!-- AppDisplayPost is called for each post in the filteredResults -->
			</app-display-post>

			<!-- AppDisplayDirectory Component -->
			<app-display-directory
			v-if="route === 'directory'"
			v-for="postType in filteredResults"
			:key="postType.id"
			:search-term="searchTerm"
			:post-type="postType"
			role="article" >
			<!-- AppDisplayDirectory is called for each post in the filteredResults -->
			</app-display-directory>

    </div><!-- .card-group -->
  </div><!-- .container -->
  <div v-else>
    <p
      class="text-center"
      v-html="apiResponse" />
  </div>

<code>DEBUG : {{ route }}</code>
<code>wpPosts = {{ wpPosts }}</code>
<!-- <pre>wpData = {{ wpData }}</pre> -->


</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';
import AppDisplayPost from './AppDisplayPost.vue';
import AppDisplayDirectory from './AppDisplayDirectory.vue';
import { WpPosts } from '../types/wpTypes'; // Assuming you have a type definition for posts

// Define props with TypeScript
const props = withDefaults(defineProps<{
  searchTerm?: string;
  appFilters?: string[];
  route?: string;
  fetchNow?: number;
}>(), {
  searchTerm: '',
  appFilters: () => [], // Use a factory function for default array to avoid shared state
  route: 'posts',
  fetchNow: 1,
});

// const wpData = ref(window.wpData); // Use a more specific type if available


// Reactive data
const apiResponse = ref<string>('');
const wpPosts = ref<WpPosts>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Computed property for filtered results
const filteredResults = computed(() => {
  if (wpPosts.value.length) {
    const pattern = new RegExp(props.searchTerm, 'i');
    const filteredPosts = wpPosts.value.filter((post) =>
      post.title.rendered.match(pattern) ||
      post.vue_meta.custom_excerpt.match(pattern)
    );

    if (props.appFilters && props.appFilters.length) {
      return filteredPosts.filter((post) =>
        post.vue_meta.terms.some((term) =>
          props.appFilters.includes(term.toLowerCase())
        )
      );
    } else {
      return filteredPosts;
    }
  }
  return [];
});

// Watching `fetchNow` prop for changes to trigger `fetchData`
watch(() => props.fetchNow, (newVal) => {
  if (newVal > 0) {
    fetchData();
  }
});

// Mounted lifecycle hook
onMounted(() => {
  fetchData();
});

// Methods
async function fetchData() {
  apiResponse.value = 'Loading ⏳';
  await getPosts(props.route);
}

async function getPosts(route = 'posts', namespace = 'wp/v2') {
	console.log('getPosts::', route)
  try {
    const postsPerPage = 100;
    const restURL = window.wpData.rest_url;
    const fields = 'id,title,link,vue_meta';

    const response = await axios(`${restURL}/${namespace}/${route}?per_page=${postsPerPage}&page=1&_fields=${fields}`);

    wpPosts.value = response.data;
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
