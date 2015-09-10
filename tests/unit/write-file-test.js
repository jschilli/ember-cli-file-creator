/*jshint expr: true, node:true */
var path = require('path');
var Project = require('ember-cli/lib/models/project');
var Addon = require('ember-cli/lib/models/addon');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var expect = require('chai').expect;
var CreateAddon = require('../../index');
var fs = require('fs');
var Builder = require('broccoli').Builder;



describe('File creator', function() {
    var project, projectPath, emberApp, addon;

    function setupProject(rootPath) {
        var packageContents = require(path.join(rootPath, 'package.json'));

        project = new Project(rootPath, packageContents);
        project.require = function() {
            return function() {};
        };
        project.initializeAddons = function() {
            this.addons = [];
        };

        return project;
    }

    function testWithExpectations(app, expectations) {
        var addonResults = app.addonTreesFor('app');
        var tree = addon.mergeTrees(addonResults);

        var builder = new Builder(tree);
        return builder.build()
            .then(expectations);
    }
    beforeEach(function() {
        var Constructor;
        projectPath = path.resolve(__dirname, '../..');
        project = setupProject(projectPath);

        Constructor = Addon.extend(CreateAddon).extend({root: '../..'});

        addon = new Constructor();

        project.initializeAddons = function() {
            this.addons = [addon];
        };

    });
    it('writes a file', function() {
        emberApp = new EmberApp({
            project: project,
            fileCreator: [{
                filename: '/other/build.js',
                content: 'export default { version: "0.0.0" }'
            }]
        });

        return testWithExpectations(emberApp, function(result) {
            expect(fs.existsSync(path.join(result.directory, 'other', 'build.js'))).to.be.ok;
        });
    });
    it('writes more than one file', function() {
        emberApp = new EmberApp({
            project: project,
            fileCreator: [{
                filename: '/other/build.js',
                content: 'export default { version: "0.0.0" }'
            }, {
                filename: '/other/build2.js',
                content: 'export default { version: "1.2.3" }'
            }]
        });
        return testWithExpectations(emberApp, function(result) {
            expect(fs.existsSync(path.join(result.directory, 'other', 'build.js'))).to.be.ok;
            expect(fs.existsSync(path.join(result.directory, 'other', 'build2.js'))).to.be.ok;
        });
    });
    it('accepts a function as the content', function() {
        var called = false;
        emberApp = new EmberApp({
            project: project,
            fileCreator: [{
                filename: '/other/func.js',
                content: function() {
                    called = true;
                    return 'export default { version: "0.0.0" }';
                }
            }]
        });
        return testWithExpectations(emberApp, function(result) {
            expect(called).to.be.ok;
            expect(fs.existsSync(path.join(result.directory, 'other', 'func.js'))).to.be.ok;
        });
    });
    it('is only called once', function() {
        var calledCount = 0;
        emberApp = new EmberApp({
            project: project,
            fileCreator: [{
                filename: '/other/func.js',
                content: function() {
                    calledCount++;
                    return 'export default { version: "0.0.0" }';
                }
            }]
        });
        var addonResults = emberApp.addonTreesFor('app');
        var tree = addon.mergeTrees(addonResults);

        var builder = new Builder(tree);
        return builder.build()
            .then(function(result) {
                expect(calledCount).to.equal(1);
                expect(fs.existsSync(path.join(result.directory, 'other', 'func.js'))).to.be.ok;
                return builder.build().then(function(result) {
                    expect(calledCount).to.equal(1);
                    expect(fs.existsSync(path.join(result.directory, 'other', 'func.js'))).to.be.ok;
                });
            });
    });
it.skip('can handle style assets');
it.skip('can handle templates');
it.skip('can handle other assets');

});
