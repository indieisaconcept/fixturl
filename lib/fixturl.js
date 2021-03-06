/*
 * fixturl
 * http://github.com/indieisaconcept/fixturl
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

'use strict';

var path2regexp = require('path-to-regexp'),
    URI         = require('URIjs'),
    custArray   = require('./util/array');

module.exports = function (/* String */ path, /* Object */ config) {

    var fixtures = [];

    if (arguments.length === 0) {
        throw new Error('fixturl requires at least 1 argument to generate a fixture');
    }

    if (!config) {
	return fixtures.push(path), custArray.apply(null, fixtures);
    }

    config = Array.isArray(config) ? config : [config];

    config.forEach(function (con) {

        var params = con.param || {},
            query  = con.query || {};

        params = Array.isArray(params) ? params : [params];
        query  = Array.isArray(query)  ? query  : [query];

        params.forEach(function (param) {
            var url = path2regexp.compile(path)(param);
            query.forEach(function (qry) {
                fixtures.push(URI(url).query(qry).toString());
            });
        });

    });

    // ensure there are no duplicates

    fixtures = fixtures.filter(function (value, index, self) {
	return self.indexOf(value) === index;
    });

    return custArray.apply(null, fixtures);

};
