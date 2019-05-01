
// Returns if a value is a string
export function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

// Returns if a value is really a number
export function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
}

// Returns if a value is an array
export function isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

// Returns if a value is a function
export function isFunction (value) {
    return typeof value === 'function';
}

// Returns if a value is an object
export function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

// Returns if a value is null
export function isNull (value) {
    return value === null;
}
    
// Returns if a value is undefined
export function isUndefined (value) {
return typeof value === 'undefined';
}

// Returns if a value is a boolean
export function isBoolean (value) {
    return typeof value === 'boolean';
}

// Returns if a value is a regexp
export function isRegExp (value) {
    return value && typeof value === 'object' && value.constructor === RegExp;
}

// Returns if value is an error object
export function isError (value) {
    return value instanceof Error && typeof value.message !== 'undefined';
}

// Returns if value is a date object
export function isDate (value) {
    return value instanceof Date;
}

// Returns if a Symbol
export function isSymbol (value) {
    return typeof value === 'symbol';
}

// convert FA numbers into EN Numbers
export const convertNumbers2English = function (string) {
    return string.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
       return c.charCodeAt(0) - 0x06f0;
   });
}