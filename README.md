# ember-cli-file-creator [![Build Status][travis-badge]][travis-badge-url]  [![Build status][appveyor-badge]][appveyor-badge-url]

Add a file into the ember app tree.

This is useful for transforming arbitrary data into a consumable format.


## Usage
    npm install --save-dev ember-cli-file-creator

```
var package = require('package');

EmberApp.init({
	fileCreator: [
		{
			filename: '/service/build-details.js',
			content: 'export default {' + package.version + '}',
		}
	]
});
```
will result in
```
export default { 
	BUILD_VERSION: '1.2.3'
};
```


## Available file options
| Option     | Type                                     | Default value | Use                                   |
|:-----------|:-----------------------------------------|:--------------|:--------------------------------------|
| `filename` | String                                   | (required)    | Where to put the file within the tree |
| `content`  | String or function that returns a string | (required)    | Content of the file                   |
| `tree`     | String                                   | `"app"`       | Name of the tree to put the file into |


## Available trees
* `app`
* `styles`
* `templates`
* `vendor`
* `test-support`
* `public`

See [Ember CLI API docs](https://ember-cli.com/api/classes/Addon.html#method_treeFor) for details.


## Passing a function as content
You can specify a function that must return the content as a string.

```
EmberApp.init({
	fileCreator: [{
        filename: '/data/functional.js',
        content: function() {
            var testData = [1, 2, 3];
            return 'export default ' + JSON.stringify(testData) + ';';
        }
    }
```
will result in

```
export default [1, 2, 3];
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Contributing
- jshint must pass
- npm test must pass

## Building

* `ember build`

## TODOs and next steps

- add support for styles, templates  & other

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[travis-badge]: https://travis-ci.org/jschilli/ember-cli-file-creator.svg?branch=master
[travis-badge-url]: https://travis-ci.org/jschilli/ember-cli-file-creator
[appveyor-badge]: https://ci.appveyor.com/api/projects/status/c20rom3am78b232e/branch/master?svg=true
[appveyor-badge-url]: https://ci.appveyor.com/project/jschilli/ember-cli-file-creator/branch/master
