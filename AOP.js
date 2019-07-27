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
    var _self = this;
    return function(){
        fn.apply(_self, arguments);
        return _self.apply(_self, arguments);
    }
}

/**
 * 后置通知
 * 在执行方法后 执行一些操作
 */
Function.prototype._after = function(fn){
    var _self = this;
    return function(){
        var ret = _self.apply(_self, arguments);
        fn.apply(_self, arguments);
        return ret;
    }
}


function a(){
    console.log(`I 'm a`);
}

a = a._before(function(){
    console.log(`before a`);
})

a = a._after(function(){
    console.log(`after a`);
})

a();
