const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gulpsass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('./assets/*', {
            read: false
        })
        .pipe(clean());
}

// JS function 

function js() {
    const source = './src/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./assets/js/'))
        .pipe(browsersync.stream());
}

// CSS function 

function css() {
    const source = './src/scss/**/*.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(gulpsass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./assets/css/'))
        .pipe(browsersync.stream());
}

// CSS function(create a non minify css file of our main.scss in src/css)

function cssToSrc() {
    const source = './src/scss/**/*.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(gulpsass({
            outputStyle: 'expanded'
        }))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(dest('./src/css/'))
}

// HTML function 

function html() {
    const source = './*.html';

    return src(source)
        .pipe(changed(source))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('./assets/img/'));
}

// Copy fonts

function fonts() {
    return src('./src/fonts/**/*')
        .pipe(dest('./assets/fonts/'));
}

// Watch files

function watchFiles() {
    watch('./src/scss/**/*', css);
    watch('./src/scss/**/*', cssToSrc);
    watch('./src/js/*', js);
    watch('./src/img/**/*', img);
    watch('./src/fonts/**/*', fonts);
    watch('./*', html);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, cssToSrc, img, fonts));
exports.clean = clear;  