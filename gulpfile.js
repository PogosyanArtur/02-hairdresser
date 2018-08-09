'use strict'

const gulp = require('gulp'),
    // common
    browserSync = require('browser-sync').create(),
    rigger = require('gulp-rigger'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    // css
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    //js
    pump = require('pump'),
    babel = require("gulp-babel"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // img
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgSprites = require("gulp-svg-sprites"),
    //html
    htmlmin = require('gulp-htmlmin'),
    pug = require('gulp-pug');


////////////////////////
// PATH
///////////////////////

const path = {

    // src
    src: {
        styl: './src/Styles/*.styl',
        pug: ['./src/Pages/*.pug'],
        js: './src/**/*.js',
        lib: {
            js: "./lib/lib.js",
            css: "./lib/lib.css",
        },
        svg: "./src/**/svg/*.svg",
        video: './src/**/*.{mp4}',
        img: './src/img/*.{jpg,png}',
    },

    //bundle
    bundle: {
        css: './bundle/css/',
        html: './bundle/',
        js: './bundle/js/',
        svg: './bundle/img/',
        img: './bundle/img/',
    },
    // watch
    watch: {
        styl: "./src/**/*.styl",
        pug: './src/**/*.pug',
        js: './src/**/*.js',
        svg: './src/**/svg/*.svg',
        lib: "./src/Bundle/lib.*"
    },
    // serever
    server: "./bundle",
}

////////////////////////
// HTML
///////////////////////

// bundle html / pug
gulp.task('bundle:pug', function () {
    gulp.src(path.src.pug)
        .pipe(plumber({
            errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(path.bundle.html))
        .pipe(browserSync.stream())
});

////////////////////////
// CSS
///////////////////////

// bundle libcss
gulp.task('bundle:libcss', function () {
    return gulp.src(path.src.lib.css)
        .pipe(plumber())
        .pipe(rigger()).on('error', console.log)
        .pipe(gulp.dest(path.bundle.css))
        .pipe(csso())
        .pipe(browserSync.stream())
});
// bundle css
gulp.task('bundle:css', function () {
    return gulp.src(path.src.styl)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest(path.bundle.css))
        .pipe(browserSync.stream())
});

////////////////////////
// JACASCRIPT
///////////////////////

// bundle library js
gulp.task('bundle:libjs', function () {
    gulp.src(path.src.lib.js)
        .pipe(plumber())
        .pipe(rigger()).on('error', console.log)
        .pipe(gulp.dest(path.bundle.js))
        .pipe(uglify())
        .pipe(browserSync.stream())
});


// bundle babel js
gulp.task('bundle:js', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.bundle.js))
        .pipe(browserSync.stream())
});


////////////////////////
// MEDIA
///////////////////////

// Make a sprite file for svg images

gulp.task('svg', function () {
    return gulp.src(path.src.svg)
        .pipe(svgmin())
        .pipe(svgSprites({
            mode: "symbols",
            svg: {
                symbols: "sprite.svg"
            },
            preview: {
                symbols: "sprite.html"
            },
        }))
        .pipe(gulp.dest(path.bundle.svg));
});

// image
gulp.task('img', function () {
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.bundle.img))
});

////////////////////////
// GENERAL TASKS
///////////////////////

gulp.task('lib', ['bundle:libjs', 'bundle:libcss']);

// watch
gulp.task('default', ['bundle:pug', 'bundle:css', 'bundle:js'], function () {
    browserSync.init({
        server: path.server
    });
    watch([path.watch.pug], function (event, cb) {
        gulp.start('bundle:pug').on('change', browserSync.reload);
    });
    watch([path.watch.styl], function (event, cb) {
        gulp.start('bundle:css').on('change', browserSync.reload);
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('bundle:js').on('change', browserSync.reload);
    });
    watch([path.watch.svg], function (event, cb) {
        gulp.start('svg').on('change', browserSync.reload);
    });
    watch([path.watch.lib], function (event, cb) {
        gulp.start('lib').on('change', browserSync.reload);
    });
});
