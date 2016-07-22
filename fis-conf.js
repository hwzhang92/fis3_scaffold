fis.match('*.js', {
  isMod: true
});

fis.match('/static/sea.js', {
  isMod: false
});

fis.hook('cmd', {
  baseUrl: './components/',

  paths: {
    "jquery": "../component_modules/jquery/1.10.1/jquery.js",
  }
});

fis.match('::packager', {
  postpackager: fis.plugin('loader')
});