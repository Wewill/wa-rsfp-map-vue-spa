<template>
  <div>



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
														<input class="form-check-input" id="flexCheckDefault" type="checkbox" value=""> <label class="form-check-label" for="flexCheckDefault">Default checkbox</label>
													</div>
													<div class="form-check mb-1">
														<input class="form-check-input" id="flexCheckDefault" type="checkbox" value=""> <label class="form-check-label" for="flexCheckDefault">Default checkbox</label>
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
								<input type="text" class="form-control --form-control-lg border-action-3 focus-action-3 px-4" id="floatingInput" placeholder="Sujet">
								<label for="floatingInput" class="ms-3 fs-18">Rechercher...</label>
								<div class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-4">
									<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z"></path></svg>
								</div>
							</div>

						</div>
					</div>

					<div class="row f-w px-4">
						<div class="col-9 bg-color-bg rounded-start-4">#MAP</div>
						<div class="col-3 bg-action-3 rounded-end-4 p-4 pb-10">

							<h6 class="fw-bold">Savoir-faire <span class="text-muted">950+</span></h6>

							<div class="h-300-px overflow-y-scroll scrollbar-white me-n3 pe-3">
								<ul class="list-unstyled card-items d-flex flex-column align-items-center mb-2">


									<app-get-posts
										:search-term="searchTerm"
										:app-filters="categoryFilter"
										:route="'directory'"
									/>


									<li><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></li>
								</ul>
							</div>

							<h6 class="fw-bold">Ferme <span class="text-muted">150+</span></h6>

							<ul class="list-unstyled card-items d-flex align-items-center justify-content-between mb-4">
								<li class="list-item me-2 flex-fill">
									<div class="card my-0 border-0 bg-transparent">
										<img src="https://placehold.co/300x300/FFF/AAA" class="img-fluid rounded-4 img-transition-scale">
										<div class="card-body py-2 px-0">
											<p class="card-text fs-xs fw-bold">Ferme BIO du beau cottage</p>
										</div>
									</div>
								</li>
								<li class="list-item me-2 flex-fill">
									<div class="card my-0 border-0 bg-transparent">
										<img src="https://placehold.co/300x300/FFF/AAA" class="img-fluid rounded-4 img-transition-scale">
										<div class="card-body py-2 px-0">
											<p class="card-text fs-xs fw-bold">Ferme BIO du beau cottage</p>
										</div>
									</div>
								</li>
								<li class="list-item me-2 flex-fill">
									<div class="card my-0 border-0 bg-transparent">
										<img src="https://placehold.co/300x300/FFF/AAA" class="img-fluid rounded-4 img-transition-scale">
										<div class="card-body py-2 px-0">
											<p class="card-text fs-xs fw-bold">Ferme BIO du beau cottage</p>
										</div>
									</div>
								</li>
								<li><button type="button" class="btn"><i class="bi bi-plus-lg h3 text-light"></i></button></li>
							</ul>

							<h6 class="fw-bold">Thématique <span class="text-muted">8</span></h6>
							<div class="h-200-px overflow-y-scroll scrollbar-white me-n3 pe-3">
								<ul class="list-unstyled card-items">
									<li class="list-item my-2">
										<div class="card card-cover overflow-hidden rounded-4 shadow-sm border-0 text-bg-action-2 ---- bg-cover bg-position-center-center" style="background-image: url('https://placehold.co/600x200/333/999');">
											<div class="d-flex justify-content-between align-items-center text-white text-shadow-1 p-4 z-2">
												<p class="text-white m-0 fw-bold">Lorem ipsum dolor</p>
												<span class="badge text-bg-secondary fw-bold py-2">30</span>
											</div>
											<div class="overlay card-overlay bg-image bg-action-2 op-2 z-0"></div>
										</div>
									</li>
									<li class="list-item my-2">
										<div class="card card-cover overflow-hidden rounded-4 shadow-sm border-0 text-bg-action-2 ---- bg-cover bg-position-center-center" style="background-image: url('https://placehold.co/600x200/333/999');">
											<div class="d-flex justify-content-between align-items-center text-white text-shadow-1 p-4 z-2">
												<p class="text-white m-0 fw-bold">Lorem ipsum dolor</p>
												<span class="badge text-bg-secondary fw-bold py-2">30</span>
											</div>
											<div class="overlay card-overlay bg-image bg-action-2 op-2 z-0"></div>
										</div>
									</li>
									<li class="list-item my-2">
										<div class="card card-cover overflow-hidden rounded-4 shadow-sm border-0 text-bg-action-2 ---- bg-cover bg-position-center-center" style="background-image: url('https://placehold.co/600x200/333/999');">
											<div class="d-flex justify-content-between align-items-center text-white text-shadow-1 p-4 z-2">
												<p class="text-white m-0 fw-bold">Lorem ipsum dolor</p>
												<span class="badge text-bg-secondary fw-bold py-2">30</span>
											</div>
											<div class="overlay card-overlay bg-image bg-action-2 op-2 z-0"></div>
										</div>
									</li>
								</ul>
							</div>

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
