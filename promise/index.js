/*
* 手写 Promise 待完善
*/
var PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected';
function Promise(executor){
    if(executor && typeof executor != 'function'){
        throw new Error('Promise is not a function');
    }
    
    var promise = this;
    promise._resolvedCallbacks = [];
    promise._rejectedCallBacks = [];
    promise._status = PENDING;
    promise._reason = null;
    promise._value = null;

    function resolve(value){
        if(promise._status === PENDING){
            setTimeout(function(){
                promise._status = RESOLVED;
                promise._value = value;
                promise._resolvedCallbacks.forEach(function(callback){
                    callback(value);
                })
            }, 0)
        }
    }

    function reject(value){
        if(promise._status === PENDING){
            setTimeout(function(){
                promise._status = REJECTED;
                promise._reason = value;
                promise._rejectedCallBacks.forEach(function(callback){
                    callback(value);
                })
            }, 0)
        }
    }

    try{
        executor(resolve, reject);      
    }catch(e){ // 如果捕获发生异常，直接调失败，并把参数穿进去
        reject(e);
    }
}

Promise.prototype.then = function(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) {return value};
    onRejected = typeof onRejected === 'function' ? onRejected : function(err) {throw err};
　　 //这里正好解释了在正式的Promise函数中，我们为什么可以不写onRejected函数，
　　 //因为then方法内部会帮我们封装好一个onRejected函数，用来抛出上一次then或Promise执行出错的信息，这也是为什么可以在最后执行catch方法的原因

    let _this = this;//缓存this，保不齐后面会用到，当然如果你不想缓存this，也可以在后面使用箭头函数
    let promise2;
    if (_this._status === RESOLVED) {
        promise2 = new Promise(function(resolve,reject) {
            try {
                //onFulfilled函数的执行情况要考虑多种情况，后面会细说
                let x = onFulfilled(_this.value);//将执行onFulfilled的返回值传给x，这里需要注意的是执行过程中有可能会出错
                resolvePromise(promise2,x,resolve,reject);
            } catch(e) {
                reject(e);
            }
        })
        
    }
    if (_this._status === REJECTED) {
        promise2 = new Promise(function(resolve,reject) {
            try {
                //onFulfilled函数的执行情况要考虑多种情况，后面会细说
                let x = onRejected(_this.reason);//将执行onFulfilled的返回值传给x(即这次then函数执行的返回值)，这里需要注意的是执行过程中有可能会出错
                resolvePromise(promise2,x,resolve,reject);//这个x会被下一次的then函数接收到
            } catch(e) {
                reject(e);
            }
        })
        
    }

    if(_this._status === PENDING){
        promise2 = new Promise(function(resolve,reject) {
        // 每一次then时，如果是等待态，就把回调函数push进数组中，什么时候改变状态什么时候再执行
            _this._resolvedCallbacks.push(function(){ // 这里用一个函数包起来，是为了后面加入新的逻辑进去
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(promise2,x,resolve,reject);
                } catch(e) {
                    reject(e);
                }
            })
            _this._rejectedCallbacks.push(function(){ // 同理
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(promise2,x,resolve,reject);
                } catch(e) {
                    reject(e);
                }
            })
        })
        
    }
    return promise2;
}


function resolvePromise(promise2, x, resolve, reject){
    // 接受四个参数： 新的primise、返回值、成功和失败的回调
    // 有可能这里返回的x是别人的promise
    // 尽可能允许其他乱写
    if(promise2 === x ){
        return reject(new TypeError('循环引用了'));
    }
    // 看x是不是一个promise, promise应该是一个对象
    let called  = false;
    // 下面判断上一次then返回的是普通值还是函数，
    if(x != null && (typeof x === 'object' || typeof x === 'function')){
        // 可能是promise {}, 看这个对象中是否有then方法，如果有then就认为他是promise了。。。 《你不知道的js》中，有提到鸭子方法
        try{
            let then = x.then; // 保存一下 x的then方法

            if(typeof then === 'function'){
                // 成功
                // 用call方法修改指针为x，否则this指向window
                then.call(x, function(y){ // 如果x是一个Promise对象，y参数表示执行后的resolve值
                    if(called) return // 如果调用过，就return掉
                    called = true;
                    // y可能还是一个promise，再去解析知道返回的是一个普通值
                    resolvePromise(promise2, y, resolve, reject);  // 递归调用 解决了问题
                }, function (err){  // 失败时执行的函数
                    if(called) return;
                    called = true;
                    console.log('r');
                    reject(err);
                })
            }else { // 如果x不是一个Promise对象，则直接resolve(x)
                resolve(x);
            }
        }catch(e){
            if(called) return ;
            called = true;
            reject(e);
        }
    }else{ // 说明是一个普通值
        resolve(x); // 表示成功了
    }
    // resolve(x);
}