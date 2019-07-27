/**
 * 深拷贝 
 * 目前待完善的地方是 关于function的
 */
function type(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Regexp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
}

function deepClone(data) {
    var t = type(data), o, i, ni;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
            o.push(deepClone(data[i]))
        }
        return o;
    } else if (t === 'object') {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                o[key] = deepClone(data[key]);
            }
        }
        return o;
    }
}

/**
 * 另一种更容易理解
 * @param {*} data 
 */
function deepClone2(data) {
    if (!data | !(data instanceof Object) | (typeof data == 'function')) {
        return data || undefined;
    }
    var constructor = data.contructor;
    var result = new constructor();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            result[key] = deepClone(data[key]);
        }
    }
    return result;
}