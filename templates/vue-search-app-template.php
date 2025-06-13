<?php
/*
 * Template Name: Content with Map VueJS SPA
 * Description: A Page Template with a VueJs APP loader.
 */

 get_header();
?>

<?php
// Start the Loop.
while ( have_posts() ) :
	the_post();

    // Custom page template print SPA
	?>
	<div id="wp-vue-app" class="f-w">
	L'application de cartographie SPA devrait être chargée ici. Assurez-vous d'accepter javascript et de charger la page, elle sera mise en fichier d'attente dans WordPress.	</div><!-- #vue-app -->
	<?php
    // Regular page print
    get_template_part( 'partials/content', 'page' );

	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}

endwhile;

get_footer();
