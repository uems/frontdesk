var gulp = require('gulp');
var merge = require('event-stream').merge;
var plugins = require('gulp-load-plugins')();

var paths = exports.paths = {
  stylesheets   : [ 'app/**/*.scss', '!app/modules/{rl_seeds,rl_seeds/**}' ],
  javascripts   : 'app/**/*.js',
  templates     : 'app/**/*.html',
  index         : 'app/index.html',
  statics       : 'app/*.*',
  dist          : 'dist',
};

exports.streams = {
  stylesheets : streamStylesheets,
  javascripts : streamJavascripts,
  templates   : streamTemplates,
};

function streamStylesheets () {
  var stream = merge(
      gulp.src(paths.stylesheets),
      plugins.bowerFiles().pipe(plugins.ignore.exclude('**/*.js')))
    .pipe(plugins.sass({ errLogToConsole: !plugins.util.env.production, sourceComments: 'map' }));

  if (plugins.util.env.production) stream = stream
    .pipe(plugins.concat('cpi.min.css'))
    .pipe(plugins.minifyCss());

  return stream;
}

function streamJavascripts () {
  var stream = merge(
    plugins.bowerFiles().pipe(plugins.ignore.exclude('**/*.css')),
    gulp.src(paths.javascripts));

  if (plugins.util.env.production) stream = stream
    .pipe(plugins.concat('cpi.min.js', { sourceContent: true }))
    .pipe(plugins.uglify({ mangle: false }));

  return stream;
}

function streamTemplates () {
  return gulp.src(paths.templates)
    .pipe(plugins.angularTemplatecache({ root: 'modules', module: 'templates' }));
}
