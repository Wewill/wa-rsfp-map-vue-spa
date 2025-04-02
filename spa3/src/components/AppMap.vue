<template>
	<div>
		<!-- isDataAvailable:: {{ isDataAvailable }} -->
		<!-- <pre><b>filteredResults::</b> {{  filteredResults }}</pre> -->
		<!-- <pre><b>computedMarkers::</b> {{  computedMarkers }}</pre> -->

		<code class="d-none">
MAP =
zoom:: {{ zoom }}
center:: {{ center }}
mapLoaded:: {{ mapLoaded }}
leafletReady:: {{ leafletReady }}
selectedDepartmentIds: {{ selectedDepartmentIds }}
showTileLayer: {{ showTileLayer }}
geographyFilter: {{ geographyFilter }}
opentostageFilter: {{ opentostageFilter }}
opentovisitFilter: {{ opentovisitFilter }}
mergedFilters:: {{ mergedFilters }}
filteredResults.length:: {{ filteredResults.length }}
</code>

		<!-- <div class="d-none">

Les thematiques =
{{  wpThematic  }}
{{  wpGeography  }}

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

</div> -->


globalSearch:
{{  globalSearch }}
globalThematicFilter:
{{ globalThematicFilter }}

thematicFilter:
{{  thematicFilter  }}
productionFilter:
{{  productionFilter  }}
geographyFilter:
{{  geographyFilter  }}
labelFilter:
{{  labelFilter }}

	<!-- BEGIN: #Map integration -->
	<section id="map" class="mt-2 mb-2 contrast--light is-formatted">
		<div class="container-fluid mb-n6">
				<div class="row f-w px-4 pb-4">
					<div class="col-12 --zi-max"
						style="--padding-left: calc( calc(var(--modified-bs-gutter-x) / 2) - 1.5rem ) !important;z-index: 410;">

						<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
							<span class="bullet bullet-action-3 ml-0"></span>
							<h5 class="text-action-3">Le répertoire</h5>
						</div>



  <button class="btn btn-sm btn-outline-action-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters"><i class="bi bi-toggles"></i></button>


  <div class="collapse" id="collapseFilters">
	<div class="d-none d-sm-flex align-items-center justify-content-between">
							<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
								<span class="bullet bullet-action-3 ml-0"></span>
								<h6 class="text-action-3">Filtrer</h6>
							</div>
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="200">
								<p class="f-12 font-weight-bold m-0">Production <span
										class="--text-muted --muted fw-medium op-5">{{ wpProduction.length }}</span></p>
								<Multiselect class="multiselect-tag-production" v-model="productionFilter"
									:options="wpProduction" mode="tags" :close-on-select="false" :searchable="true"
									placeholder="Filtrer" @click.stop.prevent />
							</div>
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<p class="f-12 font-weight-bold m-0">Thématique <span
										class="--text-muted --muted fw-medium op-5">{{ wpThematic.length }}</span></p>
								<Multiselect class="multiselect-tag-thematic" v-model="thematicFilter"
									:options="wpThematic" mode="tags" :close-on-select="false" :searchable="true"
									placeholder="Filtrer" @click.stop.prevent />

