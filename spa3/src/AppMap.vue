<template>
	<div>
		<code class="--d-none" style="position: absolute; left: 0; top: 0; background-color: honeydew; width: 370px; height: 195px; padding: 10px; opacity: .8; z-index: 9999; overflow-y:scroll; border-radius:4px; margin: 10px;">
		<span class="bg-color-accent-1 text-white px-1 me-1">LOADED:</span>
		<b>isDataAvailable::</b> {{ isDataAvailable }}
		<br/>
		<span class="bg-color-accent-1 text-white px-1 me-1">MAP:</span>
		zoom:: {{ zoom }}
		center:: {{ center }}
		mapLoaded:: {{ mapLoaded }}
		leafletReady:: {{ leafletReady }}
		selectedDepartmentIds: {{ selectedDepartmentIds }}
		showTileLayer: {{ showTileLayer }}
		<br/>
		<span class="bg-color-accent-1 text-white px-1 me-1">FILTERS:</span>
		geographyFilter: {{ geographyFilter }}
		opentostageFilter: {{ opentostageFilter }}
		opentovisitFilter: {{ opentovisitFilter }}
		mergedFilters:: {{ mergedFilters }}
		<br/>
		filteredResults.length:: {{ filteredResults.length }}
		<br/>
		Current view : {{ currentView }}
		<br/>
		<span class="bg-color-accent-1 text-white px-1 me-1 d-inline-block">DATA:</span>
		<pre><b>filteredResults::</b> {{ filteredResults }}</pre>
		<pre><b>computedMarkers::</b> {{ computedMarkers }}</pre>
		</code>

		<!-- BEGIN: #Map integration -->
		<section id="map" class="mt-2 mb-2 contrast--light is-formatted">
			<div class="container-fluid mb-4 position-relative pt-4">

				<!-- Search panel -->
				<div class="row f-w px-4 min-h-100px zi-10">
					<div
						class="col bg-white rounded-top-4 p-0 d-flex --h-100 justify-content-center align-items-center shadow-custom">

						<!-- Search-->
						<div class="flex-fill px-2 border-end border-2 border-action-2 h-100 py-3 d-flex align-items-center justify-content-stretch" data-aos="fade-top">
							<div class="form-floating w-100">
								<!-- Search Box -->
								<!-- <input v-model="searchTerm" type="text"
									class="form-control form-control-lg --border-action-3 --focus-action-3 px-4"
									id="floatingInput" placeholder="Découvrir..." aria-label="Search">
								<label for="floatingInput" class="ms-3 fs-18">Découvrir...</label>
								<div
									class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-4">
									<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path
											d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z">
										</path>
									</svg>
								</div> -->

								<!-- Search Box 2 -->
								<div class="position-relative">
									<input v-model="searchTerm" type="text" class="px-3 border-0" id="floatingInput"
										placeholder="Découvrir..." aria-label="Search">
									<div
										class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-3">
										<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<path
												d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z">
											</path>
										</svg>
									</div>
								</div>

								<!-- <button class="btn btn-primary" @click="centerMap()">Center Map</button>
								<button class="btn btn-secondary" @click="centerMap(true)">Center+Zoom Map</button>
								<button class="btn btn-primary" @click="centerMap(false, true)">Center Map NoOffset</button>
								<button class="btn btn-secondary" @click="centerMap(true, true)">Center+Zoom Map NoOffset</button> -->

							</div>

						</div>
						<!-- Filters -->
						<div class="flex-fill px-2 border-end border-2 border-action-2 h-100 py-3" data-aos="fade-top"
							data-aos-delay="100">
							<p class="f-12 font-weight-bolder m-0 mt-2"><span class="subline text-action-3 f-xs me-1">Filtrer
									par </span> Production <span class="fw-medium op-5">{{
										wpProduction?.length }}</span></p>
							<Multiselect class="multiselect-tag-production multiselect-flat" v-model="productionFilter"
								:options="wpProduction" mode="tags" :close-on-select="false" :searchable="true"
								placeholder="Élevage, maraichage..." @click.stop.prevent />
						</div>
						<div class="flex-fill px-2 border-end border-2 border-action-2 h-100 py-3" data-aos="fade-top"
							data-aos-delay="200">
							<p class="f-12 font-weight-bolder m-0 mt-2">Thématique <span class="fw-medium op-5">{{
								wpThematic?.length }}</span></p>
							<Multiselect class="multiselect-tag-thematic multiselect-flat" v-model="thematicFilter"
								:options="wpThematic" mode="tags" :close-on-select="false" :searchable="true"
								placeholder="Qualité, transmission..." @click.stop.prevent />
						</div>
						<div class="flex-fill px-2 border-end border-2 border-action-2 h-100 py-3" data-aos="fade-top"
							data-aos-delay="300">
							<app-get-geographies :display-title="true" :app-filters="geographyFilter"
								@onFilterChange="geographyFilter = $event" />
						</div>
						<div class="flex-fill px-2 border-end border-2 border-action-2 h-100 py-3" data-aos="fade-top"
							data-aos-delay="400">
							<app-get-labels :display-title="true" :app-filters="labelFilter"
								@onFilterChange="labelFilter = $event" />
						</div>
						<div class="w-120px px-2 h-100 py-3" style="min-width: 110px;" data-aos="fade-top"
							data-aos-delay="500">
							<p class="f-12 font-weight-bold m-0"><i class="icon icon-filters"></i> Ouvert aux...</p>
							<form>
								<fieldset class="">
									<div class="form-check mb-1">
										<input class="form-check-input" type="checkbox" id="opentostageFilter"
											name="opentostageFilter" v-model="opentostageFilter">
										<label class="form-check-label" for="opentostageFilter">Stages</label>
									</div>
									<div class="form-check mb-1">
										<input class="form-check-input" type="checkbox" id="opentovisitFilter"
											name="opentovisitFilter" v-model="opentovisitFilter">
										<label class="form-check-label" for="opentovisitFilter">Visites</label>
									</div>
								</fieldset>
							</form>
						</div>


					</div>
				</div>

				<!-- Map panel-->
				<div class="row is-resizeable f-w px-4 --min-vh-80 position-relative" style="min-height: 750px;">

					<!-- Switch control : absolute-->
					<div class="position-absolute top-0 start-10 m-4 zi-5 w-200-px" data-aos="fade">
						<ul class="m-0 p-0 animated-hover">
							<li @click="currentView = 'thematics'"
								:class="{ 'current text-action-2': currentView === 'thematics' }">
								<i class="icons" alt="icone">
									<IconThematics />
								</i>
								<span class="subline text-action-3 f-xs">Thématiques</span>
							</li>
							<li @click="currentView = 'map'"
								:class="{ 'current text-action-2': currentView === 'map' }">
								<i class="icons" alt="icone">
									<IconMap />
								</i>
								<span class="subline text-action-3 f-xs">Carte</span>
							</li>
							<li @click="currentView = 'map-list'"
								:class="{ 'current text-action-2': currentView === 'map-list'}">
								<i class="icons" alt="icone">
									<IconMapList />
								</i>
								<span class="subline text-action-3 f-xs">Carte + liste</span>
							</li>
							<li @click="currentView = 'list'"
								:class="{ 'current text-action-2': currentView === 'list' }">
								<i class="icons" alt="icone">
									<IconList />
								</i>
								<span class="subline text-action-3 f-xs">Liste</span>
							</li>
						</ul>
					</div>

					<!-- Thematics -->
					<div v-if="currentView === 'thematics'"
						class="col bg-color-bg rounded-bottom-4 rounded-bottom-right-0 p-4">
						<app-get-thematics :search-term="searchTerm" :app-filters="thematicFilter ?? undefined" class="mx-5 ms-10"/>
					</div>


					<!-- Map : resizeable -->
					<div ref="col1Ref" :style="{ flexBasis: col1Width + 'px' }" v-if="currentView === 'map' || currentView === 'map-list'"
						class="col resizeable bg-color-bg rounded-bottom-4 rounded-bottom-right-0 p-0 d-flex --h-100 justify-content-center align-items-center">
						<l-map class="rounded-bottom-4 rounded-bottom-right-0" v-if="mapLoaded && isDataAvailable"
							style="min-height: 750px; height: 100%; min-width: 400px; width: 100%;" ref="mapRef"
							:min-zoom="5" :max-zoom="19" v-model:zoom="zoom" v-model:center="center"
							:zoomAnimation="true" :markerZoomAnimation="true" :useGlobalLeaflet="true" :options="{
								zoomControl: false,
								dragging: true,
								touchZoom: false,
								scrollWheelZoom: false,
								doubleClickZoom: false,
								boxZoom: false,
								keyboard: false,
							}" @ready="onLeafletReady">
							<!-- Control map -->
							<l-control position="bottomleft">
								<button class="btn btn-sm btn-outline-action-2"
									@click="showTileLayer = !showTileLayer"><i class="bi bi-map-fill"></i></button>
							</l-control>
							<!-- Control zoom -->
							<l-control-zoom position="bottomleft"></l-control-zoom>
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
															v-for="t_production in marker.terms_data?.filter((t: any) => t.taxonomy == 'production')">
															<div class="production-list d-inline-block"><a
																	:href="t_production.link" class="production-item"
																	tabindex="-1">{{ t_production.name }}</a></div>
														</template>
														<template
															v-for="t_thematic in marker.terms_data?.filter((t: any) => t.taxonomy == 'thematic')">
															<div class="thematic-list d-inline-block"><a
																	:href="t_thematic.link" class="thematic-item"
																	tabindex="-1">{{ t_thematic.name }}</a></div>
														</template>
														<template
															v-for="t_geography in marker.terms_data?.filter((t: any) => t.taxonomy == 'geography')">
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
											style="background-color: var(--waff-color-heading, rgb(60, 10, 10)); border-radius: 50%; width: 10px; height: 10px; display: flex; align-items: center; justify-content: center; color: white;">
										</div>
									</l-icon>
								</l-marker>
							</l-marker-cluster-group>
						</l-map>
					</div>


					<!-- List : resizeable -->
					<div ref="col2Ref" :style="{ flexBasis: col2Width + 'px' }" v-if="currentView === 'list' || currentView === 'map-list' || currentView === 'thematics'"
						class="col resizeable bg-action-3 rounded-bottom-4 rounded-bottom-left-0 p-4 --pb-10 mb-0">

						<!-- Resizer Handle -->
						<div class="resizer" @mousedown="startResize"></div>

						<app-get-posts :search-term="searchTerm" :app-filters="mergedFilters"
							:opentostage-filter="opentostageFilter" :opentovisit-filter="opentovisitFilter"
							:route="'directory'" />

					</div>
				</div>
			</div>


		</section>
		<!-- END : #Map integration -->

	</div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, nextTick, watch } from 'vue';
