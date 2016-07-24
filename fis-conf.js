fis.match('*.js', {
  isMod: true
});

fis.match('/static/sea.js', {
  isMod: false
});

fis.match('/mock/*.js',{
	isMod: false
});

fis.hook('cmd', {
  paths: {
    "jquery": "/component_modules/jquery/1.10.1/jquery.js",
  }
});

fis.match('::packager', {
  postpackager: fis.plugin('loader')
});

fis.media('prod')
	.match('/{mock,test}/**',{
		release:false
	})
	.match('*.js',{
		optimizer: fis.plugin('uglify-js')
	})
	.match('*.{js,css,png}', {
	  useHash: true
	})