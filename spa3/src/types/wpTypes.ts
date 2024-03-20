// Declare wordpress Types

// wpPost.ts
export interface WpPost {
	id: number;
	date: string; // You might want to convert this into a Date object in your application
	slug: string;
	title: { rendered: string };
	content: { rendered: string; protected: boolean };
	excerpt: { rendered: string; protected: boolean };
	author: number; // This is the author's ID. You might want a separate type for author details
	//
	vue_meta: {
		custom_excerpt: string,
		taxonomies: [string],
		post_terms: [number],
		post_type: string,
		post_object: object,
		terms_data: [
			{
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
				link: string
			},
		],
		terms:[string],
		term_links:[string],
		featuredmedia_url:string,
		thumbnailmedia_url:string,
		featuredmedia_alt:string
	};
	link: string;
	// Add any custom fields or other fields you use here
}

export type WpPosts = WpPost[];

// WpUser.ts
export interface WpUser {
	// Fields...
}


