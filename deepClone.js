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

function deepClone3 (data){
    let result;
    if(typeof data !== 'object'){
        result = data;
    } else {
        if(Array.isArray(data)){
            result = [...data]
        } else if(data === null){
            result = null
        } else if(data.constructor === RegExp) {
            result = data;
        } else {
            result = {};
            for(let key in data){
                if(data.hasOwnProperty(key)){
                    result[key] = deepClone(data[key])
                }
            }
        }
    }

    return result;
}

let obj1 = {
    a: {
        c: /a/,
        d: undefined,
        b: null
    },
    b: function () {
        console.log(this.a)
    },
    c: [
        {
            a: 'c',
            b: /b/,
            c: undefined
        },
        'a',
        3
    ]
}
let obj2 = deepClone(obj1);
    console.log(obj2);