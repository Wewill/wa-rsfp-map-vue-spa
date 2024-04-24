<template>
  <div>
<!-- isDataAvailable:: {{ isDataAvailable }} -->
<!-- <pre><b>filteredResults::</b> {{  filteredResults }}</pre> -->
<!-- <pre><b>computedMarkers::</b> {{  computedMarkers }}</pre> -->

<code>
MAP =
zoom:: {{  zoom }}
center:: {{  center }}
mapLoaded:: {{  mapLoaded }}
leafletReady:: {{  leafletReady }}
selectedDepartmentIds: {{ selectedDepartmentIds }}
showTileLayer: {{  showTileLayer }}
geographyFilter: {{  geographyFilter }}
opentostageFilter: {{  opentostageFilter }}
opentovisitFilter: {{  opentovisitFilter }}
mergedFilters:: {{  mergedFilters }}
filteredResults.length:: {{  filteredResults.length }}
</code>

<div class="d-none">

Les thematiques =
{{  wpThematic  }}
{{  wpGeography  }}

<!-- Filter Buttons -->
<app-filter-switches
	:app-filters="wpCategories"
	@onFilterToggle="categoryFilter = $event"
/>
{{  categoryFilter  }}
<app-filter-switches
	:app-filters="wpGeography"
	@onFilterToggle="geographyFilter = $event"
/>
	{{  geographyFilter  }}
<app-filter-switches
	:app-filters="wpProduction"
	@onFilterToggle="productionFilter = $event"
/>
	{{  productionFilter  }}
<app-filter-switches
	:app-filters="wpThematic"
	@onFilterToggle="thematicFilter = $event"
/>
	{{  thematicFilter  }}

