var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	rimraf = require('gulp-rimraf');

gulp.task('clean', function(){
	return gulp.src('dist', { read: false })
		.pipe(rimraf());
});

gulp.task('default', ['clean'], function(){
	return browserify('./index.js').bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
});