<p class="f-12 font-weight-bold m-0">Thématique <span class="--text-muted --muted fw-medium op-5">{{ wpThematic.length }}</span></p>
								<Multiselect
									class="multiselect-tag-thematic"
									v-model="thematicFilter"
									:options="wpThematic"
									:object="true"
									mode="tags"
									:close-on-select="false"
									:searchable="true"
									placeholder="Filtrer"
									@click.stop.prevent
								/>
								<Multiselect
									class="multiselect-tag-thematic"
									v-model="globalThematicFilter"
									:options="wpThematic"
									:object="true"
									mode="tags"
									:close-on-select="false"
									:searchable="true"
									placeholder="Filtrer"
									@click.stop.prevent
									@select="(value, options, $e) => {
    console.log('#####', value, options, $e, globalSearch.filter(o => o.term !== 'thematic'), [
        ...globalSearch.filter(o => o.term !== 'thematic'),
        ...(Array.isArray(value) ? value : [value]), // Ensure value is iterable
    ]);
    // Update globalSearch only if the values are different
    globalSearch = [
        ...globalSearch.filter(o => o.term !== 'thematic'),
        ...(Array.isArray(value) ? value : [value]), // Same check when updating globalSearch
    ];
}"
								/>

							</div>
							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<app-get-geographies :display-title="true" :app-filters="geographyFilter"
									@onFilterChange="geographyFilter = $event" />
							</div>

							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<app-get-labels :display-title="true" :app-filters="labelFilter"
									@onFilterChange="labelFilter = $event" />
							</div>

							<div class="flex-fill px-2 w-20" data-aos="fade-left" data-aos-delay="300">
								<p class="f-12 font-weight-bold m-0"><i class="icon icon-filters"></i> Ouvert aux...</p>
								<form>
									<!-- <label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Options"><i class="icon icon-filter"></i> Ouvert aux...</label> -->
									<fieldset class="d-flex">
										<div class="form-check mb-1">
											<input class="form-check-input" type="checkbox" id="opentostageFilter"
												name="opentostageFilter" v-model="opentostageFilter">
											<label class="form-check-label" for="opentostageFilter">Stages</label>
										</div>
										<div class="form-check mb-1 ms-3">
											<input class="form-check-input" type="checkbox" id="opentovisitFilter"
												name="opentovisitFilter" v-model="opentovisitFilter">
											<label class="form-check-label" for="opentovisitFilter">Visites</label>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
						</div>

					</div>
				</div>

				<div class="row f-w px-4 min-vh-80">
					<div
						class="col-sm-6 bg-color-bg rounded-start-4 p-0 d-flex --h-100 justify-content-center align-items-center">
						<l-map class="rounded-start-4" v-if="mapLoaded && isDataAvailable"
							style="min-height: 750px; height: 100%; min-width: 400px; width: 100%;" ref="map"
							:min-zoom="5" :max-zoom="19" v-model:zoom="zoom" v-model:center="center"
							:zoomAnimation="true" :markerZoomAnimation="true" :useGlobalLeaflet="true" :options="{
								zoomControl: true,
								dragging: true,
								touchZoom: false,
								scrollWheelZoom: false,
								doubleClickZoom: false,
								boxZoom: false,
								keyboard: false
							}" @ready="onLeafletReady">
							<!-- Control map -->
							<l-control position="topright">
								<button class="btn btn-sm btn-outline-action-2"
									@click="showTileLayer = !showTileLayer"><i class="bi bi-map-fill"></i></button>
							</l-control>
							<!-- Omit the <l-tile-layer> to not display the base map -->
							<l-tile-layer :url="url" :attribution="attribution" v-if="showTileLayer" />
							<!-- Geojson -->
							<l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction"
								@ready="onGeoJsonReady"></l-geo-json>
							<!-- Markers-->
							<l-marker-cluster-group :icon-create-function="clusterIcon">
								<l-marker
									v-for="(marker, index) in computedMarkers.filter((m: Marker) => m.latLng !== null)"
									:key="index" :lat-lng="marker.latLng">
									<l-popup>


										<div class="card border-0"> <!-- style="width:400px; max-width: 500px;" -->
											<div class="row g-0">
												<div class="col-md-4 d-flex justify-content-stretch align-items-center ---- bg-cover bg-position-center-center rounded-start"
													:style="`background-image: url('${marker.popupImage}');`"
													:title="marker.popupTitle">
													<!-- <img :src="marker.popupImage" class="img-fluid rounded-start" :alt="marker.popupTitle"> -->
												</div>
												<div class="col-md-8">
													<div class="card-body">
														<h5 class="card-title mb-2"><a :href="marker.popupLink"
																v-html="marker.popupTitle"></a></h5>
														<template
															v-for="t_production in marker.terms_data.filter((t: any) => t.taxonomy == 'production')">
															<div class="production-list d-inline-block"><a
																	:href="t_production.link" class="production-item"
																	tabindex="-1">{{ t_production.name }}</a></div>
														</template>
														<template
															v-for="t_thematic in marker.terms_data.filter((t: any) => t.taxonomy == 'thematic')">
															<div class="thematic-list d-inline-block"><a
																	:href="t_thematic.link" class="thematic-item"
																	tabindex="-1">{{ t_thematic.name }}</a></div>
														</template>
														<template
															v-for="t_geography in marker.terms_data.filter((t: any) => t.taxonomy == 'geography')">
															<div class="geography-list d-inline-block"><a
																	:href="t_geography.link" class="geography-item"
																	tabindex="-1">{{ t_geography.name }}</a></div>
														</template>
														<p class="card-text mt-2 small" v-html="marker.popupContent">
														</p>
													</div>
												</div>
											</div>
										</div>

									</l-popup>
									<l-icon :icon-anchor="[10, 10]" class-name="someExtraClass">
										<div
											style="background-color: var(--waff-color-heading, rgb(60, 10, 10)); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white;">
										</div>
									</l-icon>
								</l-marker>
							</l-marker-cluster-group>
						</l-map>
					</div>
					<div class="col-sm-6 bg-action-3 rounded-end-4 p-4 --pb-10 mb-0">


						<div class="global-search form-floating mb-1">

							<!-- BEGIN: Use the GlobalSearch component -->
							<GlobalSearch
								v-model="globalSearch"
								:options="[...wpGeography, ...wpProduction, ...wpThematic, ...wpLabel]"
								@search-change="onSearchChange"
							/>
							<!-- END: Use the GlobalSearch component -->

						</div>

						<div class="row">

							<div class="col-sm-6">
								<app-get-posts :search-term="searchTerm" :app-filters="mergedFilters"
									:opentostage-filter="opentostageFilter" :opentovisit-filter="opentovisitFilter"
									:route="'directory'" />
							</div>

							<!-- <div class="col-6">
								<app-get-posts
									:search-term="searchTerm"
									:route="'farm'"
								/>
							</div> -->

							<div class="col-sm-6">

								<app-get-thematics
									:search-term="searchTerm"
									:app-filters="thematicFilter.map(o => o.value)"
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
import { ref, computed, onBeforeMount, onMounted, nextTick, watch} from 'vue';
// import axios from 'axios';
import AppGetPosts from './AppGetPosts.vue';
import AppGetThematics from './AppGetThematics.vue';
import AppGetGeographies from './AppGetGeographies.vue';
import AppGetLabels from './AppGetLabels.vue'