</div>
	<!-- MERGED ===
	{{  mergedFilters }} -->

		<!-- #Map integration -->
		<section id="map" class="mt-2 mb-2 contrast--light is-formatted">
			<div class="container-fluid mb-n6">
					<div class="row f-w px-4 pb-4">
						<div class="col-8" style="padding-left: calc( calc(var(--modified-bs-gutter-x) / 2) - 1.5rem ) !important;">


							<div class="d-flex align-items-top justify-content-between">
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
									<span class="bullet bullet-action-3 ml-0"></span>
									<h5 class="text-action-3">Le répertoire</h5>
								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
									<p class="f-12 font-weight-bold m-0">Production</p>

									<Multiselect
										class="multiselect-tag-production"
										v-model="productionFilter"
										:options="wpProduction"
										mode="tags"
										:close-on-select="false"
										:searchable="true"
										placeholder="Select"
										@click.stop.prevent
									/>
								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<p class="f-12 font-weight-bold m-0">Thematique</p>

									<Multiselect
										class="multiselect-tag-thematic"
										v-model="thematicFilter"
										:options="wpThematic"
										mode="tags"
										:close-on-select="false"
										:searchable="true"
										placeholder="Select"
										@click.stop.prevent
									/>

								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<!-- <p class="f-12 font-weight-bold m-0">Geography</p> -->
									<!-- <Multiselect
										class="multiselect-tag-geography"
										v-model="geographyFilter"
										:options="wpGeography"
										mode="tags"
										:close-on-select="false"
										:searchable="true"
										placeholder="Select"
										@click.stop.prevent
									/> -->

									<app-get-geographies
										:display-title="true"
										:search-term="searchTerm"
										:app-filters="geographyFilter"
										@onFilterChange="geographyFilter = $event"
									/>


								</div>

								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<app-get-labels
										:display-title="true"
										:search-term="searchTerm"
										:app-filters="labelFilter"
										@onFilterChange="labelFilter = $event"
									/>
								</div>

								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<p class="f-12 font-weight-bold m-0"><i class="icon icon-filters"></i> Filtres</p>
									<div class="d-flex align-items-top justify-content-between">
										<!-- <div class="">
											<form>
												<label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Type"><i class="icon icon-type"></i> Type</label>
												<fieldset>
												<div class="form-check mb-1">
													<input class="form-check-input" id="type-house" type="checkbox" value=""> <label class="form-check-label" for="type-house">Lorem</label>
												</div>
												<div class="form-check mb-1">
													<input checked class="form-check-input" id="type-apartement" type="checkbox" value=""> <label class="form-check-label" for="type-apartement">Lorem</label>
												</div>
												</fieldset>
											</form>
										</div> -->
										<div class="">
											<form>
												<!-- <label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Options"><i class="icon icon-filter"></i> Options</label> -->
												<fieldset>
													<div class="form-check mb-1">
														<input class="form-check-input" type="checkbox" id="opentostageFilter" name="opentostageFilter" v-model="opentostageFilter">
														<label class="form-check-label" for="opentostageFilter">Ouvert aux stages</label>
													</div>
													<div class="form-check mb-1">
														<input class="form-check-input" type="checkbox" id="opentovisitFilter" name="opentovisitFilter" v-model="opentovisitFilter">
														<label class="form-check-label" for="opentovisitFilter">Ouvert aux visites</label>
													</div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
							</div>



						</div>
						<div class="col-4 px-0 pt-1">

							<div class="form-floating mb-3">
								<!-- Search Box -->
								<input  v-model="searchTerm" type="text" class="form-control --form-control-lg border-action-3 focus-action-3 px-4" id="floatingInput" placeholder="Rechercher..." aria-label="Search">
								<label for="floatingInput" class="ms-3 fs-18">Rechercher...</label>
								<div class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-4">
									<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z"></path></svg>
								</div>
							</div>

						</div>
					</div>

					<div class="row f-w px-4">
						<div class="col-8 bg-color-bg rounded-start-4 p-0 d-flex --h-100 justify-content-center align-items-center">

							<l-map class="rounded-start-4" v-if="mapLoaded && isDataAvailable" style="min-height: 800px; height: 100%; min-width: 800px; width: 100%;"
								ref="map"
								:min-zoom="5"
								:max-zoom="19"
								v-model:zoom="zoom"
								v-model:center="center"
								:zoomAnimation="true"
								:markerZoomAnimation="true"
								:useGlobalLeaflet="true"
								:options="{ zoomControl: true }"
								@ready="onLeafletReady"
							>
									<!-- Control map -->
									<l-control position="topright" >
										<button class="btn btn-sm btn-outline-action-2" @click="showTileLayer = !showTileLayer"><i class="bi bi-map-fill"></i></button>
									</l-control>
									<!-- Omit the <l-tile-layer> to not display the base map -->
									<l-tile-layer :url="url" :attribution="attribution" v-if="showTileLayer"/>
									<!-- Geojson -->
									<l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction"  @ready="onGeoJsonReady"></l-geo-json>
									<!-- Markers-->
									<l-marker-cluster-group :icon-create-function="clusterIcon">
									<l-marker v-for="(marker, index) in computedMarkers.filter( (m:Marker) => m.latLng !== null )" :key="index" :lat-lng="marker.latLng">
										<l-popup>
											<!-- <div class="card">
												<img :src="marker.popupImage" class="card-img-top" :alt="marker.popupTitle">
												<div class="card-body">
													<h5 class="card-title"><a :href="marker.popupLink" v-html="marker.popupTitle"></a></h5>
													<template v-for="t_production in marker.terms_data.filter((t:any) => t.taxonomy == 'production' )" >
														<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
													</template>
													<template v-for="t_thematic in marker.terms_data.filter((t:any) => t.taxonomy == 'thematic' )" >
														<div class="thematic-list d-inline-block"><a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name}}</a></div>
													</template>
													<template v-for="t_geography in marker.terms_data.filter((t:any) => t.taxonomy == 'geography' )" >
														<div class="geography-list d-inline-block"><a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name}}</a></div>
													</template>
													<p class="card-text" v-html="marker.popupContent"></p>
												</div>
											</div> -->
											<div class="card border-0"> <!-- style="width:400px; max-width: 500px;" -->
												<div class="row g-0">
													<div class="col-md-4 d-flex justify-content-stretch align-items-center ---- bg-cover bg-position-center-center rounded-start" :style="`background-image: url('${marker.popupImage}');`" :title="marker.popupTitle">
														<!-- <img :src="marker.popupImage" class="img-fluid rounded-start" :alt="marker.popupTitle"> -->
													</div>
													<div class="col-md-8">
														<div class="card-body">
															<h5 class="card-title mb-2"><a :href="marker.popupLink" v-html="marker.popupTitle"></a></h5>
															<template v-for="t_production in marker.terms_data.filter((t:any) => t.taxonomy == 'production' )" >
																<div class="production-list d-inline-block"><a :href="t_production.link" class="production-item" tabindex="-1">{{ t_production.name}}</a></div>
															</template>
															<template v-for="t_thematic in marker.terms_data.filter((t:any) => t.taxonomy == 'thematic' )" >
																<div class="thematic-list d-inline-block"><a :href="t_thematic.link" class="thematic-item" tabindex="-1">{{ t_thematic.name}}</a></div>
															</template>
															<template v-for="t_geography in marker.terms_data.filter((t:any) => t.taxonomy == 'geography' )" >
																<div class="geography-list d-inline-block"><a :href="t_geography.link" class="geography-item" tabindex="-1">{{ t_geography.name}}</a></div>
															</template>
															<p class="card-text mt-2 small" v-html="marker.popupContent"></p>
														</div>
													</div>
												</div>
											</div>

										</l-popup>
										<l-icon
											:icon-anchor="[10, 10]"
											class-name="someExtraClass"
											>
											<div style="background-color: var(--waff-color-heading, rgb(60, 10, 10)); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white;"></div>
										</l-icon>
									</l-marker>
									</l-marker-cluster-group>
							</l-map>
						</div>
						<div class="col-4 bg-action-3 rounded-end-4 p-4 pb-10">

							<app-get-posts
								:search-term="searchTerm"
								:app-filters="mergedFilters"
								:opentostage-filter="opentostageFilter"
								:opentovisit-filter="opentovisitFilter"
								:route="'directory'"
							/>

							<app-get-posts
								:search-term="searchTerm"
								:route="'farm'"
							/>

							<!-- <app-get-posts
								:search-term="searchTerm"
								:app-filters="thematicFilter"
								:route="'operation'"
							/>

							<app-get-posts
								:search-term="searchTerm"
								:app-filters="geographyFilter"
								:route="'structure'"
							/> -->

							<app-get-thematics
								:search-term="searchTerm"
								:app-filters="thematicFilter"
    						/>

							<!-- <app-get-geographies
								:display-title="true"
								:search-term="searchTerm"
								:app-filters="geographyFilter"
								@onFilterChange="geographyFilter = $event"
    						/> -->

						</div>
				</div>
			</div>

			<!-- Begin: CTA -->
			<div class="d-flex align-items-center justify-content-center py-4 px-5 bg-body rounded-4 shadow mx-20 mb-6 --z-2 position-relative" style="z-index:1000;">
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

			</div>
			<!-- End: CTA -->

		</section>

