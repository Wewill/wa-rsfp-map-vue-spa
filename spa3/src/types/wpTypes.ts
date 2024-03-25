// Declare wordpress Types

// wpPost.ts
export interface WpPost {
	id: number;
	date: string; // You might want to convert this into a Date object in your application
	slug: string;
	title: { rendered: string };
	content?: { rendered: string; protected: boolean };
	excerpt: { rendered: string; protected: boolean };
	author: number; // This is the author's ID. You might want a separate type for author details
	//
	vue_meta: {
		custom_excerpt: string,
		taxonomies: [string],
		post_terms: [number],
		post_type: string,
		post_object: object,
		terms_data: [WpTerm],
		terms:[string],
		term_links:[string],
		media_alt:string
		media_url:string,
		thumbnail_url:string,
		errors:[string],
		relationships?: relationships,
		geolocation?: geolocation,
	};
	link: string;
	// Add any custom fields or other fields you use here
}

export interface relationships {
	farm: number;
	structure: number;
	operation: number;
}
export interface geolocation {
	code: [string],
	latLng: [number | null, number | null]
}

export type WpPosts = WpPost[];

export interface WpTerm {
	id?: number,
	term_id: number,
	name: string,
	slug: string,
	term_group: number,
	term_taxonomy_id: number,
	taxonomy: string,
	description: string,
	parent: number,
	count: number,
	filter: string,
	link: string,
	vue_meta: {
		content: string,
		media_alt:string
		media_url:string,
		thumbnail_url:string,
		errors:[string]
	};
}

export type WpTerms = WpTerm[];

// WpUser.ts
export interface WpUser {
	// Fields...
}


