<template>
	<div class="spa-nav container-fluid px-0">
		<nav class="navbar text-center navbar-expand-sm pb-2 mb-3 bg-light">
			<div class="mx-auto mb-md-0 mb-2">
				<a
					class="nav-brand h5"
					href="https://vuejs.org"
					target="_blank"
					without
					rel="noopener noreferrer">
					<img :src="vueLogo" width="30" height="30" alt="Vue.js Logo" />
					Search Powered by Vue.js
				</a>
				<!-- .nav-brand -->
			</div>
			<div class="navbar-collapse justify-content-end">
				<div class="nav navbar-nav justify-content-center nav-pills">
					<router-link
						to="/quick"
						class="nav-item nav-link"
						active-class="active"
						role="link"
						>Quick Search
					</router-link>
					<!-- .nav-item -->
					<router-link
						to="/advanced"
						class="nav-item nav-link"
						active-class="active"
						role="link"
						>Custom Search
					</router-link>
					<!-- .nav-item -->
				</div>
				<!-- .nav -->
			</div>
			<!-- .navbar-collapse -->
		</nav>
		<!-- navbar -->
	</div>
	<!-- #spa-nav -->
</template>

<script setup lang="ts">
import { ref } from "vue";

/* global wpData:true */
/* eslint no-undef: "error" */
// Assuming `wpData` is globally available and has been declared to TypeScript
// If not, you might need a global declaration similar to previous examples
const vueLogo = ref(
	`${window.wpData.template_directory_uri}/assets/images/vue-logo.png`,
);
</script>

<style scoped>
.spa-nav .nav-pills .nav-link.active,
.spa-nav .nav-pills .show > .nav-link {
	background-color: #42b883;
	border-radius: 0;
}

.spa-nav a {
	color: #35495e;
}
</style>