<!--

	Posts=
    <app-get-posts
      :search-term="searchTerm"
      :app-filters="mergedFilters"
      :route="cptSelected"
    />

	Directory=
    <app-get-posts
      :search-term="searchTerm"
      :app-filters="mergedFilters"
      :route="'directory'"
    />

	Farm=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="mergedFilters"
      :route="'farm'"
    />

	Operation=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="mergedFilters"
      :route="'operation'"
    />

	Structure=
	<app-get-posts
      :search-term="searchTerm"
      :app-filters="mergedFilters"
      :route="'structure'"
    /> -->

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, nextTick, watch} from 'vue';
import axios from 'axios';
import AppFilterSwitches from './AppFilterSwitches.vue';
import AppGetPosts from './AppGetPosts.vue';
import AppGetThematics from './AppGetThematics.vue';
import AppGetGeographies from './AppGetGeographies.vue';
import AppGetLabels from './AppGetLabels.vue'
import { WpPosts, WpPost, WpTerm} from '../types/wpTypes'; // Assuming you have a type definition for posts

// https://dev.to/camptocamp-geo/the-3-best-open-source-web-mapping-libraries-57o7
// https://vue3openlayers.netlify.app

// https://github.com/veitbjarsch/vue-leaflet-markercluster?tab=readme-ov-file
import L from 'leaflet'
globalThis.L = L

//import type L from "leaflet";
import { LTileLayer, LMap, LGeoJson, LMarker, LIcon, LPopup, LControl} from "@vue-leaflet/vue-leaflet";
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'
// import 'leaflet/dist/leaflet.css' imported and modified in styles.css
import 'vue-leaflet-markercluster/dist/style.css'
import { FeatureCollection, Geometry } from 'geojson';

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

console.info(window.wpData);

