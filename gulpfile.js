'use strict'

const gulp = require('gulp'),
    // common
    browserSync = require('browser-sync').create(),
    rigger = require('gulp-rigger'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    rename = require("gulp-rename"),
    // css
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    cssnano = require('gulp-cssnano'),
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
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
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
        pug: ['./src/Pages/*.pug','!src/Pages/common.pug'],
        js: './src/**/*.js',
        lib: {
            js: "./lib/lib.js",
            css: "./lib/lib.css",
        },
        svg: "./src/**/svg/*.svg",
        video: './src/**/*.{mp4}',
    },

    //bundle

    bundle: {
        css: './bundle/css/',
        html: './bundle/',
        js: './bundle/js/',
        svg: './bundle/img/',
        video: './bundle/video/*.*',
        img: './bundle/img/*.*',
        fonts: './bundle/fonts/*.*'
    },

    // dist
    dist: {
        from:{
            css: "./bundle/css/*.css",
            js: "./bundle/js/*.js",
            img: "./bundle/img/*.*",
            fonts: "./bundle/fonts/*.*",
            video: "./bundle/video/*.*",
            html: './bundle/*.html',
        },
        to:{
            css: "./dist/css/",
            js: "./dist/js/",
            img: "./dist/img",
            fonts: "./dist/fonts",
            video: "./dist/video",
            html: "./dist/",
        }

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
    server: "./dist",
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
        .pipe(gulp.dest(path.bundle.html))
        .pipe(browserSync.stream())
});

// build html

gulp.task('build:html', function () {
    return gulp.src(path.dist.from.html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(path.dist.to.html));
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
        .pipe(browserSync.stream())
});
// bundle css
gulp.task('bundle:css', function () {
    return gulp.src(path.src.styl)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest(path.bundle.css))
        .pipe(browserSync.stream())
});

// bulid CSS
gulp.task('build:css', function () {
    gulp.src(path.dist.from.css)
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest(path.dist.to.css))
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
        .pipe(gulp.dest(path.bundle.js))
        .pipe(browserSync.stream())
});


// bulid js
gulp.task('build:js', function (cb) {
    pump([
            gulp.src(path.dist.from.js),
            uglify(),
            gulp.dest(path.dist.to.js)
        ],
        cb
    );
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

// build video
gulp.task('build:video', function () {
    gulp.src(path.dist.from.video)
        .pipe(gulp.dest(path.dist.to.video))
});

// build image
gulp.task('build:img', function () {
    gulp.src(path.dist.from.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.to.img))
});

////////////////////////
// FONTS
///////////////////////

// remove fonts
gulp.task('build:fonts', function () {
    gulp.src(path.dist.from.fonts)
        .pipe(gulp.dest(path.dist.to.fonts))
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
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});

// build production
gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:img', 'build:video', 'build:fonts', ]);