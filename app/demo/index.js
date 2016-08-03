require('demo/other.css');
var Handlebars = require('handlebars/runtime');
var template = __inline('modules/demo/demo.handlebars');
var $ = require('jquery');
var demo = require('demo');
$("#container").html(template(demo.version));
$("#loading").attr("src",require('demo/loading.gif'));