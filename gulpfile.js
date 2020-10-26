const { src, dest, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function defaultTask() {
  return src('public/js/src/*.js')
    .pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
    .pipe(dest('public/js/dist'));
}

exports.default = defaultTask;