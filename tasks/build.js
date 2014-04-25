var gulp = require('gulp');
var all = require('./support').streams;
var paths = require('./support').paths;

// Stylesheets =================================================================

gulp.task('build:stylesheets', function () {
  return all.stylesheets().pipe(gulp.dest(paths.dist + '/public'));
});

// Javascripts =================================================================

gulp.task('build:javascripts', ['build:javascripts:templates'], function () {
  return all.javascripts().pipe(gulp.dest(paths.dist + '/public'));
});

// Templates ===================================================================

gulp.task('build:javascripts:templates', function () {
  return all.templates().pipe(gulp.dest(paths.dist + '/public'));
});

// Index =======================================================================

gulp.task('build:inject:index', function () {
  var inject = require('gulp-inject');
  var merge = require('event-stream').merge;
  var allStreams = merge(
    all.javascripts(),
    all.templates(),
    all.stylesheets()
  );

  return gulp.src(paths.index)
    .pipe(inject(allStreams, {
      ignorePath: [ '/app/modules', 'app/bower_components', '/dist/public' ],
      addPrefix: '/public'}))
    .pipe(gulp.dest(paths.dist));
});

// Statics =====================================================================

gulp.task('build:statics', function () {
  return gulp.src([ paths.statics, '!'+paths.index ])
    .pipe(gulp.dest(paths.dist));
});

// Clean =======================================================================

gulp.task('clean', function () {
  var clean = require('gulp-rimraf');
  return gulp.src(paths.dist, { read: false }).pipe(clean({ force: true }));
});

// Build =======================================================================

gulp.task('build', function (done) {
  return require('run-sequence')(
    'clean',
    'build:statics',
    'build:inject:index',
    'build:javascripts',
    'build:stylesheets',
    done
  );
});

gulp.on('err', function(e) {
  console.log(e.err.stack);
});
