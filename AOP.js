/**
 * 面向切面编程
 * 通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术——OOP的延续
 * 主要功能
 * 日志记录，性能统计，安全控制，事务处理，异常处理等等
 * 通过对这些行为的分离，希望可以将他们独立到非指导业务逻辑的方法中，
 * 进而改变这些行为的时候不影响业务逻辑的代码
 */

 /**
  * 前置通知
  * 在目标函数的前面 执行一些前置操作
  */
Function.prototype._before = function(fn){
    var _self = this;   // 保存原函数的引用

    // 返回包含了原函数和新函数的 ‘代理函数’
    return function(){
        fn.apply(this, arguments);
        // 执行新函数，且保证this不被劫持，新函数接受的参数
        // 也会被原封不动的传入原函数，新函数在原函数之前执行
        return _self.apply(this, arguments);
        // 执行原函数并返回原函数的执行结果
        // 并且保证this不被劫持
    }
}

/**
 * 后置通知
 * 在执行方法后 执行一些操作
 */
Function.prototype._after = function(fn){
    var _self = this;
    return function(){
        var ret = _self.apply(this, arguments);
        fn.apply(this, arguments);
        return ret;
    }
}


// Function.prototype.before = function(fn){
//     const self = this;
//     return function(...args){
//         let result = fn.apply(null, args);
//         return self.call(null, result)
//     }
// }

// Function.prototype.after = function(fn) {
//     const self = this;
//     return function(...args) {
//         let result = self.apply(null, args);
//         return fn.call(null, result)
//     }
// }

function a(param){
    console.log(`I 'm a.argument = ${JSON.stringify(param)}`);
}

a = a._before(function(param){
    param.b = 'b';
    console.log(`before a`);
})

a = a._after(function(){
    console.log(`after a`);
})

a({a: 'a'});

