<?php
/**
 * @package wpangular
 */
?>
<!DOCTYPE html>
	<html <?php language_attributes(); ?>>
		<head>
			<base href="/">
			<meta charset="<?php bloginfo( 'charset' ); ?>">
			<meta name="viewport" content="width=device-width, initial-scale=1">

			<link rel="profile" href="http://gmpg.org/xfn/11">
			<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
			<link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700' rel='stylesheet' type='text/css'>

			<?php wp_head(); ?>
		</head>

		<body ng-app="wpangularApp" ng-controller="appCtrl">
			<header class="main-header" role="banner" scroll>
				<div class="container">
					<div class="logotype">
						<a ng-href="/">
							<img class="" src="<?php bloginfo('template_directory'); ?>/assets/images/nahoj-white.png" alt="nahoj" />
						</a>
					</div>
					<div class="toggle-button">
						<button class="toggle-menu" ng-click="menuClick()">
							<span class="toggle-pin"></span>
							<span class="toggle-pin"></span>
							<span class="toggle-pin"></span>
						</button>
					</div>

				<nav class="navigation" ng-class="menuOpened">
					<div class="container">
						<ul>
							<li class="logo">
								<img class="" src="<?php bloginfo('template_directory'); ?>/assets/images/nahoj-white.png" alt="nahoj" />
							</li>
							<li ng-repeat="item in menuItems" class="menu-item-{{item.ID}}" ng-class="navClass('{{item.title | lowercase}}')"><a href="{{item.url}}">{{item.title}}</a></li>
						</ul>
					</div>
				</nav>
			</header>

			<loading-screen is-loading="showLoader" src="/wp-content/themes/wpangular/assets/images/hourglass.svg"></loading-screen>
