// 采用 commonjs 模块化方案
fis.hook('commonjs', {
  baseUrl: './modules'
});

// 设置成是模块化 js
fis.match('/{node_modules,modules}/**.js', {
  isMod: true,
  useSameNameRequire: true
});

// 添加css和image加载支持
fis.match('*.js', {
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
      })
    ]
})

// 设置非模块化代码
fis.match('/{static,mock,app}/**.js', {
  isMod: false
});

// 用 loader 来自动引入资源
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

// 改用 npm 方案，而不是用 fis-components
fis.unhook('components')
fis.hook('node_modules');

// 发布用的配置
fis.media('prod')
.match('*.js',{
  optimizer: fis.plugin('uglify-js')
})
.match('::package', {
  postpackager: fis.plugin('loader',{
    allInOne: true
  })
});