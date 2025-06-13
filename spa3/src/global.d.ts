declare global {
	interface Window {
		wpData?: {
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

// This is to ensure that the global variable `wpData` is recognized in TypeScript
export {};
