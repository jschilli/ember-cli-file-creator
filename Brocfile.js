/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon({
    fileCreator: [{
        filename: '/utils/build.js',
        content: 'export default { version: "0.0.0" }'
    }, {
        filename: '/utils/wrapped.js',
        content: '{ version: "0.0.0" }',
        wrap: true
    }, {
        filename: '/styles/_features.scss',
        content: function() {
            return '@if ($name == features-kitchen-sink) { @return true; }';
        }
    }, {
        filename: '/data/functional.js',
        content: function() {
            var testData = [1, 2, 3];
            return 'export default ' + JSON.stringify(testData) + ';';
        },
        wrap: true
    }]
});

module.exports = app.toTree();