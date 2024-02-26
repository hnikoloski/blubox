const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

// Paths
const paths = {
    styles: {
        src: 'src/scss/all.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/all.js',
        dest: 'dist/js/'
    }
};

// Compile SCSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(cleanCSS()) // Minify CSS
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// Minify and concat JS
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Watch files
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

// Define tasks
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

// Default task
exports.default = gulp.parallel(styles, scripts, watch);
