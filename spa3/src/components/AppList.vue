<template>
  <div>
<!-- isDataAvailable:: {{ isDataAvailable }}
<pre><b>filteredResults::</b> {{  filteredResults }}</pre> -->

<code class="d-none">
LIST =
geographyFilter: {{  geographyFilter }}
opentostageFilter: {{  opentostageFilter }}
opentovisitFilter: {{  opentovisitFilter }}
mergedFilters:: {{  mergedFilters }}
filteredResults.length:: {{  filteredResults.length }}
</code>

	<!-- BEGIN: #Map integration -->
	<section id="map" class="mt-2 mb-2 contrast--light is-formatted">
		<div class="container-fluid mb-n6">
				<div class="row f-w px-4 pb-4">
					<div class="col-12 --zi-max" style="--padding-left: calc( calc(var(--modified-bs-gutter-x) / 2) - 1.5rem ) !important;z-index: 410;">

						<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
							<span class="bullet bullet-action-3 ml-0"></span>
							<h5 class="text-action-3">Le répertoire</h5>
						</div>


						<div class="d-none d-sm-flex align-items-center justify-content-between">
							<!-- <div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
								<span class="bullet bullet-action-3 ml-0"></span>
								<h5 class="text-action-3">Le répertoire</h5>
							</div> -->
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="200">
								<p class="f-12 font-weight-bold m-0">Production <span class="--text-muted --muted fw-medium op-5">{{ wpProduction.length }}</span></p>
								<Multiselect
									class="multiselect-tag-production"
									v-model="productionFilter"
									:options="wpProduction"
									mode="tags"
									:close-on-select="false"
									:searchable="true"
									placeholder="Filtrer"
									@click.stop.prevent
								/>
							</div>
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<p class="f-12 font-weight-bold m-0">Thématique <span class="--text-muted --muted fw-medium op-5">{{ wpThematic.length }}</span></p>
								<Multiselect
									class="multiselect-tag-thematic"
									v-model="thematicFilter"
									:options="wpThematic"
									mode="tags"
									:close-on-select="false"
									:searchable="true"
									placeholder="Filtrer"
									@click.stop.prevent
								/>
							</div>
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<app-get-geographies
									:display-title="true"
									:app-filters="geographyFilter"
									@onFilterChange="geographyFilter = $event"
								/>
							</div>

							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<app-get-labels
									:display-title="true"
									:app-filters="labelFilter"
									@onFilterChange="labelFilter = $event"
								/>
							</div>

							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<p class="f-12 font-weight-bold m-0"><i class="icon icon-filters"></i> Ouvert aux...</p>
								<form>
									<!-- <label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Options"><i class="icon icon-filter"></i> Ouvert aux...</label> -->
									<fieldset class="d-flex">
										<div class="form-check mb-1">
											<input class="form-check-input" type="checkbox" id="opentostageFilter" name="opentostageFilter" v-model="opentostageFilter">
											<label class="form-check-label" for="opentostageFilter">Stages</label>
										</div>
										<div class="form-check mb-1 ms-3">
											<input class="form-check-input" type="checkbox" id="opentovisitFilter" name="opentovisitFilter" v-model="opentovisitFilter">
											<label class="form-check-label" for="opentovisitFilter">Visites</label>
										</div>
									</fieldset>
								</form>
							</div>
						</div>

					</div>
				</div>

				<div class="row f-w px-4 min-vh-80">
					<div class="col-sm-12 bg-color-bg rounded-4 p-4 --pb-10 mb-0">

						<div class="form-floating mb-1">
							<!-- Search Box -->
							<input  v-model="searchTerm" type="text" class="form-control --form-control-lg border-action-3 focus-action-3 px-4" id="floatingInput" placeholder="Rechercher..." aria-label="Search">
							<label for="floatingInput" class="ms-3 fs-18">Rechercher dans le contenu...</label>
							<div class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-4">
								<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z"></path></svg>
							</div>
						</div>

						<div class="row">

							<div class="col-sm-9">
								<app-get-posts
									:search-term="searchTerm"
									:app-filters="mergedFilters"
									:opentostage-filter="opentostageFilter"
									:opentovisit-filter="opentovisitFilter"
									:route="'directory'"
								/>
							</div>

							<!-- <div class="col-6">
								<app-get-posts
									:search-term="searchTerm"
									:route="'farm'"
								/>
							</div> -->

							<div class="col-sm-3">
								<app-get-thematics
									:search-term="searchTerm"
									:app-filters="thematicFilter"
								/>
							</div>

						</div>

					</div>
			</div>
		</div>

		<!-- Begin: CTA -->
		<!-- <div class="d-flex align-items-center justify-content-center py-4 px-5 bg-body rounded-4 shadow mx-20 mb-6 --z-2 position-relative" style="z-index:1000;">
			<div class="d-flex align-items-center" data-aos="flip-up" data-aos-delay="200">
				<div class="flex-shrink-0 me-3">
					<i class="bi bi-bootstrap h2 text-action-1"></i>
					<h5 class="text-action-1">100+</h5>
				</div>
				<div>
				<h6 class="fw-bold text-action-1">Lorem ipsum</h6>
				<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>

			<div class="d-flex align-items-center justify-content-center px-5">
				<span class="bullet bullet-action-3 ml-0"></span>
			</div>

			<div class="d-flex align-items-center" data-aos="flip-up" data-aos-delay="400">
				<div class="flex-shrink-0 me-3">
					<i class="bi bi-bootstrap h2"></i>
					<h5>100+</h5>
				</div>
				<div>
				<h6 class="fw-bold">Lorem ipsum</h6>
				<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>

			<div class="d-flex align-items-center justify-content-center px-5">
				<span class="bullet bullet-action-3 ml-0"></span>
			</div>

			<div class="d-flex align-items-center" data-aos="flip-up" data-aos-delay="600">
				<div class="flex-shrink-0 me-3">
					<i class="bi bi-bootstrap h2"></i>
					<h5>100+</h5>
				</div>
				<div>
				<h6 class="fw-bold">Lorem ipsum</h6>
				<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>


			<div class="d-flex align-items-center justify-content-center px-5">
				<span class="bullet bullet-action-3 ml-0"></span>
			</div>

			<div class="d-flex align-items-center" data-aos="flip-up" data-aos-delay="800">
				<div class="flex-shrink-0 me-3">
					<i class="bi bi-bootstrap h2"></i>
					<h5>100+</h5>
				</div>
				<div>
				<h6 class="fw-bold">Lorem ipsum</h6>
				<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>

		</div> -->
		<!-- End: CTA -->

	</section>
	<!-- END : #Map integration -->


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import AppGetPosts from './AppGetPosts.vue';
import AppGetThematics from './AppGetThematics.vue';
import AppGetGeographies from './AppGetGeographies.vue';
import AppGetLabels from './AppGetLabels.vue'
import { WpPosts } from '../types/wpTypes'; // Assuming you have a type definition for posts //WpPost, WpTerm
import _ from "lodash";
import Multiselect from '@vueform/multiselect'


