const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const imgMin = require('gulp-imagemin');

function compileJS() {
  return src('public/src/js/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public/dist/js'));
}

function compileCSS() {
  return src('public/src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('main.css'))
    .pipe(dest('public/dist/css'))
}

function minifyImg() {
  return src('public/src/img/*')
    .pipe(imgMin())
    .pipe(dest('public/dist/img/'))
}

exports.default = parallel(compileCSS, compileJS, minifyImg);
