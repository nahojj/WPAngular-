<?php

load_theme_textdomain( 'wpangular', get_template_directory() . '/languages' );

// Add default posts and comments RSS feed links to head.
add_theme_support( 'automatic-feed-links' );

/*
 * Let WordPress manage the document title.
 * By adding theme support, we declare that this theme does not use a
 * hard-coded <title> tag in the document head, and expect WordPress to
 * provide it for us.
 */
add_theme_support( 'title-tag' );

/*
 * Enable support for Post Thumbnails on posts and pages.
 *
 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
 */
//add_theme_support( 'post-thumbnails' );

// This theme uses wp_nav_menu() in one location.
register_nav_menus( array(
  'primary' => __( 'Primary Menu', 'wpangular' ),
) );

/*
 * Switch default core markup for search form, comment form, and comments
 * to output valid HTML5.
 */
add_theme_support( 'html5', array(
  'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
) );

/*
 * Enable support for Post Formats.
 * See http://codex.wordpress.org/Post_Formats
 */
add_theme_support( 'post-formats', array(
  'aside', 'image', 'video', 'quote', 'link',
) );

// Set up the WordPress core custom background feature.
add_theme_support( 'custom-background', apply_filters( 'wpangular_custom_background_args', array(
  'default-color' => 'ffffff',
  'default-image' => '',
) ) );

// Support Menu
add_theme_support( 'menus' );

// Support Thumbnails
add_theme_support( 'post-thumbnails' );

// Remove <p> from content-ediotrn
remove_filter('the_content', 'wpautop');
remove_filter('the_excerpt', 'wpautop');

// Remove "[...] - [hellip] for the_excerpt"
function carawebs_remove_hellip($more) {
  return '';
}

add_filter('excerpt_more', 'carawebs_remove_hellip');

// Remove AdminBar
add_filter('show_admin_bar', '__return_false');

// Adding css
function myCss() {
	// main css
	wp_enqueue_style( 'main-css', get_stylesheet_directory_uri() . '/dist/css/main.min.css');
}

add_action( 'wp_enqueue_scripts', 'myCss' );


// Adding Scripts
function myScripts() {
	// AngularJS
	wp_enqueue_script(
		'angularjs',
		get_stylesheet_directory_uri() . '/bower_components/angular/angular.js'
	);

	// Angular Route
	wp_enqueue_script(
		'angularjs-route',
		get_stylesheet_directory_uri() . '/bower_components/angular-route/angular-route.js'
	);

  // Angular Sanitize
  wp_register_script(
    'angularjs-sanitize',
    get_stylesheet_directory_uri() . '/bower_components/angular-sanitize/angular-sanitize.min.js'
  );

  // Angular Screen Loader
  wp_register_script(
    'angularjs-loading',
    get_stylesheet_directory_uri() . '/bower_components/ng-loading-screen/ng-loading-screen.js'
  );

  // jQuery
  wp_enqueue_script('jQuery', get_stylesheet_directory_uri() . '/bower_components/jquery/dist/jquery.min.js');

	// App Main
	wp_enqueue_script(
		'my-scripts',
		get_stylesheet_directory_uri() . '/assets/scripts/app.js',
		array( 'angularjs', 'angularjs-route' )
	);
	// Controllers
	wp_enqueue_script(
		'main',
		get_stylesheet_directory_uri() . '/assets/scripts/controllers/main.js',
		array( 'angularjs', 'angularjs-route' )
	);

  wp_enqueue_script(
		'about',
    get_stylesheet_directory_uri() . '/assets/scripts/controllers/about.js',
		array( 'angularjs', 'angularjs-route' )
	);

  wp_enqueue_script(
    'post',
    get_stylesheet_directory_uri() . '/assets/scripts/controllers/post.js',
    array( 'angularjs', 'angularjs-route' )
  );

  wp_enqueue_script(
    'api',
    get_stylesheet_directory_uri() . '/assets/scripts/services/api.js',
    array( 'angularjs', 'angularjs-route', 'angularjs-sanitize', 'angularjs-loading' )
  );

  // Directives
  wp_enqueue_script(
    'scroll',
    get_stylesheet_directory_uri() . '/assets/scripts/directives/scroll.js'
  );

  // Bootstrap
  wp_enqueue_script(
		'Bootstrap',
		get_stylesheet_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js'
	);

  // Dist JS
  wp_enqueue_script(
    'dist-script',
    get_stylesheet_directory_uri() . '/dist/js/main.js'
  );

	// Locations path to views
	wp_localize_script(
		'my-scripts',
		'myLocalized',
		array(
			'views'  => trailingslashit( get_template_directory_uri() ) . 'views/',
			)
	);
}

// Hook myScripts
add_action( 'wp_enqueue_scripts', 'myScripts' );

wp_localize_script( 'wp-api', 'WP_API_Settings', array( 'root' => esc_url_raw( get_json_url() ), 'nonce' => wp_create_nonce( 'wp_json' ) ) );
?>
