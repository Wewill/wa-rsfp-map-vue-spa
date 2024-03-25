<?php
/*
Plugin Name: WA RSFP Map VueJS SPA
Plugin URI: http://www.wilhemarnoldy.fr
Description: A plugin to print a great search map with real-time filters using VueJS SPA & REST API
Version: 1.1.0
Author: Wilhem Arnoldy
Author URI: http://www.wilhemarnoldy.fr
Text Domain: wa-rsfp-mapvuespa
Domain Path: /languages
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WA_MAP_VUE_SPA_VERSION', '1.1.0' );

// Init custom template
require plugin_dir_path( __FILE__ ) . '/includes/init-template.php';

// Todo languages
// ...

if ( is_admin() ) {
	/* Admin init */

} else {
	/* Front init */
	// includes for the callbacks.
	require plugin_dir_path( __FILE__ ) . '/includes/enqueue-scripts.php';
	require plugin_dir_path( __FILE__ ) . '/includes/extend-api.php';


	/* hooks and filters */
	// enqueue-scripts.php.
	add_action( 'wp_enqueue_scripts', 'wa_mapvuespa_enqueue_spa_scripts' );

	// extend-api.php.
	add_action( 'rest_api_init', 'wa_mapvuespa_extend_api_response' );
}
