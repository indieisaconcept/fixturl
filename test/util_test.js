/*
 * fixturl
 * http://github.com/indieisaconcept/fixturl
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

/*jshint -W068, unused: false */

'use strict';

var array  = require('../lib/util/array'),
    expect = require('chai').expect;

describe('util', function() {

    var custArray;

    beforeEach(function () {
        custArray = array(1 , 2, 3);
    });

    describe('array', function () {

        it('is an instance of Array', function () {
            expect(custArray).to.be.a('array');
        });

        it('has a first method', function () {
            expect(custArray.first).to.be.a('function');
            expect(custArray.first()).to.eql(1);
        });

        it('has a last method', function () {
            expect(custArray.last).to.be.a('function');
            expect(custArray.last()).to.eql(3);
        });

        it('has a random method', function () {
            expect(custArray.last).to.be.a('function');
            expect(custArray.random()).to.be.a('number');
        });

    });

});
