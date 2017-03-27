var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rename=require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create();

//清空文件夹，避免资源冗余
gulp.task('clean',function(){
    return gulp.src('dist',{read:false}).pipe(clean());
});

//css依赖合并压缩
gulp.task('depcss',['sass'],function(){
    return gulp.src('lib/css/*.css')
    .pipe(concat("dep.css"))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css/'));
});

//js依赖合并压缩
gulp.task('depjs',function(){
    return gulp.src('lib/js/*.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(concat("dep.js"))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js/'));
});

//css文件压缩
gulp.task('css',['sass'],function(){
    return gulp.src('css/*.css')
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css/'));
});

//js文件压缩
gulp.task('js',function(){
    var appScripts = [
        'js/**/*.modules.js',
        'js/**/*.js'
    ];
    return gulp.src(appScripts)
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(concat("bundle.js"))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', function() {
  gulp.src('sass/bundle.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'));
});

gulp.task('watch',function(){
  gulp.watch('sass/*.scss',function(){
      gulp.run('css');
  });
  gulp.watch('css/*.css',function(){
      gulp.run('css');
  });
  gulp.watch('js/**/*.js',function(){
      gulp.run('js');
  });
});


// Static server
gulp.task('browser-sync', function() {
    var files = [
    '*.html',
    'templates/**/*.html',
    'dist/css/*.css',
    'dist/js/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('build',['js','css','depcss','depjs']);

gulp.task('default',['watch','build'],function(){
  gulp.run('browser-sync');
});
