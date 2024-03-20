<template>
  <div class="container">
    <h6 class="text-center mb-4">Select a Post Type: </h6>

    <!-- CPT Filters -->
    <app-filter-switches
      :app-filters="wpCustomPostTypes"
      filter-type="radio"
      @onFilterToggle="cptSelected = $event"
    />

    <!-- Search Box -->
    <div class="input-group my-4">
      <input
        v-model.lazy="searchTerm"
        type="text"
        class="form-control p-2"
        placeholder="Search"
        aria-label="Search" >
      <div class="input-group-append">
        <button
          class="btn btn-outline-dark"
          type="button"
          @click="fetchData">Submit</button>
      </div>
    </div> <!-- .input-group -->

    <!-- Taxonomy Filters -->
    <app-filter-switches
      :app-filters="wpCategories"
      @onFilterToggle="taxFilters = $event"
    />

    <!-- AppGetPosts Component -->
    <app-get-posts
      :search-term="searchTerm"
      :app-filters="taxFilters"
      :route="cptSelected"
      :fetch-now="fetchNow"
    />

  </div><!-- container -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppFilterSwitches from './AppFilterSwitches.vue';
import AppGetPosts from './AppGetPosts.vue';
//import { wpData } from './path-to-wpData'; // Adjust the import according to your project structure

// Reactive state variables
const cptSelected = ref('directory'); // default post type
const searchTerm = ref('');
const fetchNow = ref(0); // prevent REST API request on mount
const taxFilters = ref([]);
const wpCategories = ref(window.wpData.post_categories.map((term: string) => term.toLowerCase()));

// Hardcoded for demo purposes, adjust as needed
const wpCustomPostTypes = ref(['directory', 'posts', 'sample-cpt-videos']);

// Methods
function fetchData() {
  fetchNow.value++;
}
</script>

<style scoped>
</style>
