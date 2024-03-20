<template>
  <div>

    <!-- Search Box -->
    <div class="input-group my-4">
      <input
        v-model="searchTerm"
        type="text"
        class="form-control p-2"
        placeholder="search titles or excerpts for ..."
        aria-label="Search" >
      <div class="input-group-append">
        <span class="input-group-text bg-light">Search</span>
      </div>
    </div> <!-- .input-search -->
	{{  searchTerm }}

    <!-- Filter Buttons -->
    <app-filter-switches
      :app-filters="wpCategories"
      @onFilterToggle="categoryFilter = $event"
    />
	{{  categoryFilter  }}

	<app-filter-switches
      :app-filters="wpGeography"
      @onFilterToggle="categoryFilter = $event"
    />
	<app-filter-switches
      :app-filters="wpProduction"
      @onFilterToggle="categoryFilter = $event"
    />
	<app-filter-switches
      :app-filters="wpThematic"
      @onFilterToggle="categoryFilter = $event"
    />

    <!-- AppGetPosts Component -->
	Posts=
    <app-get-posts
      :search-term="searchTerm"
      :app-filters="categoryFilter"
      :route="cptSelected"
    />

	Directory=
    <app-get-posts
      :search-term="searchTerm"
      :app-filters="categoryFilter"
      :route="'directory'"
    />

	Farm=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="categoryFilter"
      :route="'farm'"
    />

	Operation=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="categoryFilter"
      :route="'operation'"
    />

	Structure=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="categoryFilter"
      :route="'structure'"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppFilterSwitches from './AppFilterSwitches.vue';
import AppGetPosts from './AppGetPosts.vue';
// import { wpData } from './path-to-wpData'; // You need to import wpData or declare it globally

// Assuming wpData is available here, either imported or declared globally
const cptSelected = ref('posts'); // default post type
const searchTerm = ref('');
const categoryFilter = ref([]);
const wpCategories = ref(window.wpData.post_categories.map((term: string) => term.toLowerCase())); // Default
const wpGeography = ref(window.wpData.geography.map((term: string) => term.toLowerCase()));
const wpProduction = ref(window.wpData.production.map((term: string) => term.toLowerCase()));
const wpThematic = ref(window.wpData.thematic.map((term: string) => term.toLowerCase()));
</script>

<style scoped>
/* CSS for Toggle Switch:  https://www.w3schools.com/howto/howto_css_switch.asp */
.switch {
	position: relative;
	display: inline-block;

	height: 24px;
}

.switch .category-toggle {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 50px;
	background-color: #eee;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.switch .label {
	display: inline-block;
	margin: 0 20px 0 30px;
	font-weight: 400;
}

.switch .category-toggle:before {
	position: absolute;
	content: "";
	height: 16px;
	width: 16px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: 0.1s;
	transition: 500ms;
}

.switch input:checked + .category-toggle {
	background-color: #42b883;
}

.switch input:checked + .category-toggle:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}
</style>
