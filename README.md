# Ember-cli-file-creator

Add a file into the ember app tree.

This is useful for transforming arbitrary data into a consumable format

## Usage

* `npm install --save-dev ember-cli-file-creator`

```
var package = require('package');

EmberApp.init({
	fileCreator: [
		{
			filename: '/service/build-details.js',
			content: 'export default {' + package.version + '}'
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
### Functions
You can also specify a function that will return the content

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
