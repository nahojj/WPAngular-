// Setup Gulp Plugins
var gulp 					= require('gulp'),
    sass 					= require('gulp-sass'),
    autoprefixer 	= require('gulp-autoprefixer'),
    minifycss 		= require('gulp-minify-css'),
    jshint 				= require('gulp-jshint'),
    uglify 				= require('gulp-uglify'),
		concat 				= require('gulp-concat'),
    rename 				= require('gulp-rename'),
    imagemin 			= require('gulp-imagemin'),
		cache 				= require('gulp-cache'),
    notify 				= require('gulp-notify')
    del 					= require('del');

	// Creating SASS
	gulp.task('styles', function() {
		return gulp.src('assets/sass/main.scss') // Source
	  	.pipe(sass({ style: 'expanded' }))
	  	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	  	.pipe(gulp.dest('dist/css'))
	  	.pipe(rename({suffix: '.min'}))
	  	.pipe(minifycss())
	  	.pipe(gulp.dest('dist/css'))
	  	.pipe(notify({ message: 'Styles task complete' }));
	});

	// Creating JS & Get Bower components
	gulp.task('scripts', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/jquery.scrollTo/jquery.scrollTo.js',
    'assets/scripts/**/*.js'
    ])
    .pipe(jshint()) // Validering JS
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
	});

  // Compress Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))) // Only new or changed images will be compressed
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

  // Views task
  gulp.task('views', function() {
    // Any other view files from app/views
    gulp.src('views/**/*')
    // Will be put in the dist/views folder
    .pipe(gulp.dest('dist/views/'));
  });

  // Fonts
  gulp.task('fonts', function() {
    return gulp.src('bower_components/fontawesome/fonts/**/*')
      .pipe(gulp.dest('dist/fonts/'));
  });

	// Clean out destionation folders
	gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/images', 'dist/views', 'dist/fonts'], cb)
	});

	// Run all three tasks
	gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'views', 'fonts');
	});

	// Watch our's tasks
	gulp.task('watch', function() {
  	// Watch .scss files
  	gulp.watch('assets/sass/**/*.scss', ['styles']);
  	// Watch .js files
  	gulp.watch('assets/scripts/**/*.js', ['scripts']);
    // Watch images
    gulp.watch('assets/images/**/*', ['images']);
    // Watch views
    gulp.watch('views/**/*', ['views']);
	});
