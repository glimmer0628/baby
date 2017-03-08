var gulp = require('gulp'),
  connect = require('gulp-connect');
  eslint = require('gulp-eslint');
  autoprefixer = require('gulp-autoprefixer');

// 实时热刷新模块
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8888
  });
});

// 编译sass文件
// gulp.task('sass', function () {
//   return gulp.src('./src/page/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ["last 2 version", "> 10%", "> 5% in US", "ie 8", "ie 7"],
//       cascade: false
//     }))
//     .pipe(gulp.dest('./src/page/'));
// });

// ./src/page所有文件夹下，html后缀文件绑定自动刷新功能
gulp.task('html', function () {
  gulp.src('./src/page/**/*.html')
    .pipe(connect.reload());
});

// ./src/page所有文件夹下，js后缀文件绑定自动刷新功能
gulp.task('js', function () {
  gulp.src('./src/page/**/*.js')
    .pipe(eslint({
        rules: {
          // allow paren-less arrow functions
          'arrow-parens': 0,
          // allow debugger during development
          'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
          'semi': ['error', 'always'],
          'space-before-function-paren': ["error", "never"],
          'no-multiple-empty-lines': ["error", { "max": 2 }],
          'no-extra-semi': "error"
        }
    }))
    .pipe(eslint.formatEach('codeframe', process.stderr))
    .pipe(connect.reload());
});

// ./src/page所有文件夹下，css后缀文件绑定自动刷新功能
gulp.task('css', function () {
  gulp.src(['./src/page/**/*.css', '!./src/page/common/*.css'])
//  .pipe(autoprefixer({
//    browsers: ["last 2 version", "> 10%", "> 5% in US", "ie 8", "ie 7"],
//    cascade: false
//  }))
//  .pipe(gulp.dest('./src/page/'))
    .pipe(connect.reload());
});

// 监听HCJ文件，变动则启动刷新浏览器机制 
gulp.task('watch', function () {
  gulp.watch(['./src/page/**/*'], ['html', 'js', 'css']);
});
 
gulp.task('default', ['connect', 'watch']);