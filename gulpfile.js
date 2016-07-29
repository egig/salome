var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({
      includePaths: __dirname+'/bower_components/bootstrap-sass/assets/stylesheets'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
