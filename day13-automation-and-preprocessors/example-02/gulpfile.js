// load everything
var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

// a task to delete all css files in main folder
gulp.task('cssclean', function(){
	return gulp.src('*.css', { read: false }).pipe(clean());
});

// CSS compilation (also deletes css files first using previously defined task)
gulp.task('csscompile', ['cssclean'], function(){
	return gulp
		.src('index.scss') // this is the source of for compilation
		.pipe(sass().on('error', sass.logError)) // compile sass to css and also tell us about a problem if happens
		.pipe(sourcemaps.init()) // creates a sourcemap
		.pipe(sourcemaps.write('.')) // writes the sourcemap
		.pipe(gulp.dest('./')) // destination of the resulting css
		.pipe(browserSync.stream()); // tell browsersync to reload CSS (injects compiled CSS)
});

gulp.task('develop', ['csscompile'], function(){
	browserSync.init({ // initalize Browsersync
		// set what files be served
		server: {
			baseDir: './' // serve from folder that this file is located
		},
		files: ['*.html'] // watch for changes all files named anything.html in the same folder gulpfile.js is located
	});
	gulp.watch('*.scss', ['csscompile']); // watch for changes in scss
});

gulp.task('default', ['develop']); // set develop as a default task (gulp runs this when you don't specify a task)
