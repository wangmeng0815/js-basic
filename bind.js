if(!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if( typeof this != 'function') {
            // closet thing possible to the ECMAScript 5
            // internal isCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function(){}, 
            fBound = function() {
                return fToBind.apply(this instanceof fBound ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        
        // 维护原型关系
        if(this.prototype) {
            // 当执行Function.prototype.bind()时, this为Function.prototype
            // this.prototype(即Function.prototype.prototype)为undefined
            fNOP.prototype = this.prototype;
        }

        // 下行的代码使fBound.prototype是 fNOP的实例, 因此
        // 返回的 fBound若 作为new的构造函数, new生成的新对象作为this传入fBound, 新对象的__proto__就是fNOP的实例
        fBound.prototype = new fNOP();

        return fBound;
    }

}