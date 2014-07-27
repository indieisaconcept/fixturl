/*
 * fixturl
 * http://github.com/indieisaconcept/fixturl
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

/*jshint -W068, unused: false */

'use strict';

var fixturl = require('../'),
    expect  = require('chai').expect;

describe('fixturl', function() {

    it('is a function', function () {
        expect(fixturl).to.be.a('function');
    });

    it('throws an error if no arguments passed', function () {
        expect(function () {
            fixturl();
        }).to.throw(Error);
    });

    it('throws no error if an argument is passed', function () {
        expect(function () {
            fixturl('/some/path');
        }).to.not.throw(Error);
    });

    it('returns an array', function () {
        expect(fixturl('/some/path')).to.be.an('array');
    });

    it('generates a single url fixture with params', function () {

        var result = fixturl('/some/path/:id', {
            param: {
                id: '12345',
            }
        });

        expect(result.length).to.eql(1);
        expect(result.first()).to.eql('/some/path/12345');

    });

    it('generates a single url fixture with a query', function () {

        var result = fixturl('/some/path', {
	    query: { foo: 'bar' }
        });

        expect(result.length).to.eql(1);
        expect(result[0]).to.eql('/some/path?foo=bar');

    });

    it('generates a single url fixture with both params & query', function () {

        var result = fixturl('/some/path/:id', {
	    param: { id: '12345' },
	    query: { foo: 'bar' }
        });

        expect(result.length).to.eql(1);
        expect(result[0]).to.eql('/some/path/12345?foo=bar');

    });

    it('generates multiple url fixtures', function () {

        var result = fixturl('/some/path/:id', [
                {
		    param: { id: '12345' },
		    query: { foo: 'bar'  }
		}, {
		    param: { id: '6789' },
		    query: { foo: 'bar', buzz: 'fizz' }
		}
	    ]);

	expect(result.length).to.eql(2);
	expect(result[0]).to.eql('/some/path/12345?foo=bar');
	expect(result[1]).to.eql('/some/path/6789?foo=bar&buzz=fizz');

    });

    it('generates multiple unique url fixtures', function () {

	var result = fixturl('/some/path/:id', [
		{
		    param: { id: '12345' },
		    query: { foo: 'bar'  }
		}, {
		    param: { id: '6789' },
		    query: { foo: 'bar', buzz: 'fizz' }
                }, {
		    param: { id: '6789' },
		    query: { foo: 'bar', buzz: 'fizz' }
		}, {
		    param: [ { id: '6789' } ],
		    query: [ { foo: 'bar', buzz: 'fizz' } ]
                }
            ]);

        expect(result.length).to.eql(2);
        expect(result[0]).to.eql('/some/path/12345?foo=bar');
        expect(result[1]).to.eql('/some/path/6789?foo=bar&buzz=fizz');

    });

    it('generates multiple url fixtures from a combined config ( param & query array )', function () {

        var result = fixturl('/some/path/:id', {
                param: [
                    { id: '12345' },
                    { id: '6789'  }
                ],
                query: [
                    { foo: 'bar' },
                    { foo: 'bar', buzz: 'fizz' }
                ]
            });

        expect(result.length).to.eql(4);

        ['/some/path/12345?foo=bar',
         '/some/path/12345?foo=bar&buzz=fizz',
         '/some/path/6789?foo=bar',
         '/some/path/6789?foo=bar&buzz=fizz'].forEach(function (url) {
            return expect(result.indexOf(url) !== -1).to.be.true;
         });

    });

    it('generates multiple url fixtures from a combined config ( single array )', function () {

        var result = fixturl('/some/path/:id', {
		param: [ { id: '12345' }, { id: '6789'  } ],
		query: { foo: 'bar' }
            });

        expect(result.length).to.eql(2);

        ['/some/path/12345?foo=bar',
         '/some/path/6789?foo=bar'].forEach(function (url) {
            return expect(result.indexOf(url) !== -1).to.be.true;
         });

    });

});
