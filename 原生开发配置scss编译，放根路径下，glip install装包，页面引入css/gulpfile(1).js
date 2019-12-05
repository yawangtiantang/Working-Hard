var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create(); //创建开放调试目录
var less = require('gulp-less');
var sass = require('gulp-sass');

//设置开发使用服务器环境端口  与最近项目导出测试环境端口
var buildPort = 8001; //,binPort=8006;

/*进行build开发测试*/
gulp.task('build', function() {

	//启动browserSync服务
	browserSync.init({
		server: './',
		port: buildPort,
		open: "external"
	});
	//===================我自己公用代码修改进行复制到最上层的公用的库里===============


	//==================根据观察文件变化，进行调用browserSync进行刷新页面=================
	//html改变只刷新html
	watch(['*.html', '**/*.html'], {
		verbose: true
	}, function(event) {
		reload('*.html');
	});
	//更新网站相关逻辑的js需要重新刷新js
	watch(['**/*.js'], {
		verbose: true
	}, function(e) {
		reload();
	});
	watch('css/*.css', {
		verbose: true
	}, function(e) {
		reload('*.css');
	});
	watch(['less/*.less', 'less/**/*.less'], {
		verbose: true
	}, function(e) {
		gulp.src('less/*.less').pipe(less().on('error', function(error) {
			console.log(error.message);
		})).pipe(gulp.dest('./css/'));
	});

	watch(['scss/*.scss'], {
		verbose: true
	}, function(e) {
		gulp.src('scss/*.scss').pipe(sass().on('error', function(error) {
			console.log(error.message);
		})).pipe(gulp.dest('./css/'));
	});
});

var reload = function(value) {
	if (value) {
		browserSync.reload(value);
	} else {
		browserSync.reload();
	}
};
