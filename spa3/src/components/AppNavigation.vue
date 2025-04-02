<template>
	<div class="container-fluid px-0">
			<div class="navbar-collapse justify-content-end">
				<div class="nav navbar-nav justify-content-center nav-pills">
					<router-link
						to="/map"
						class="nav-item nav-link"
						active-class="active"
						role="link"
						>MAP
					</router-link>
					<!-- .nav-item -->
					<router-link
						to="/list"
						class="nav-item nav-link"
						active-class="active"
						role="link"
						>LINK
					</router-link>
					<!-- .nav-item -->
				</div>
				<!-- .nav -->
			</div>
			<!-- .navbar-collapse -->
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.spa-nav .nav-pills .nav-link.active,
.spa-nav .nav-pills .show > .nav-link {
	background-color: #42b883;
	border-radius: 0;
}
</style>
