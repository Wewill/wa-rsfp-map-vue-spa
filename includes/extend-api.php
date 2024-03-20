<?php
/**
 * Functions to extend the WP Rest API
 *
 * @package WordPress
 */

/**
 * Register custom fields for GET requests.
 *
 * Ref: https://developer.wordpress.org/reference/functions/register_rest_field/
 */
function wa_mapvuespa_extend_api_response() {

	register_rest_field(
		array( 'post', 'directory', 'farm', 'operation', 'structure' ), // post types.
		'vue_meta', // name of the new key.
		array(
			'get_callback' => 'vue_get_post_meta_fields',
			'update_callback' => null,
			'schema' => null,
		)
	);

}

/**
 * GET callback for the "vue_meta" field defined above.
 *
 * @param array $post_object Details of the current post.
 * @param string $field_name Field Name set in register_rest_field().
 * @param WP_REST_Request $request Current request.
 *
 * @return mixed
 */
function vue_get_post_meta_fields( $post_object, $field_name, $request ) {

	// make additional fields available in the response using an associative array.
	$additional_post_data = array();
	$terms_data = array();
	$terms = array();
	// $term_names = array();
	$term_links = array();
	$errors = array();

	$post_id = $post_object['id']; // get the post id.
	$post_type = get_post_type($post_id);
	switch($post_type) {
		case "post":
			$taxonomies = ['category'];
			break;
		case "directory":
			$taxonomies = ['geography', 'production', 'thematic'];
			break;
		case "farm":
			$taxonomies = [];
			break;
		case "operation":
			$taxonomies = ['thematic'];
			break;
		case "structure":
			$taxonomies = ['geography'];
			break;
		default:
			$taxonomies = ['category'];
		break;
	}

	//$post_terms = wp_get_post_terms($post_id, ['category'], array('fields' => 'ids')); // Ici bug
	//$post_terms = wp_get_post_terms($post_id, ['category', 'geography', 'production', 'thematic'], array('fields' => 'ids')); // Ici bug
	$post_terms = wp_get_post_terms($post_id, $taxonomies, array('fields' => 'ids')); // Ici bug

	//foreach ( $post_object['categories'] as $category_id ) {
	foreach ( $taxonomies as $taxonomy ) {
		foreach ( $post_terms as $post_term ) {
			// Get term
			$term_data = get_term( $post_term, $taxonomy);
			// error_log(print_r($term_data, true));

			// Check if there was an error retrieving the term
			if ( is_wp_error( $term_data ) ) {
				// Handle the error. $term_data will contain the WP_Error object.
				array_push( $errors, $taxonomy  . ' : Error retrieving term: ' . $term_data->get_error_message());
			} elseif ( empty( $term_data ) || is_null( $term_data ) ) {
				// The term is empty or doesn't exist
				array_push( $errors, $taxonomy  . 'The term is empty or doesn’t exist.');
			} else {
				// It's ok we have data, then push them
				$term_name = $term_data->name; //category_nicename
				$term_url = get_term_link( $term_data->slug, $term_data->taxonomy );
				$term_link = "<a href=\"$term_url\">$term_name</a>";

				$term_data->link = $term_url; // Add easier kin property with permalink
				array_push( $terms_data, $term_data );
				array_push( $terms, $term_name );
				// array_push( $term_names, $term_name );
				array_push( $term_links, $term_link );
			}
		}
	}

	// add categories, custom excerpt, featured image to the api response.
	// Render
	$additional_post_data = array(
		'custom_excerpt' => wp_trim_words(
			$post_object['excerpt']['rendered'],
			25,
			' &hellip;'
		),
		'taxonomies'=> $taxonomies,
		'post_terms' => $post_terms,
		'post_type' => $post_type,
		'post_object' => $post_object,
		'terms_data' => $terms_data,
		'terms' => $terms,
		'term_links' => $term_links,
		'featuredmedia_alt' => get_post_meta(
			get_post_thumbnail_id( $post_id ),
			'_wp_attachment_image_alt',
			true
		),
		'featuredmedia_url' => get_the_post_thumbnail_url(
			$post_id,
			'full'
		),
		'thumbnailmedia_url' => get_the_post_thumbnail_url(
			$post_id,
			'thumbnail'
		),
		'errors' => $errors,
	);

	// return data to the get_callback.
	// this data will be made available in the key "vue_meta".
	return $additional_post_data;
}
