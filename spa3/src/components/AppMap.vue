<template>
  <div>
MAP =
zoom:: {{  zoom }}
center:: {{  center }}
mapLoaded:: {{  mapLoaded }}
leafletReady:: {{  leafletReady }}
selectedDepartmentIds: {{ selectedDepartmentIds }}
showTileLayer: {{  showTileLayer }}
<button @click="showTileLayer = !showTileLayer">Toggle Tile Layer</button>

<div class="d-none">

	Les thematiques =
	{{  wpThematic  }}

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

		MERGED ===
		{{  mergedFilters }}

	</div>



		<!-- #Map integration -->
		<section id="map" class="mt-2 mb-2 contrast--light is-formatted">
			<div class="container-fluid mb-n6">
					<div class="row f-w px-4 pb-4">
						<div class="col-9" style="padding-left: calc( calc(var(--modified-bs-gutter-x) / 2) - 1.5rem ) !important;">


							<div class="d-flex align-items-top justify-content-between">
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
									<span class="bullet bullet-action-3 ml-0"></span>
									<h5 class="text-action-3">Le répertoire</h5>
								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="200">
									<p class="f-12 font-weight-bold m-0">Trier</p>

									<div>
										<div class=""><a href="#"><i class="icon icon-up"></i> Trier par prix</a></div>
										<div class=""><a href="#"><i class="icon icon-down"></i> Trier par surface</a></div>
									</div>

								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<p class="f-12 font-weight-bold m-0">Localisation</p>

									<form>
										<label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="City"><i class="icon icon-pin"></i> Ville</label>
										<fieldset>
										<select id="City" aria-label="Default select example" class="form-select">
											<option selected>
											Paris
											</option>
											<option value="1">
											Lille
											</option>
											<option value="2">
											Provence
											</option>
										</select>
										</fieldset>
									</form>

								</div>
								<div class="flex-fill px-2" data-aos="fade-left" data-aos-delay="300">
									<p class="f-12 font-weight-bold m-0"><i class="icon icon-filters"></i> Filtres</p>
									<div class="d-flex align-items-top justify-content-between">
										<div class="">
											<form>
												<label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Type"><i class="icon icon-type"></i> Type</label>
												<fieldset>
												<div class="form-check mb-1">
													<input class="form-check-input" id="type-house" type="checkbox" value=""> <label class="form-check-label" for="type-house">Maison</label>
												</div>
												<div class="form-check mb-1">
													<input checked class="form-check-input" id="type-apartement" type="checkbox" value=""> <label class="form-check-label" for="type-apartement">Appartement</label>
												</div>
												</fieldset>
											</form>
										</div>
										<div class="">
											<form>
												<label class="form-label f-12 font-weight-bold text-uppercase mb-3 color-gray" for="Options"><i class="icon icon-filter"></i> Options</label>
												<fieldset>
													<div class="form-check mb-1">
														<input class="form-check-input" id="flexCheckDefault" type="checkbox" value=""> <label class="form-check-label" for="flexCheckDefault">Ouvert aux stages</label>
													</div>
													<div class="form-check mb-1">
														<input class="form-check-input" id="flexCheckDefault" type="checkbox" value=""> <label class="form-check-label" for="flexCheckDefault">Ouvert aux visites</label>
													</div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
							</div>



						</div>
						<div class="col-3 px-0 pt-1">

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
						<div class="col-9 bg-color-bg rounded-start-4 p-0 d-flex --h-100 justify-content-center align-items-center">
							<l-map class="rounded-start-4" v-if="mapLoaded" style="min-height: 800px; height: 100%; min-width: 800px; width: 100%;"
								ref="map"
								:max-zoom="19"
								v-model:zoom="zoom"
								v-model:center="center"
								:zoomAnimation="true"
								:markerZoomAnimation="true"
								:useGlobalLeaflet="true"
								:options="{ zoomControl: false }"
								@ready="onLeafletReady"
							>
									<!-- Omit the <l-tile-layer> to not display the base map -->
										<l-tile-layer :url="url" :attribution="attribution" v-if="showTileLayer"/>
									<l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction" @ready="onGeoJsonReady"></l-geo-json>
									<l-marker :lat-lng="marker" :icon="markerIcon" />
									<l-circle-marker :lat-lng="[41.89026, 12.49238]" :radius="50" />

									<l-marker-cluster-group :icon-create-function="clusterIcon">
										<l-marker :lat-lng="[47.51322, -1.219482]" />
										<l-marker :lat-lng="[47.41322, -2.219482]" />
										<l-marker :lat-lng="[47.41322, -1.319482]" />
										<l-marker :lat-lng="[47.61322, -1.119482]" />
										<l-circle-marker :lat-lng="[44.89026, 2.49238]" :radius="10" />
									</l-marker-cluster-group>

									<l-marker-cluster-group :icon-create-function="clusterIcon">
									<l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.latLng">
										<l-popup>{{ marker.popupContent }}</l-popup>
										<l-icon
											:icon-anchor="[10, 10]"
											class-name="someExtraClass"
											>
											<div style="background-color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: #f28f43;"></div>
										</l-icon>
									</l-marker>
									</l-marker-cluster-group>

							</l-map>
						</div>
						<div class="col-3 bg-action-3 rounded-end-4 p-4 pb-10">

							<app-get-posts
								:search-term="searchTerm"
								:app-filters="mergedFilters"
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

						</div>
				</div>
			</div>

			<!-- Begin: CTA -->
			<div class="d-flex align-items-center justify-content-center py-4 px-5 bg-body rounded-4 shadow mx-20 mb-6 z-2 position-relative">
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




    <!-- AppGetPosts Component -->
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
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, nextTick, watch} from 'vue';
import AppFilterSwitches from './AppFilterSwitches.vue';
import AppGetPosts from './AppGetPosts.vue';
import AppGetThematics from './AppGetThematics.vue';