import { WpPosts, WpPost, WpTerm } from './types/wpTypes'; // Assuming you have a type definition for posts
import axios from 'axios';
import _ from "lodash";
import Multiselect from '@vueform/multiselect'

import AppGetPosts from './components/AppGetPosts.vue';
import AppGetThematics from './components/AppGetThematics.vue';
import AppGetGeographies from './components/AppGetGeographies.vue';
import AppGetLabels from './components/AppGetLabels.vue'

import IconThematics from "./icons/Thematics.vue";
import IconMap from "./icons/Map.vue";
import IconList from "./icons/List.vue";
import IconMapList from "./icons/MapList.vue";
// import IconResizer from "./icons/Resizer.vue";
// import IconChevron from "./icons/Chevron.vue";

// Import leaflet
// https://dev.to/camptocamp-geo/the-3-best-open-source-web-mapping-libraries-57o7
// https://vue3openlayers.netlify.app
// https://github.com/veitbjarsch/vue-leaflet-markercluster?tab=readme-ov-file
import L from 'leaflet'
globalThis.L = L
import { LTileLayer, LMap, LGeoJson, LMarker, LIcon, LPopup, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'
import 'vue-leaflet-markercluster/dist/style.css'
import { FeatureCollection, Geometry } from 'geojson';


const searchTerm = ref('');
type Views = 'thematics' | 'map' | 'list' | 'map-list';
const currentView = ref<Views>('map-list'); // 'map' or 'list'

const categoryFilter = ref([]);
const geographyFilter = ref<string[]>([]);
const productionFilter = ref([]);
const thematicFilter = ref([]);
const labelFilter = ref([]);
const opentostageFilter = ref(false);
const opentovisitFilter = ref(false);

const wpProduction = ref(window.wpData?.production.map((term: string) => { return { value: term.toLowerCase(), label: term } }));
const wpThematic = ref(window.wpData?.thematic.map((term: string) => { return { value: term.toLowerCase(), label: term } }));

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
	console.log('fetchData::');
	apiResponse.value = 'Loading ⏳';
	await getPosts('directory');
}

