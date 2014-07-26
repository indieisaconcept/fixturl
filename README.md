# fixturl

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

`fixturl` is a small library for generating url test fixtures.

## Install

```bash
$ npm install --save fixturl
```

## Usage

```javascript
var fixturl  = require('fixturl'),

    // fixturl(String, Object or Array);

    fixtures = fixturl('http://www.domain.com/:path', {
        param: {
            path: 'news'
        },
        query: {
            foo: 'bar'
        }
    });
```
> Example invocation

Behind the scenes `fixturl` uses [reverend](reverend-url) to support express like route parameter subsitution.

### Combinations

Should you wish to generation multiple combinations for a url this is possible by specifying an array for either params for query.

```javascript
fixturl('/some/path/:id', {
    param: [
        { id: '12345' },
        { id: '6789'  }
    ],
    query: [
        { foo: 'bar' },
        { foo: 'bar', buzz: 'fizz' }
    ]
});
```
> Example of url combinations

`fixturl` will return an array containing generated fixtures. For convenience the following additional Array methods are made available.

### first

```javascript
fixtures.first(); // Returns the first item in the array.
```
### last

```javascript
fixtures.last(); // Returns the last item in the array.
```

### random

```javascript
fixtures.random(); // Returns a random item in the array.
```

## Release History

- **0.1.3** Keyword updates
- **0.1.2** Documentation fixes
- **0.1.1** Support for combined configs
- **0.1.0** Initial release

## License

Copyright (c) 2014 Jonathan Barnett. Licensed under the MIT license.

[reverend-url]: https://github.com/krakenjs/reverend
[querystring-url]: https://npmjs.org/package/fixturl
[npm-url]: https://npmjs.org/package/fixturl
[npm-image]: https://badge.fury.io/js/fixturl.svg
[travis-url]: https://travis-ci.org/indieisaconcept/fixturl
[travis-image]: https://travis-ci.org/indieisaconcept/fixturl.svg?branch=master
[daviddm-url]: https://david-dm.org/indieisaconcept/fixturl.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/indieisaconcept/fixturl
[coveralls-url]: https://coveralls.io/r/indieisaconcept/fixturl
[coveralls-image]: https://coveralls.io/repos/indieisaconcept/fixturl/badge.png
