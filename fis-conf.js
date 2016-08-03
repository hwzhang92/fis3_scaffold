// handlebars模板预编译
fis.match('**.handlebars', {
    rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
    parser: fis.plugin('handlebars-3.x', {
        //fis-parser-handlebars-3.x option
    }),
    release: false // handlebars 源文件不需要编译
});

// 采用 commonjs 模块化方案
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
});

// 设置成是模块化 js
fis.match('/{node_modules,modules}/**.js', {
  isMod: true,
  useSameNameRequire: true //自动引入同名css文件
});

// 添加css和image加载支持
fis.match('*.{js,jsx,ts,tsx,es}', {
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
      })
    ]
});

// 设置非模块化代码
fis.match('/{static,mock,app}/**.js', {
  parser: null,
  isMod: false
});

// 用 loader 来自动引入资源
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

// 改用 npm 方案，而不是用 fis-components
fis.unhook('components')
fis.hook('node_modules',{
  // 加shimProcess和shimBuffer为false后，lodash才可以用
  shimProcess:false,
  shimBuffer:false,
  shimGlobal:false
});

// less 编译成 css
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
});

// sass/less 编译成css
fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    // options...
  })
});

// 自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器
fis.match('*.{css,less,scss}', {
  preprocessor: fis.plugin('cssprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
});

// 发布用的配置
fis.media('prod')
.match('/mock/**',{ // mock文件夹不发布
  release:false
})
.match('*.{js,css,less}', { // 所有js, css 加 hash
  useHash: true
})
.match('image', { // 所有图片加 hash
  useHash: true
})
.match('*.js',{ // js压缩
  optimizer: fis.plugin('uglify-js')
})
.match('::package', { // css 雪碧图
  spriter: fis.plugin('csssprites')
})
.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
})
.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
})
.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
})
.match('*.js', {
  // 去掉debug注释的代码
  parser: fis.plugin('jdists', {
    remove: "debug"
  })
})
.match('*.html', {
  optimizer: fis.plugin('html-minifier') // 压缩html:压缩内部的css和js
})
.match('::package', {
  postpackager: fis.plugin('loader',{
    allInOne: true
  })
});