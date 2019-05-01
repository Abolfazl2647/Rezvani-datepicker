'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isBoolean = isBoolean;
exports.isRegExp = isRegExp;
exports.isError = isError;
exports.isDate = isDate;
exports.isSymbol = isSymbol;

// Returns if a value is a string
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

// Returns if a value is really a number
function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

// Returns if a value is an array
function isArray(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array;
}

// Returns if a value is a function
function isFunction(value) {
    return typeof value === 'function';
}

// Returns if a value is an object
function isObject(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object;
}

// Returns if a value is null
function isNull(value) {
    return value === null;
}

// Returns if a value is undefined
function isUndefined(value) {
    return typeof value === 'undefined';
}

// Returns if a value is a boolean
function isBoolean(value) {
    return typeof value === 'boolean';
}

// Returns if a value is a regexp
function isRegExp(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === RegExp;
}

// Returns if value is an error object
function isError(value) {
    return value instanceof Error && typeof value.message !== 'undefined';
}

// Returns if value is a date object
function isDate(value) {
    return value instanceof Date;
}

// Returns if a Symbol
function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol';
}

// convert FA numbers into EN Numbers
var convertNumbers2English = exports.convertNumbers2English = function convertNumbers2English(string) {
    return string.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) - 0x06f0;
    });
};
