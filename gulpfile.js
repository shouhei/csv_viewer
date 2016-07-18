var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

gulp.task('browserify:renderer', function() {
    browserify('./src/js/renderer/app.jsx', { debug: true })
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('browserify:main', function() {
    var option = {
        debug: true,
        detectGlobals: false,
        ignoreMissing: true,
        builtins: []
    };
    browserify('./src/js/main/main.js',
               option
              )
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('main.js'))
        .pipe(gulp.dest('./'));
});

//gulp.task('browserify:common', function(){
//    var option = {};
//    browserify('./src/js/common/**/*.js',option)
//        .transform(babelify,{presets: ["es2015"]})
//        .bundle()
//        .on('error', function(err) { console.log("Error : " + err.message); })
//        .pipe(gulp.dest('dist/js/common'));
//});


gulp.task('sass', function(){
    gulp.src('./src/css/photon/dist/fonts/*.*')
        .pipe(gulp.dest('./static/fonts'));
    gulp.src('./src/css/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/js/renderer/**/*.jsx', ['browserify:renderer']);
    gulp.watch('./src/js/main/**/*.js', ['browserify:main']);
//    gulp.watch('./src/js/common/**/*.js', ['browserify:common']);
    gulp.watch('./src/css/**/*.scss', ['sass']);
});


gulp.task('default',
          [
              'watch',
              'browserify:renderer',
              'browserify:main',
//              'browserify:common',
              'sass'
          ]
         );
