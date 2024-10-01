<template>
	<div>
		<!-- Global search -->
		<Multiselect class="multiselect-tag-production form-control py-2" v-model="selectedSearch" :options="[...searchOptions, ...queriedOptions]" mode="tags" :multiple="true" :loading="isLoading"
			:close-on-select="false" :clear-on-select="false" :options-limit="300" :searchable="true" placeholder="" :limit="30" :limit-text="limitText" :show-no-results="true" :hide-selected="true"
			@click.stop.prevent @search-change="onSearchQuery">
			<!-- list -->
			<template #option="props">
				<span class="multiselect-tag pe-2" :class="( tagClasses[props.option.term] || (() => ''))() " tabindex="-1">
					<span class="multiselect-tag-wrapper">{{ (tagTerm[props.option.term] || (() => ''))() }}</span>
				</span>
				{{ props.option.label }}
			</template>
			<!-- Tag -->
			<template v-slot:tag="{ option, handleTagRemove, disabled }">
				<span class="multiselect-tag pe-2" :class="( tagClasses[option.term] || (() => ''))() " tabindex="-1">
					<span class="multiselect-tag-wrapper">{{ (tagTerm[option.term] || (() => ''))() }}</span>
				</span>
				<small>{{ option.label }}</small>
				<span class="multiselect-tag-remove" v-if="!disabled" @click.prevent @mousedown.prevent.stop="handleTagRemove(option, $event)"><span class="multiselect-tag-remove-icon"></span></span>
					<i
							v-if="!disabled"
							@click.prevent
							@mousedown.prevent.stop="handleTagRemove(option, $event)"
					></i>
			</template>
		</Multiselect>
		<!-- Global search -->

		<!-- Floating label -->
		<label
			for="floatingInput"
			class="floating-label ms-3 fs-18"
			:class="{ 'active': selectedSearch.length > 0 || typedSearch.length > 0 }"
			>
			Rechercher dans le contenu...
		</label>

		<!-- Icone de recherche -->
		<div class="input__search-toggle position-absolute top-50 end-0 translate-middle-y pe-4">
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
const isLoading = ref(false)

// Méthode pour limiter le texte
const limitText = (count: number) => {
  return `and ${count} other posts`
}

// Emit event when the value changes
const emit = defineEmits(['update:modelValue', 'search-change']);
const selectedSearch = ref([...props.modelValue]);

const queriedOptions = ref<option[]>([]);
const searchOptions = computed(() => props.options);
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

<style scoped>
/* Floating label */
.floating-label {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  color: #6c757d;
}

.floating-label.active {
  top: -1rem;
  font-size: 0.75rem;
  color: #495057;
}

/* Icône de recherche */
.input__search-toggle svg {
  width: 1rem;
  height: 1rem;
  fill: #6c757d;
}

.input__search-toggle svg:hover {
  fill: #000;
}
</style>
