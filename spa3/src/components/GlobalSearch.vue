<template>
	<div class="position-relative">
		selectedSearch:
		{{  selectedSearch }}
		{{  props.modelValue }}
		<!-- Global search  https://github.com/vueform/multiselect?tab=readme-ov-file#single-select -->
		<Multiselect
		class="multiselect-global-search form-control py-2"
		:class="{ 'active': selectedSearch.length > 0 || typedSearch.length > 0 }"
		v-model="selectedSearch"
		:object="true"
		:options="[...searchOptions, ...queriedOptions]"
		:min-chars="2"
		:limit="30"
		mode="tags"
		:searchable="true"
		:loading="isLoading"
		:close-on-select="false"
		:clear-on-select="false"
		:hide-selected="true"
		placeholder=""
		@click.stop.prevent
		@search-change="onSearchQuery"
		>
			<!-- list -->
			<template #option="props">
				<span class="multiselect-tag pe-2" :class="( tagClasses[props.option.term] || (() => ''))() " tabindex="-1">
					<span class="multiselect-tag-wrapper">{{ (tagTerm[props.option.term] || (() => ''))() }}</span>
				</span>
				{{ props.option.label }}
			</template>
			<!-- Tag -->
			<template v-slot:tag="{ option, handleTagRemove, disabled }">
				<span class="multiselect-tag pe-0" :class="( tagClasses[option.term] || (() => ''))() " tabindex="-1">
					<span class="multiselect-tag-wrapper pe-2">{{ (tagTerm[option.term] || (() => ''))() }}</span>
					<small>{{ option.label }}</small>
					<span class="multiselect-tag-remove" v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)">
						<span class="multiselect-tag-remove-icon"></span>
					</span>
				</span>
			</template>

			<template #afterlist>
				<span class="p-2 ps-3 text-muted">...</span>
			</template>
		</Multiselect>
		<!-- Global search -->

		<!-- Floating label -->
		<label
			for="floatingInput"
			class="custom-floating-label ms-3 fs-18"
			:class="{ 'active': selectedSearch.length > 0 || typedSearch.length > 0 }"
			>
			Rechercher dans le contenu...
		</label>

		<!-- Icone de recherche -->
		<div class="input__search-toggle position-absolute top-50 start-0 translate-middle-y ps-4">
			<svg role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path
				d="m18.0553691 9.08577774c0-4.92630404-4.02005-8.94635404-8.94635408-8.94635404-4.92630404 0-8.96959132 4.02005-8.96959132 8.94635404 0 4.92630406 4.02005 8.94635406 8.94635404 8.94635406 2.13783006 0 4.08976186-.7435931 5.64665986-1.9984064l3.8109144 3.8109145 1.3245252-1.3245252-3.8341518-3.7876771c1.2548133-1.5336607 2.0216437-3.5088298 2.0216437-5.64665986zm-8.96959136 7.11060866c-3.90386358 0-7.08737138-3.1835078-7.08737138-7.08737138s3.1835078-7.08737138 7.08737138-7.08737138c3.90386356 0 7.08737136 3.1835078 7.08737136 7.08737138s-3.1602705 7.08737138-7.08737136 7.08737138z"
				></path>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Multiselect from '@vueform/multiselect';
import { getPosts, wpPosts } from '../services/postService';
import { WpPost, option } from '../types/wpTypes'; // WpTerm

// Props for flexibility
const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	modelValue: {
		type: Array,
		default: () => [],
	},
});
const isLoading = ref<boolean>(false);

// Emit event when the value changes
const emit = defineEmits(['update:modelValue', 'search-change']);
//const selectedSearch = ref([...props.modelValue]); // Non reactive issue
const selectedSearch = computed<option[]>(() => props.modelValue as option[]); // Reactive version

const queriedOptions = ref<option[]>([]);
const searchOptions = computed<option[]>(() => props.options as option[]);
const typedSearch = ref<string>('');