// import { wpData } from './path-to-wpData'; // You need to import wpData or declare it globally

// Assuming wpData is available here, either imported or declared globally
// const cptSelected = ref('posts'); // default post type
const searchTerm = ref('');

const categoryFilter = ref([]);
const geographyFilter = ref<string[]>([]);
const productionFilter = ref([]);
const thematicFilter = ref([]);
const labelFilter = ref([]);
const opentostageFilter = ref(false);
const opentovisitFilter = ref(false);

// console.info(window.wpData);

// const wpCategories = ref(window.wpData.post_categories.map((term: string) => term.toLowerCase())); // Default
// const wpGeography = ref(window.wpData.geography.map((term: string) => {return {value:term.toLowerCase(), label: term}}));
const wpProduction = ref(window.wpData.production.map((term: string) => {return {value:term.toLowerCase(), label: term}}));
const wpThematic = ref(window.wpData.thematic.map((term: string) => {return {value:term.toLowerCase(), label: term}}));
// const wpLabel = ref(window.wpData.label);

// Merge arrays reactively
const mergedFilters = computed<string[]>(() => {
  return [...categoryFilter.value, ...geographyFilter.value, ...productionFilter.value, ...thematicFilter.value, ...labelFilter.value];
});


/**
 * Get directory posts
 */

 // Reactive data
const apiResponse = ref<string>('');
const wpPosts = ref<WpPosts>([]); // Use a more specific type if available
const isDataAvailable = ref<boolean>(false);

// Computed property for filtered results
const filteredResults = computed<WpPosts>(() => {
  if (wpPosts.value.length) {
    const pattern = new RegExp(_.lowerCase(_.deburr(searchTerm.value)), 'i');
    const filteredPosts = wpPosts.value.filter((post) =>
      (
		_.lowerCase(_.deburr(post.title.rendered)).match(pattern) ||
		_.lowerCase(_.deburr(post.vue_meta.additionnal_content)).match(pattern) ||
		_.lowerCase(_.deburr(post.vue_meta.custom_excerpt)).match(pattern)
	  )
	  &&
	  (
        (!opentostageFilter.value && !opentovisitFilter.value) ||
        (opentostageFilter.value && post.vue_meta.opentostage) ||
        (opentovisitFilter.value && post.vue_meta.opentovisit) ||
        (opentostageFilter.value && opentovisitFilter.value && post.vue_meta.opentostage && post.vue_meta.opentovisit)
	  )
    );

    if (mergedFilters && mergedFilters.value.length) {
      return filteredPosts.filter((post) =>
        post.vue_meta.terms.some((term) =>
          mergedFilters.value.includes(term.toLowerCase())
        )
      );
    } else {
      return filteredPosts;
    }
  }
  return [];
});

// Mounted lifecycle hook
onMounted(() => {
  fetchData();
});

// Methods
async function fetchData() {
  apiResponse.value = 'Loading ⏳';
  await getPosts('directory');
}

// Make it global
async function getPosts(route = 'posts', namespace = 'wp/v2') {
	console.log('getPosts::', route)
  try {
    const postsPerPage = 100;
    const restURL = window.wpData.rest_url;
    const fields = 'id,title,link,vue_meta'; //content,author,parent,menu_order

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

<style>

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
