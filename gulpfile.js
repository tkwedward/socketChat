const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const errorify = require('errorify');
const del = require('del');
const tsify = require('tsify');
const gulpTypings = require('gulp-typings');
const source = require('vinyl-source-stream');
const runSequence = require('gulp4-run-sequence')

function createBrowserifier(entry) {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [entry],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .plugin(watchify)
    .plugin(errorify);
}

function bundle(browserifier, bundleName, destination) {
    return browserifier
        .bundle()
        .pipe(source(bundleName))
        .pipe(gulp.dest(destination));
}

gulp.task('clean', async () => {
    // return del('./javascript/**/*')
    console.log("cleaning");
    return
});

gulp.task('installTypings', async () => {
    // return gulp.src('typings.json').pipe(gulpTypings());
    console.log("install Typings");
    return
});

gulp.task('tsc-browserify-src', async () => {
    return bundle(
        createBrowserifier('./talkNotes/ts/typescript_try.js'),
        'bundle.js',
        'javascript');
});



gulp.task('default', (done) => {
    return browserify({
              basedir: ".",
              debug: true,
              entries: ["talkNotes/ts/typescript_try.ts"],
              cache: {},
              packageCache: {},
            })
            .plugin(tsify)
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("talkNotes/ts"));
})
