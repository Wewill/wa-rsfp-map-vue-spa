<?php
/**
 * Functions to enqueue styles and scripts.
 *
 * @package WordPress
 */

/**
 * Load parent theme styles.
 */
function wa_mapvuespa_enqueue_styles() {

	// add Bootstrap to the child theme.
	// wp_register_style( // Bootstrap styles.
	// 	'vue_bootstrap_styles',
	// 	plugin_dir_url( __DIR__ )  . '/assets/css/bootstrap.min.css',
	// 	array(),
	// 	false,
	// 	'all'
	// );

	// wp_register_script(  // Bootstrap scripts.
	// 	'vue_bootstrap_script',
	// 	plugin_dir_url( __DIR__ )  . '/assets/js/bootstrap.min.js',
	// 	array( 'jquery' ),
	// 	false,
	// 	true
	// );

	// enqueue the Bootstrap script and styles.
	wp_enqueue_style( 'vue_bootstrap_styles' );
	wp_enqueue_style( 'vue_bootstrap_script' );

}

/**
 * Function to conditionally enqueue the Vue Single Page App based on the WordPress Custom Page Template.
 *
 * This is done by enqueueing the Vue build script generated by Webpack.
 */
function wa_mapvuespa_enqueue_spa_scripts() {
	global $post;

	// if ( is_page_template( 'templates/vue-search-app-template.php' ) ) { // CHild template way
	// Return default template if we don't have a custom one defined
	if ( '../templates/vue-search-app-template.php' == get_post_meta(  $post->ID, '_wp_page_template', true ) ) { // Plugin way

		// register the Vue build script.
		wp_register_script( // the app build script generated by Webpack.
			'vue_search_app',
			//'http://localhost:5173/dist/build.js', // for development: 'http://localhost:5173/dist/build.js'.
			//plugin_dir_url( __DIR__ )  . '/spa/dist/build.js', // for development: 'http://localhost:8080/dist/build.js'.
			plugin_dir_url( __DIR__ )  . '/spa3/dist/build.js', // for development: 'http://localhost:8080/dist/build.js'.
			array(),
			false,
			true
		);

		// make custom data available to the Vue app with wp_localize_script.
		global $post;
		wp_localize_script(
			'vue_search_app', // vue script handle.
			'wpData', // javascript object.
			array( // WordPress data to be made available to the Vue app.
				'template_directory_uri' => plugin_dir_url( __DIR__ ) ,
				'rest_url' => untrailingslashit( esc_url_raw( rest_url() ) ), // URL to the REST endpoint.
				'app_path' => $post->post_name, // page where the custom page template is loaded.
				// Default
				'post_categories' => get_terms( array( // default post categories.
					'taxonomy' => array('category', 'geography'),
					'hide_empty' => true,
					'fields' => 'names',
				) ),
				// Directory
				'geography' => get_terms( array(
					'taxonomy' => array('geography'),
					'hide_empty' => true,
					'fields' => 'names',
				) ),
				'production' => get_terms( array(
					'taxonomy' => array('production'),
					'hide_empty' => true,
					'fields' => 'names',
				) ),
				'thematic' => get_terms( array(
					'taxonomy' => array('thematic'),
					'hide_empty' => true,
					'fields' => 'names',
				) ),
				)
		);

		// enqueue the Vue app script with localized data.
		wp_enqueue_script( 'vue_search_app' );
	}
}
