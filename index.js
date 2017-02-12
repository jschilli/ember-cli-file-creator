/* jshint node: true */
var writeFile = require('broccoli-file-creator');
var mergeTrees = require('broccoli-merge-trees');
var concat = require('broccoli-concat');

var cachedTrees;

module.exports = {
    name: 'ember-cli-file-creator',
    init: function() {
        if (this.hasRun) { return; }
        this.hasRun = true;
        this._super.init && this._super.init.apply(this, arguments);
        cachedTrees = {};
    },

    treeFor: function (treeName) {
        if (!cachedTrees[treeName]) {
            const currentTreeOptions = this.options.filter(function (option) {
                return option.tree === treeName || (!option.tree && treeName === 'app');
            });
            cachedTrees[treeName] = mergeTrees(currentTreeOptions.map(createFile, this));
        }
        return cachedTrees[treeName];
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
