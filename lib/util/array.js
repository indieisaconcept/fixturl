/*
 * fixturl
 * http://github.com/indieisaconcept/fixturl
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

'use strict';

// based on http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/

require('es6-shim');

/* istanbul ignore next */
var Proxy = function() {},
    array = Proxy.prototype = [];

/**
 * @function first
 * Pluck the first item from an array
 */

array.first = function() {
    return this[0];
};

/**
 * @function last
 * Pluck the last item from an array
 */

array.last = function() {
    return this[this.length - 1];
};

/**
 * @function random
 * Pluck a random item from an array
 */

array.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

module.exports = function() {
    var arr = [];
    arr.push.apply(arr, arguments);
    Object.setPrototypeOf(arr, Proxy.prototype);
    return arr;
};
