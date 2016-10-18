/* jshint node: true */
var writeFile = require('broccoli-file-creator');
var mergeTrees = require('broccoli-merge-trees');
var concat = require('broccoli-concat');

var cachedTree;

module.exports = {
    name: 'ember-cli-file-creator',
    init: function() {
        this._super.init && this._super.init.apply(this, arguments);
        cachedTree = null;
    },

    treeForApp: function() {
        if (cachedTree === null) {
            cachedTree = mergeTrees(this.options.map(createFile, this));
        }
        return cachedTree;
    },
    included: function(app) {
        this._super.included(app);
        this.options = app.options.fileCreator || [];
    }
};

function contentFor(content) {
    if (typeof content === 'function') {
        return content();
    }
    return content;
}

function createFile(current) {
    var content = current.content;
    var tree = writeFile('test', contentFor(content));
    var moduleFile = concat(tree, {
        inputFiles: ['test'],
        outputFile: current.filename
    });
    return moduleFile;
}
