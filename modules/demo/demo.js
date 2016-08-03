var $ = require('jquery');
var _ = require('lodash');
exports.version = {
	"jquery": $().jquery,
	"_":_.VERSION
};