/*
 * fixturl
 * http://github.com/indieisaconcept/fixturl
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

'use strict';

var reverend  = require('reverend'),
    URI       = require('URIjs'),
    custArray = require('./util/array');

module.exports = function (/* String */ path, /* Object */ config) {

    var fixtures = custArray();

    if (arguments.length === 0) {
        throw new Error('fixturl requires at least 1 argument to generate a fixture');
    }

    if (!config) {
        return fixtures.push(path), fixtures;
    }

    config = Array.isArray(config) ? config : [config];

    config.forEach(function (con) {

        var params = con.param || {},
            query  = con.query || {};

        params = Array.isArray(params) ? params : [params];
        query  = Array.isArray(query)  ? query  : [query];

        params.forEach(function (param) {
            var url = reverend(path, param);
            query.forEach(function (qry) {
                fixtures.push(URI(url).query(qry).toString());
            });
        });

    });

    return fixtures;

};