import { WpPosts, WpPost, Marker, option} from '../types/wpTypes'; // WpTerm
import _ from "lodash";

// https://dev.to/camptocamp-geo/the-3-best-open-source-web-mapping-libraries-57o7
// https://vue3openlayers.netlify.app

// https://github.com/veitbjarsch/vue-leaflet-markercluster?tab=readme-ov-file
import L from 'leaflet'
globalThis.L = L

//import type L from "leaflet";
import { LTileLayer, LMap, LGeoJson, LMarker, LIcon, LPopup, LControl } from "@vue-leaflet/vue-leaflet";
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'
// import 'leaflet/dist/leaflet.css' imported and modified in styles.css
import 'vue-leaflet-markercluster/dist/style.css'
import { FeatureCollection, Geometry } from 'geojson';

import Multiselect from '@vueform/multiselect'
import GlobalSearch from './GlobalSearch.vue';

// import { wpData } from './path-to-wpData'; // You need to import wpData or declare it globally

// Assuming wpData is available here, either imported or declared globally
// const cptSelected = ref('posts'); // default post type
const searchTerm = ref('');

const categoryFilter = ref([]);
const geographyFilter = ref<string[]>([]);
const productionFilter = ref([]);
const thematicFilter = ref<option[]>([]);
const labelFilter = ref([]);
const opentostageFilter = ref(false);
const opentovisitFilter = ref(false);

// console.info(window.wpData);


// const wpCategories 		= ref(window.wpData.post_categories.map((term: string) => {return {value:term.toLowerCase(), label: term, term: 'category'}}));
const wpGeography 		= ref(window.wpData.geography.map((term: string) => {return {value:term.toLowerCase(), label: term, term: 'geography'}}));
const wpProduction 		= ref(window.wpData.production.map((term: string) => {return {value:term.toLowerCase(), label: term, term: 'production'}}));
const wpThematic 		= ref(window.wpData.thematic.map((term: string) => {return {value:term.toLowerCase(), label: term, term: 'thematic'}}));

// Statics in enqueue-scripts.php
const wpLabel = ref(window.wpData.label);

// Merge arrays reactively
const mergedFilters = computed<string[]>(() => {
  return [...categoryFilter.value, ...geographyFilter.value, ...productionFilter.value, ...thematicFilter.value.map(o => o.value), ...labelFilter.value];
});

const globalSearch = ref<option[]>([]);

// Mise à jour des valeurs de recherche globale
watch(globalSearch, (newVal:  option[]) => {
	// Synchronisation avec thematicFilter (ajouter uniquement les options "thematic")
	const thematicOptions = newVal.filter(option => option.term === 'thematic');
	thematicFilter.value = thematicOptions.map(option => ({
		value: option.value,
		label: option.label,
		term: option.term,
	}));
});

// Mise à jour des filtres thématiques
// watch(thematicFilter, (newVal) => {
// 	const otherTerms = globalSearch.value.filter(option => option.term !== 'thematic');

// 	// Synchroniser globalSearch avec thematicFilter
// 	globalSearch.value = [
// 		...otherTerms,
// 		...newVal.map(option => ({
// 			value: option.value,
// 			label: option.label,
// 			term: 'thematic',
// 		})),
// 	];
// });

