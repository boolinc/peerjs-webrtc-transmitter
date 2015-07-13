var gulp                = require('gulp')
,   runSequence         = require('run-sequence')
,   browserSync         = require('browser-sync')
,   jshint              = require('gulp-jshint')
,   inject              = require('gulp-inject')
,   wiredep             = require('wiredep').stream
,   templateCache       = require('gulp-angular-templatecache')
,   gulpif              = require('gulp-if')
,   minifyCss           = require('gulp-minify-css')
,   useref              = require('gulp-useref')
,   uglify              = require('gulp-uglify')
,   uncss               = require('gulp-uncss');

gulp.task('webserver', function(){
    browserSync({
      server: {
        baseDir: __dirname + '/app/',
        directory: true
      },
      ghostMode: false,
      notify: false,
      debounce: 200,
      port: 8901,
      startPath: 'index.html'
    });

    gulp.watch([
      __dirname + '/app/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
    ], {
      debounceDelay: 400
    }, function() {
      browserSync.reload();
    });
});

gulp.task('dist-serve', function(){
    browserSync({
      server: {
        baseDir: __dirname + '/dist/',
        directory: true
      },
      ghostMode: false,
      notify: false,
      debounce: 200,
      port: 8902,
      startPath: 'index.html'
    });

    gulp.watch([
      __dirname + '/dist/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
    ], {
      debounceDelay: 400
    }, function() {
      browserSync.reload();
    });
});

gulp.task('copyTemplate', function() {
    return gulp.src('index.html', {
        cwd: './app/views'
    }).pipe(gulp.dest('./app'));
});

gulp.task('inject', function() {
    var sources = gulp.src(['./app/js/**/*.js','./app/styles/**/*.css']);
    return gulp.src('index.html', { cwd: './app' }).pipe(inject(sources, {
        read: false,
        ignorePath: '/app'
    })).pipe(gulp.dest('./app'));
});

gulp.task('wiredep', function () {
    return gulp.src('./app/index.html').pipe(wiredep({
        directory: './app/lib'
    })).pipe(gulp.dest('./app'));
});

gulp.task('reload', function(){
    gulp.src('./app/**/*.{html,js,css}');
});

gulp.task('templates', function(){
    gulp.src('./app/views/**/*.html')
    .pipe(templateCache({
        root: 'views/',
        module: 'webrtc.templates',
        standalone: true
    }))
    .pipe(gulp.dest('./app/js/templates'));
});

gulp.task('compress', function(){
    gulp.src('./app/index.html')
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({mangle: false})))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function(){
    gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
    gulp.src('./app/img/**')
        .pipe(gulp.dest('./dist/img'));
    gulp.src('./app/styles/fonts/**')
        .pipe(gulp.dest('./dist/styles/fonts'));
    gulp.src('./app/fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./app/sounds/**')
        .pipe(gulp.dest('./dist/sounds'));
});

gulp.task('watch', function(){
    gulp.watch(['./app/**/*.{html,js,css}'], ['reload']);
    gulp.watch(['./bower.json'], ['wiredep']);
    gulp.watch(['./app/js/**/*.js'], ['inject']);
    gulp.watch(['./app/views/**/*.html'], ['templates']);
    gulp.watch(['./app/views/index.html'], ['prepare']);
});

gulp.task('prepare', function () {
    return runSequence('templates', 'copyTemplate', 'wiredep', 'inject');
});
gulp.task('build', function () {
    return runSequence('compress', 'copy');
});
gulp.task('default', function () {
    return runSequence('prepare', 'webserver', 'watch');
});