// Emit the new value when it changes
watch(selectedSearch, (newVal) => {
	emit('update:modelValue', newVal);
});

// Emit event on search change
async function onSearchQuery(searchTerm: string) {
	console.log('Recherche changée :', searchTerm)
	emit('search-change', searchTerm);
	typedSearch.value = searchTerm;
	// Load
	isLoading.value = true;
    try {
        // Assurez-vous que `getPosts` est bien définie et renvoie une promesse
        await getPosts(undefined, 'wp/v2', searchTerm);

        // Gérer les résultats correctement même si `wpPosts.value` est vide
        queriedOptions.value = (wpPosts.value || []).map((post: WpPost) => {
            return {
                value: post.title?.rendered.toLowerCase(),
                label: post.title?.rendered,
                term: post.vue_meta.post_type
            };
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des posts :', error);
    } finally {
        isLoading.value = false;
    }
}

// Assuming you have some utility functions for tagging
type Action = () => void;
const tagTerm: Record<string, Action> =  {
  'geography': 	() => "Géographie",
  'production': () => "Production",
  'thematic': 	() => "Thématique",
  'label': 		() => "Label",
  'directory': 	() => "Savoir-faire",
  'farm': 		() => "Ferme",
  'operation': 	() => "Opération",
  'structure': 	() => "Structure",
};

const tagClasses: Record<string, Action> =  {
  'geography': 	() => "bg-color-heading-i",
  'production': () => "",
  'thematic': 	() => "bg-color-accent-2-i",
  'label': 		() => "bg-action-1-i",
  'directory': 	() => "bg-color-layout-i text-action-1-i",
  'farm': 		() => "bg-action-3-i",
  'operation': 	() => "bg-color-accent-1-i",
  'structure': 	() => "bg-action-2-i",
};

</script>

<style>
/* Floating label */
.multiselect.multiselect-global-search input.multiselect-tags-search {
	border-radius: none;
	border-radius: 0;
	padding-left: 0 !important;
}

.multiselect.multiselect-global-search,
.multiselect.multiselect-global-search .multiselect-wrapper {
	transition: background-color .1s ease-in-out;
}

.multiselect.multiselect-global-search.is-active,
.multiselect.multiselect-global-search.active,
.multiselect.multiselect-global-search.is-active .multiselect-wrapper,
.multiselect.multiselect-global-search.active .multiselect-wrapper {
	background-color: var(--waff-color-bg);
}

.multiselect.multiselect-global-search .multiselect-wrapper{
	margin-left: 1.8rem;
}

.custom-floating-label {
	transform: translateY(-50%);
	color: var(--bs-body-color-rgb);
	font-weight: 700;
	font-size: 0.8rem;
	position: absolute;
	top: 50%;
	left: 1.5rem;
	z-index: 2;
	height: 100%;
	padding: 1rem .75rem;
	overflow: hidden;
	text-align: start;
	text-overflow: ellipsis;
	white-space: nowrap;
	pointer-events: none;
	border: var(--bs-border-width) solid transparent;
	transform-origin: 0 0;
	transition: opacity .1s ease-in-out,transform .1s ease-in-out, top .1s ease-in-out;
}

.custom-floating-label.active,
.multiselect-global-search:hover .custom-floating-label{
  top: 0;
  font-size: 0.75rem;
  /* color: #495057; */

	color: rgba(var(--bs-body-color-rgb),.65);
	transform: scale(.85) translateY(-1.6rem) translateX(.15rem);

}

.custom-floating-label.active:after,
.multiselect-global-search:hover .custom-floating-label:after{
	position: absolute;
	inset: 1rem 0.375rem;
	z-index: -1;
	height: 1.5em;
	content: "";
	background-color: var(--waff-color-layout);
	border-radius: var(--bs-border-radius);
}

/* Icône de recherche */
.global-search .input__search-toggle svg {
  width: 1rem;
  height: 1rem;
  fill: var(--bs-body-color-rgb);
}
</style>