// https://dev.to/camptocamp-geo/the-3-best-open-source-web-mapping-libraries-57o7
// https://vue3openlayers.netlify.app

// https://github.com/veitbjarsch/vue-leaflet-markercluster?tab=readme-ov-file
import L from 'leaflet'
globalThis.L = L

//import type L from "leaflet";
import { LTileLayer, LMap, LGeoJson, LMarker, LCircleMarker, LIcon, LPopup} from "@vue-leaflet/vue-leaflet";
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'vue-leaflet-markercluster/dist/style.css'

// import { wpData } from './path-to-wpData'; // You need to import wpData or declare it globally

// Assuming wpData is available here, either imported or declared globally
const cptSelected = ref('posts'); // default post type
const searchTerm = ref('');

const categoryFilter = ref([]);
const geographyFilter = ref([]);
const productionFilter = ref([]);
const thematicFilter = ref([]);

const wpCategories = ref(window.wpData.post_categories.map((term: string) => term.toLowerCase())); // Default
const wpGeography = ref(window.wpData.geography.map((term: string) => term.toLowerCase()));
const wpProduction = ref(window.wpData.production.map((term: string) => term.toLowerCase()));
const wpThematic = ref(window.wpData.thematic.map((term: string) => term.toLowerCase()));

// Merge arrays reactively
const mergedFilters = computed(() => {
  return [...categoryFilter.value, ...geographyFilter.value, ...productionFilter.value, ...thematicFilter.value];
});

// Map
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const showTileLayer = ref<Boolean>(false);
const franceDepartments = 'https://rawgit.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';
const zoom = ref<number>(6);
const center = ref<[number, number]>([47.665496, 2.428034])
const mapLoaded = ref<Boolean>(false);
const leafletReady = ref<Boolean>(false);
const geojson = ref(undefined);
const marker = ref<L.LatLngExpression>([47.41322, -1.219482]);
const map = ref<L.Map | null>(null);

// Define your marker type
interface Marker {
  latLng: L.LatLngExpression;
  popupContent: string;
}

const markers = ref<Marker[]>([
	{ latLng: [47.413220, -4.219482], popupContent: 'Marker 1' },
	{ latLng: [48.413220, -7.219482], popupContent: 'Marker 2' },
	{ latLng: [46.413220, 8.219482], popupContent: 'Marker 3' },
	{ latLng: [47.413220, 2.219482], popupContent: 'Marker 4' },
	{ latLng: [45.413220, 4.219482], popupContent: 'Marker 5' },
	{ latLng: [50.413220, 0.219482], popupContent: 'Marker 6' },
	{ latLng: [47.113220, 10.219482], popupContent: 'Marker 7' },
	{ latLng: [47.113220, 10.119482], popupContent: 'Marker 8' },
	{ latLng: [47.013220, 10.119482], popupContent: 'Marker 9' },
	// Add more markers here
]);

async function onLeafletReady() {
  await nextTick();
  leafletReady.value = true;
}

let borderColor:string 	= "#e4ce7f";
let fillColor:string 	= "#e4ce7f";
const options = computed(() => {
  return {
    onEachFeature: onEachFeatureFunction.value
  };
});

// Styling geojson map
const defaultStyle = {
  color: borderColor,
  weight: 2,
  opacity: 1,
  fillOpacity: 0.6,
  fillColor: fillColor,
};

const highlightStyle = {
  color: borderColor,
  weight: 2,
  opacity: 1,
  fillOpacity: .9,
  fillColor: fillColor,
};

const styleFunction = computed(() => {
  return () => {
    return defaultStyle;
  };
});

// Define a reactive constant to store the clicked department's ID
const selectedDepartmentIds = ref<string[]>([]);
// Function to bind to each feature on geojson map
const onEachFeatureFunction = computed(() => {
  return (feature:any, layer:L.Layer) => {
	if (!feature.properties) return;
	// Tooltip
    layer.bindTooltip(
      `<div>code:${feature.properties.code}</div><div>nom: ${feature.properties.nom}</div>`,
      { permanent: false, sticky: true }
    );
	// Popup
	layer.bindPopup(feature.properties.nom);
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

		console.log(`Department clicked: ${feature.properties.nom} | ${e} `);
      },
    });
  }
});

// Cluster and marker styles
function clusterIcon(cluster:any) {
      return L.divIcon({
        html: `<div style="background-color: #f28f43; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white;">
                  ${cluster.getChildCount()}
               </div>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(40, 40, true),
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

function markerIcon() {
return L.icon({
	iconUrl: 'path/to/your/icon.png',
	iconSize: [38, 95], // Size of the icon
	iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
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
	  if( map.value !== null ) map.value.invalidateSize();
    } else {
      console.error('Failed to load the GeoJSON data.');
    }
  } catch (error) {
    console.error('Error fetching the GeoJSON data:', error);
  }
});

// Function to adjust the map view once the GeoJSON layer is ready
const onGeoJsonReady = (event: { map: L.Map; target: L.GeoJSON }) => {
  const map = event.map;
  map.fitBounds(event.target.getBounds());
};

// On mount zoom to fit markers
onMounted(() => {
	// Center on map
	if (map.value) {
    const bounds = markers.value.reduce((bounds, marker) => {
      return bounds.extend(marker.latLng);
    }, L.latLngBounds(markers.value[0].latLng, markers.value[0].latLng));

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

<style scoped>
/**
Map
 */

 .leaflet-container {
	background-color: var(--color-layout-hex, transparent) !important;
 }


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
