<script setup lang="ts">
import AppNavigation from "./components/AppNavigation.vue";
import AppMap from "./components/AppMap.vue";
</script>

<template>
	<div id="vue-search-app">
		<app-navigation>
			<!-- Load the App Navigation Component-->
		</app-navigation>
		<keep-alive>
			<router-view>
				<!-- Load the router-view component provided by the vue-router plugin -->
			</router-view>
		</keep-alive>

		<AppMap>
			<!-- Load the App Map Component-->
		</AppMap>
	</div>
	<!-- #vue-search-app -->
</template>

<style scoped></style>
