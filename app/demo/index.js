var demo = require('demo');
var css = require('demo/demo.css');
var handle = require('handlebars');
//var source = require('demo/demo.handlebars');
var source = __inline('modules/demo/demo.handlebars')
var template = handle.compile(source);
document.getElementById("container").innerHTML = template(demo.version);
