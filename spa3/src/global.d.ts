// wpData.d.ts
declare global {
	interface Window {
		wpData: {
			app_path: string;
			rest_url: string;
			nonce: string;
			template_directory_uri: string;
			post_categories: string[];
			geography: string[];
			production: string[];
			thematic: string[];
			label: string[];
			// Add other properties of wpData as needed
		};
	}
}

// If using in a module where there are no other imports/exports, you may need to add:
export {};
