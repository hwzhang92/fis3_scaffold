var $ = require('jquery');
var _ = require('lodash/fp');
exports.version = {
	"jquery": $().jquery,
	"_": _.VERSION
};