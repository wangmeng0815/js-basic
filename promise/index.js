// /**
//  * 手写 Promise 简易版 
//  * node index.js 执行
//  */
// const PENDING = 'pending';
// const FULFILLED = 'fulfilled';
// const REJECTED = 'rejected';

// function Promise(fn) {

//     if (!(this instanceof Promise)) return new Promise(fn);

//     var promise = this;
//     promise._resolves = [];
//     promise._rejects = [];
//     promise._status = PENDING;  // 每个promise必须有且只有一个状态 只能从pending -> fulfilled 或者 pending -> rejected
//     promise._data = null;
//     function resolve(value) {
//         // * 假如传入的是不包含异步操作的函数，resolve就会先于 then 执行，也就是说 promise._resolves 是一个空数组。
//         process.nextTick(function () {
//             promise._status = FULFILLED;
//             promise._data = value;
//             promise._resolves.forEach(function (callback) {
//                 callback(value)
//             })
//         })
//     }

//     function reject(reason) {
//         process.nextTick(function () {
//             promise._status = REJECTED;
//             promise._data = reason;
//             promise._rejects.forEach(function (callback) {
//                 callback(reason);
//             })
//         })
//     }

//     try {
//         fn(resolve, reject);
//     } catch (e) {
//         reject(e);
//     }
// }
// Promise.resolve = (value) => {
//     // 如果参数是MyPromise实例或thenable对象，直接返回value
//     return value instanceof Promise ||
//         (value && isFunction(value.then)) ? value :
//         new Promise(resolve => resolve(value))
// }

// // 重点
// Promise.prototype.then = function (onFulfilled, onRejected) {
//     var promise = this;
//     onFulfilled = typeof onFulfilled === 'function'
//         ? onFulfilled
//         : function (value) { return value };

//     // * 这里注意 必须throw出去 不然下一个then 仍然会接收到 值
//     onRejected = typeof onRejected === 'function'
//         ? onRejected
//         : function (reason) { throw reason };
//     // // * 链式调用 为什么不能返回this 而必须要新建一个promise 因为每个promise的状态是唯一的 一旦变更 不可再修改
//     return new Promise(function (resolve, reject) {
//         function handle(value) {
//             var ret = onFulfilled(value);
//             // * 这里需要注意 为了then里面的函数能够对promise对象进行处理
//             if (ret && typeof ret['then'] == 'function') {
//                 // 如果是promise对象， 则调用then方法 形成一个嵌套，直到不是promise对象为止
//                 ret.then(resolve, reject);
//             } else {
//                 resolve(ret);
//             }
//         }

//         function errback(reason) {
//             var reason = onRejected(reason);
//             if (reason && typeof reason['then'] == 'function') {
//                 // 如果是promise对象， 则调用then方法 形成一个嵌套，直到不是promise对象为止
//                 reason.then(resolve, reject);
//             } else {
//                 resolve(reason);
//             }
//         }
//         // * 需要注意的是 这里的promise 指向的是上一个promise对象 ，而不是刚刚新建的这个promise对象
//         if (promise._status == PENDING) {
//             promise._resolves.push(handle);
//             promise._rejects.push(errback);
//         } else if (promise._status == FULFILLED) {
//             handle(promise._data);
//         } else {
//             errback(promise._data);
//         }
//     })
// }

// // test 
// function fn1(resolve, reject) {
//     console.log('步骤一：执行');
//     resolve('1');
//     console.log('5')
//     setTimeout(function () {
//         console.log('2')
//     }, 0);
// }

// function fn2(resolve, reject) {
//     console.log('步骤二：执行');
//     // resolve('3');
//     reject('3');
//     setTimeout(function () {
//         console.log('4');
//     }, 1000);
// }

// new Promise(fn1).then(function(val) {
//     console.log(val);
//     return new Promise(fn2);
// }).then(function(val) {
//     console.log('then1', val);
//     return 33;
// }, function(err){
//     console.log('这是err', err);
// }).then(function(val) {
//     console.log('then2',val);
// });

// new Promise(resolve => {
//     console.log(1);
//     resolve(3);
    Promise.resolve().then(() => console.log(4)).then(() => console.log(5))
// }).then(num => { console.log(num) }).then(() => { console.log(6) });
// console.log(2)