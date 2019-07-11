/**
 * 关于深拷贝 需要注意的知识点
 * object.assign() 对象只有一层深度时才可使用 算是浅拷贝的升级版
 * 转换成json再转回来 的弊端 1.破坏了constructor，生成的只能是object；2.只能用在单纯的只有数据的对象 function引用丢失
 */

function deepClone(data){
    if(!data | !(data instanceof Object) | (typeof data === 'function')){
        return data || undefined;
    }

    var constructor = data.constructor;
    var result = new constructor();

    for(var key in data){
        if(data.hasOwnProperty(key)){
            result[key] = deepClone(data[key]);
        }
    }
}