// Synchronisation de thematicFilter -> selectedSearch
watch(
  thematicFilter,
  (newVal: option[]) => {
    // Garder les termes qui ne sont pas de type 'thematic' dans selectedSearch
    const otherTerms = globalSearch.value.filter(option => option.term !== 'thematic');

    // Ne met à jour selectedSearch que si les valeurs sont différentes
    const updatedSelectedSearch = [
      ...otherTerms,
      ...newVal.map(option => ({
        value: option.value,
        label: option.label,
        term: 'thematic',
      })),
    ];

    if (JSON.stringify(updatedSelectedSearch) !== JSON.stringify(globalSearch.value)) {
		globalSearch.value = updatedSelectedSearch;
    }
  },
  { deep: true }
);


const globalThematicFilter = computed<option[]>(() => globalSearch.value.filter(o => o.term === "thematic") as option[]);

/**
 * Get directory posts
 */


 // Reactive data
 import { getPosts, wpPosts, isDataAvailable, apiResponse } from '../services/postService';

// Computed property for filtered results
const filteredResults = computed<WpPosts>(() => {
	if (wpPosts.value.length) {
		const pattern = new RegExp(_.lowerCase(_.deburr(searchTerm.value)), 'i');
		const filteredPosts = wpPosts.value.filter((post) =>
			(
				_.lowerCase(_.deburr(post.title.rendered)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.additionnal_content)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.custom_excerpt)).match(pattern) ||
				_.lowerCase(_.deburr(post.vue_meta.content)).match(pattern)

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
  await getPosts(['directory']);
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


const markers = ref<Marker[]>([
	{ latLng: [47.413220, -4.219482], popupTitle: 'Marker 1', popupContent: 'Marker 1', popupLink: '#' },
	{ latLng: [48.413220, -7.219482], popupTitle: 'Marker 1', popupContent: 'Marker 2', popupLink: '#' },
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
	if (geojson.value === undefined || !departmentCode) return null;
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
	return filteredResults.value.map((p: WpPost) => {
		console.log(p);
		return {
			latLng: (p.vue_meta.geolocation?.latLng.every(el => el !== null)) ? p.vue_meta.geolocation?.latLng : findDepartmentCenter(p.vue_meta.geolocation?.code[0]),
			popupTitle: (p.title.rendered) ? p.title.rendered : '',
			//			popupContent: (p.excerpt.rendered)?p.excerpt.rendered:'',
			popupContent: (p.vue_meta.farm_title) ? p.vue_meta.farm_title : '', // Lorem ipsum
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

//Styling funcs
let borderColor: string = "rgb(215, 190, 150)";
let fillColor: string = "rgb(255, 255, 255)";
let fillColorHover: string = "rgb(243, 235, 223)";

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
	fillOpacity: .5,
	fillColor: fillColor,
};

const highlightStyle = {
	color: borderColor,
	weight: 1,
	opacity: 1,
	fillOpacity: .8,
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
	return (feature: any, layer: L.Layer) => {
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
					// const bounds = (layer as L.GeoJSON).getBounds();
					// const centerPoint = bounds.getCenter();
					// center.value = [centerPoint.lat, centerPoint.lng];
					// zoom.value = 7; // Adjust zoom level as needed
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
function clusterIcon(cluster: any) {
	return L.divIcon({
		html: `<div style="background-color: var(--waff-action-1, rgb(255, 100, 75)); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white;">
                  <strong>${cluster.getChildCount()}</strong>
               </div>`,
		className: 'marker-cluster-custom',
		iconSize: L.point(40 * (cluster.getChildCount() / 40), 40 * (cluster.getChildCount() / 40), true),
	});
}

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
			if (map.value !== null) map.value.invalidateSize();
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
	if (event.target !== undefined)
		m.fitBounds(event.target.getBounds());
};

// On mount zoom to fit markers
onMounted(() => {
	// Center on map
	if (map.value) {
		const bounds = markers.value.reduce((bounds, marker) => {
			return bounds.extend(marker.latLng);
		}, L.latLngBounds(markers.value[0].latLng, markers.value[0].latLng));

		if (bounds !== undefined)
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

// Multicriteria search
const onSearchChange = (s: string) => {
  console.log('Recherche changée :', s)
  searchTerm.value = s;
  // Si vous avez besoin de charger dynamiquement les options via une API, faites-le ici
  // Exemple : charger des résultats via une requête API en fonction de searchTerm
}


</script>

<style>
/**
Map
 */

/* CSS for Toggle Switch:  https://www.w3schools.com/howto/howto_css_switch.asp */
/* .switch {
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

.switch input:checked+.category-toggle {
	background-color: #42b883;
}

.switch input:checked+.category-toggle:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
} */
</style>