const wpCategories = ref(window.wpData.post_categories.map((term: string) => term.toLowerCase())); // Default
const wpGeography = ref(window.wpData.geography.map((term: string) => term.toLowerCase()));
const wpProduction = ref(window.wpData.production.map((term: string) => term.toLowerCase()));
const wpThematic = ref(window.wpData.thematic.map((term: string) => term.toLowerCase()));
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
    const pattern = new RegExp(searchTerm.value, 'i');
    const filteredPosts = wpPosts.value.filter((post) =>
      (
		post.title.rendered.match(pattern) ||
		post.vue_meta.additionnal_content.match(pattern) ||
		post.vue_meta.custom_excerpt.match(pattern)
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



// Map
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const showTileLayer = ref<Boolean>(false);
const franceDepartments = 'https://rawgit.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const zoom = ref<number>(6);
const center = ref<[number, number]>([47.665496, 2.428034])
const mapLoaded = ref<Boolean>(false);
const leafletReady = ref<Boolean>(false);
const geojson = ref<FeatureCollection<Geometry> | undefined>(undefined);
const map = ref<L.Map | null>(null);

// Define your marker type
interface Marker {
  latLng: L.LatLngExpression;
  popupTitle: string;
  popupContent?: string;
  popupLink?: string;
  popupImage?: string;
  terms_data?: [WpTerm];
}

const markers = ref<Marker[]>([
	{ latLng: [47.413220, -4.219482], popupTitle: 'Marker 1', popupContent: 'Marker 1', popupLink: '#' },
	{ latLng: [48.413220, -7.219482], popupTitle: 'Marker 1', popupContent: 'Marker 2', popupLink: '#'},
	{ latLng: [46.413220, 8.219482], popupTitle: 'Marker 1', popupContent: 'Marker 3', popupLink: '#' },
	{ latLng: [47.413220, 2.219482], popupTitle: 'Marker 1', popupContent: 'Marker 4', popupLink: '#' },
	{ latLng: [45.413220, 4.219482], popupTitle: 'Marker 1', popupContent: 'Marker 5', popupLink: '#' },
	{ latLng: [50.413220, 0.219482], popupTitle: 'Marker 1', popupContent: 'Marker 6', popupLink: '#' },
	{ latLng: [47.113220, 10.219482], popupTitle: 'Marker 1', popupContent: 'Marker 7', popupLink: '#' },
	{ latLng: [47.113220, 10.119482], popupTitle: 'Marker 1', popupContent: 'Marker 8', popupLink: '#' },
	{ latLng: [47.013220, 10.119482], popupTitle: 'Marker 1', popupContent: 'Marker 9', popupLink: '#' },
	// Add more markers here
]);

function findDepartmentCenter(departmentCode: string | undefined): [number, number] | null {
	if ( geojson.value === undefined || !departmentCode ) return null;
	else {
		const department = geojson.value.features.find(feature => feature.properties && 'code' in feature.properties && feature.properties.code === departmentCode);
		if (!department) return null;

		const departmentLayer = L.geoJSON(department);
		const bounds = (departmentLayer as L.GeoJSON).getBounds();
		const centerPoint = bounds.getCenter();
		return [centerPoint.lat, centerPoint.lng];
	}
}

const computedMarkers = computed<Marker[] | any>(() => {
	return filteredResults.value.map((p:WpPost) =>
	{
		return {
			latLng: ( p.vue_meta.geolocation?.latLng.every(el => el !== null) )?p.vue_meta.geolocation?.latLng:findDepartmentCenter(p.vue_meta.geolocation?.code[0]),
			popupTitle: (p.title.rendered)?p.title.rendered:'',
//			popupContent: (p.excerpt.rendered)?p.excerpt.rendered:'',
			popupContent: 'Lorem ipsum',
			popupLink: p.link,
			popupImage: p.vue_meta.media_url,
			terms_data: p.vue_meta.terms_data
		}
	});
});


// Ready funcs
async function onLeafletReady() {
  await nextTick();
  leafletReady.value = true;
}

// function toggleTileLayer() {
// 	showTileLayer.value = !showTileLayer.value;
// }

//Styling funcs
let borderColor:string 		= "rgb(215, 190, 150)";
let fillColor:string 		= "rgb(255, 255, 255)";
let fillColorHover:string 	= "rgb(243, 235, 223)";

const options = computed(() => {
  return {
    onEachFeature: onEachFeatureFunction.value
  };
});

// Styling geojson map
const defaultStyle = {
  color: borderColor,
  weight: 1,
  opacity: 1,
  fillOpacity: .9,
  fillColor: fillColor,
};

const highlightStyle = {
  color: borderColor,
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  fillColor: fillColorHover,
};

const styleFunction = computed(() => {
  return () => {
    return defaultStyle;
  };
});

// Define a reactive constant to store the clicked department's ID
const selectedDepartmentIds = ref<string[]>([]);
const mapLayers = new Map(); // To map department codes to layers

// Function to bind to each feature on geojson map
const onEachFeatureFunction = computed(() => {
  return (feature:any, layer:L.Layer) => {
	if (!feature.properties) return;
	// Load layers to layersMap to reuse in a watcher
	// Assuming 'code' is a unique identifier for each feature
	mapLayers.set(feature.properties.code, layer);

	// Tooltip
    layer.bindTooltip(
      `<span class="properties-name">${feature.properties.nom}</span>`,
      { permanent: false, sticky: true, className: 'leaflet-custom-tooltip' }
    );
	// Popup
	//layer.bindPopup(feature.properties.nom, { className: 'leaflet-custom-popup' });
	// Click
    layer.on({
      click: (e: L.LeafletMouseEvent) => {
		const departmentId = feature.properties.code; // Assuming 'code' is the department ID property
		const index = selectedDepartmentIds.value.indexOf(departmentId);

		if (index > -1) {
			// Department is already selected, remove it from the array (deselect)
			selectedDepartmentIds.value.splice(index, 1);
			(layer as L.Path).setStyle(defaultStyle); // Reset style to default
		} else {
			// Department is not selected, add it to the array (select)
			selectedDepartmentIds.value.push(departmentId);
			(layer as L.Path).setStyle(highlightStyle); // Apply highlight style

			// Centering and zoom logic
			// Assuming 'layer' is of type L.GeoJSON (or similar Leaflet layer type)
			// which supports getBounds().
			const bounds = (layer as L.GeoJSON).getBounds();
			const centerPoint = bounds.getCenter();
			center.value = [centerPoint.lat, centerPoint.lng];
			zoom.value = 8; // Adjust zoom level as needed
		}

		geographyFilter.value = selectedDepartmentIds.value;

		// Console
		console.log(`Department clicked: ${feature.properties.nom} | ${e} `);
      },
    });
  }
});

// watch geographyFilter
watch(geographyFilter, (newFilter) => {
	// Set styles for features in the new filter
	newFilter.forEach(code => {
        const layer = mapLayers.get(code);
        if (layer) {
            (layer as L.Path).setStyle(highlightStyle);  // Apply highlight style
        }
    });

    // Optionally reset styles for features not in the new filter
    mapLayers.forEach((layer, code) => {
        if (!newFilter.includes(code)) {
            (layer as L.Path).setStyle(defaultStyle);  // Reset to default style
        }
    });
});

// Cluster and marker styles
function clusterIcon(cluster:any) {
      return L.divIcon({
        html: `<div style="background-color: var(--waff-action-1, rgb(255, 100, 75)); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white;">
                  <strong>${cluster.getChildCount()}</strong>
               </div>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(40 * (cluster.getChildCount()/40), 40  * (cluster.getChildCount()/40), true),
      });
    }

// 	function markerIcon() {
// 		return L.divIcon({
// 	// 		iconUrl: 'path/to/your/icon.png',
//     //   iconSize: [38, 95], // Size of the icon
//     //   iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
//     //   popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
// 	html: `<div style="background-color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: #f28f43;">
//                   PIN
//                </div>`,
//         className: 'marker-cluster-custom',
//         iconSize: L.point(40, 40, true),

//       });
// }

// function markerIcon() {
// return L.icon({
// 	iconUrl: 'path/to/your/icon.png',
// 	iconSize: [38, 95], // Size of the icon
// 	iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
// 	popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
// 	});
// }

// Before mount load geojson map
onBeforeMount(async () => {
  // Fetch GeoJSON data from GitHub
  try {
    const response = await fetch(franceDepartments);
    if (response.ok) {
      const data = await response.json();
	  console.info('Success loading the GeoJSON data.', data);
      geojson.value = data;
      mapLoaded.value = true;
	  if( map.value !== null ) map.value.invalidateSize();
    } else {
      console.error('Failed to load the GeoJSON data.');
    }
  } catch (error) {
    console.error('Error fetching the GeoJSON data:', error);
  }
});

// Function to adjust the map view once the GeoJSON layer is
const onGeoJsonReady = (event: { map: L.Map; target: L.GeoJSON }) => {
	const m = event.map;
	if ( event.target !== undefined )
		m.fitBounds(event.target.getBounds());
};

// On mount zoom to fit markers
onMounted(() => {
	// Center on map
	if (map.value) {
		const bounds = markers.value.reduce((bounds, marker) => {
		return bounds.extend(marker.latLng);
		}, L.latLngBounds(markers.value[0].latLng, markers.value[0].latLng));

		if ( bounds !== undefined )
			map.value.fitBounds(bounds);
	}
});

// Watcher that reacts to changes in the markers array
watch(markers, (newMarkers) => {
  if (map.value && newMarkers.length > 0) {
    const bounds = newMarkers.reduce((bounds, marker) => bounds.extend(marker.latLng), L.latLngBounds(newMarkers[0].latLng, newMarkers[0].latLng));
    map.value.fitBounds(bounds);
  }
}, { deep: true });


</script>

<style>
/**
Map
 */

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