// Make it global
async function getPosts(route = 'posts', namespace = 'wp/v2') {
	console.log('getPosts::', route)
	try {
		const postsPerPage = 100;
		const restURL = window.wpData?.rest_url;
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
const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>';
const showTileLayer = ref<Boolean>(false);
const franceDepartments = 'https://rawgit.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const zoom = ref<number>(6);
const center = ref<[number, number]>([47.665496, 2.428034])
const mapLoaded = ref<Boolean>(false);
const leafletReady = ref<Boolean>(false);
const geojson = ref<FeatureCollection<Geometry> | undefined>(undefined);
const mapRef = ref<L.Map | undefined>(undefined);

// Define your marker type
interface Marker {
	latLng: L.LatLngExpression;
	popupTitle: string;
	popupContent?: string;
	popupLink?: string;
	popupImage?: string;
	terms_data?: [WpTerm];
}

// const markers = ref<Marker[]>([
// 	{ latLng: [47.413220, -4.219482], popupTitle: 'Marker 1', popupContent: 'Marker 1', popupLink: '#' },
// 	{ latLng: [48.413220, -7.219482], popupTitle: 'Marker 1', popupContent: 'Marker 2', popupLink: '#' },
// 	{ latLng: [46.413220, 8.219482], popupTitle: 'Marker 1', popupContent: 'Marker 3', popupLink: '#' },
// 	{ latLng: [47.413220, 2.219482], popupTitle: 'Marker 1', popupContent: 'Marker 4', popupLink: '#' },
// 	{ latLng: [45.413220, 4.219482], popupTitle: 'Marker 1', popupContent: 'Marker 5', popupLink: '#' },
// 	{ latLng: [50.413220, 0.219482], popupTitle: 'Marker 1', popupContent: 'Marker 6', popupLink: '#' },
// 	{ latLng: [47.113220, 10.219482], popupTitle: 'Marker 1', popupContent: 'Marker 7', popupLink: '#' },
// 	{ latLng: [47.113220, 10.119482], popupTitle: 'Marker 1', popupContent: 'Marker 8', popupLink: '#' },
// 	{ latLng: [47.013220, 10.119482], popupTitle: 'Marker 1', popupContent: 'Marker 9', popupLink: '#' },
// 	// Add more markers here
// ]);

const nulledLatLngExpression: L.LatLngExpression = [46.6, 2.4];

function findDepartmentCenter(departmentCode: string | undefined): L.LatLngExpression {
	if (geojson.value === undefined || !departmentCode) return nulledLatLngExpression;
	else {
		const department = geojson.value.features.find(feature => feature.properties && 'code' in feature.properties && feature.properties.code === departmentCode);
		if (!department) return nulledLatLngExpression;
		const departmentLayer = L.geoJSON(department);
		const bounds = (departmentLayer as L.GeoJSON).getBounds();
		const centerPoint = bounds.getCenter();
		return (centerPoint.lat && centerPoint.lng) ? [centerPoint.lat, centerPoint.lng] as L.LatLngExpression : nulledLatLngExpression;
	}
}

const computedMarkers = computed<Marker[]>(() => {
	return filteredResults.value.map((p: WpPost): Marker => {
		// console.log(p);
		return {
			latLng: (p.vue_meta.geolocation?.latLng.every(el => el !== null)) ? p.vue_meta.geolocation?.latLng : findDepartmentCenter(p.vue_meta.geolocation?.code[0]),
			popupTitle: (p.title.rendered) ? p.title.rendered : '',
			// popupContent: (p.excerpt.rendered)?p.excerpt.rendered:'',
			popupContent: (p.vue_meta.farm_title) ? p.vue_meta.farm_title : '', // Lorem ipsum
			popupLink: p.link,
			popupImage: p.vue_meta.media_url,
			terms_data: p.vue_meta.terms_data
		} as Marker
	});
});


// On leafleft ready func
const map = ref<L.Map | null>(null);
async function onLeafletReady(event: L.Map) {
	await nextTick();
	map.value = event; // Assign the map instance
	console.log('[onLeafletReady]:: Leaflet map is ready:', event, map.value);
	leafletReady.value = true;

	// Center map on markers
	centerMap();
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
		// layer.bindPopup(feature.properties.nom, { className: 'leaflet-custom-popup' });
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
	console.log('[WATCH] geographyFilter::', newFilter, newFilter.length);
	// Set styles for features in the new filter
	newFilter.forEach(code => {
		const layer = mapLayers.get(code);
		if (layer) {
			(layer as L.Path).setStyle(highlightStyle);  // Apply highlight style
		}
	});

	// Optionally reset styles for features not in the new filter
	mapLayers.forEach((layer, code) => {
		if (!newFilter.includes(code) || newFilter.length === 0) {
			(layer as L.Path).setStyle(defaultStyle);  // Reset to default style
		}
	});

	// Update selectedDepartmentIds based on the new filter
	selectedDepartmentIds.value = newFilter;
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
	console.log('[onBeforeMount]:: fetch GeoJSON data...');
	// Fetch GeoJSON data from GitHub
	try {
		const response = await fetch(franceDepartments);
		if (response.ok) {
			const data = await response.json();
			console.info('Success loading the GeoJSON data.', data);
			geojson.value = data;
			mapLoaded.value = true;
			if (map.value) map.value.invalidateSize();
		} else {
			console.error('Failed to load the GeoJSON data.');
		}
	} catch (error) {
		console.error('Error fetching the GeoJSON data:', error);
	}
});

// Function to adjust the map view once the GeoJSON layer is
const onGeoJsonReady = (event: { map: L.Map; target: L.GeoJSON }) => {
	console.log('onGeoJsonReady::', event);
	// const m = event.map;
	// if (event.target !== undefined) {
	// 	// m.fitBounds(event.target.getBounds());
	// 	// centerMap();
	// }
};

const centerMap = (canZoom: Boolean = false, noOffset: Boolean = false) => {
	console.log('centerMap::');
	// Center on map
	if (map.value) {

		// Checks if the map container size changed and updates the map if so
		// https://leafletjs.com/reference.html#map-invalidatesize
		map.value.invalidateSize();

		// Calculate bounds based on computed markers
		const bounds = L.latLngBounds(computedMarkers.value.map(marker => marker.latLng));
		console.log('bounds::', bounds, map.value.getBoundsZoom(bounds), map.value.getZoom(), computedMarkers.value.length);

		if (bounds !== undefined) {
			// Calculate the new zoom level based on the bounds
			// Do not change zoom considering canZoom
			let newZoom = 6;
			if (canZoom) {
				newZoom = map.value.getBoundsZoom(bounds);
			}

			// Ajust offset as needed
			const offsetX = !noOffset ? -0 : 0; // Horizontal
			const offsetY = !noOffset ? -20 : 0; // Vertical
			const offsetPoint = L.point(offsetX, offsetY);

			// Calculate the new center with the offset
			const newCenter = map.value.project(bounds.getCenter(), newZoom).subtract(offsetPoint);
			map.value.setView(map.value.unproject(newCenter, newZoom), newZoom);
			// Calculate the new center
			// map.value.fitBounds(bounds);
		}
	}
};

// Watcher that reacts to changes in the markers array
watch(computedMarkers, async (newMarkers) => {
	console.log('[WATCH] newMarkers::', newMarkers, map.value);
	await nextTick();
	centerMap(false);
}, { deep: true });

watch(currentView, async (newView) => {
	console.log('[WATCH] currentView::', newView, map.value);
	// Center on map
	if (newView === 'map' || newView === 'map-list') {
		await nextTick();
		centerMap(false);
	}
});

/**
 * Resizeable columns
 */

const colsWidth = ref(0);
const col1Ref = ref<HTMLDivElement | null>(null);
const col2Ref = ref<HTMLDivElement | null>(null);
const col1Width = ref(0);
const col2Width = ref(0);
let startX = 0;
let startWidth1 = 0;
let startWidth2 = 0;
let offset = 4;

onMounted(() => {
	if (col1Ref.value && col2Ref.value) {
		col1Width.value = (col1Ref.value.clientWidth ?? 0) - offset/2;
		col2Width.value =( col2Ref.value.clientWidth ?? 0) - offset/2;

		colsWidth.value = col1Width.value + col2Width.value;
	}
});

const startResize = (event: MouseEvent) => {
	startX = event.clientX;
	startWidth1 = col1Width.value;
	startWidth2 = col2Width.value;

	document.addEventListener('mousemove', doResize);
	document.addEventListener('mouseup', stopResize);
};

const doResize = (event: MouseEvent) => {
	const deltaX = event.clientX - startX;

	// Calculate new widths with a maximum width of 150px for each column to prevent overflow
	const newCol1Width = Math.max(500, startWidth1 + deltaX);
	const newCol2Width = Math.max(500, startWidth2 - deltaX);

	// Ensure columns stay within their minimum widths and prevent overflow
	if (newCol1Width + newCol2Width <= startWidth1 + startWidth2) {
		col1Width.value = newCol1Width - offset/2;
		col2Width.value = newCol2Width - offset/2;
	}

	console.log('NEW> startWidth:', (startWidth1 + startWidth2) + ' / ' + (newCol1Width + newCol2Width), 'col1Width', col1Width.value, 'col2Width', col2Width.value, 'startWidth1', startWidth1, 'startWidth2', startWidth2, 'deltaX', deltaX, 'startX', startX, 'event.clientX', event.clientX);
};

const stopResize = () => {
	document.removeEventListener('mousemove', doResize);
	document.removeEventListener('mouseup', stopResize);
};


</script>

<style scoped>

.row.is-resizeable {
	display: flex;
	align-items: stretch;
}

.col.resizeable {
	position: relative;
	transition: flex-basis 0.1s;
}

.resizer {
	width: 8px;
	cursor: ew-resize;
	background: #007bff;
	/* margin: 0 4px; */
	position: absolute;
	height: 24px;
	top: 0;
	left: -4px;
}

</style>
