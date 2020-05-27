/**
 * 函数节流的定义 
 * 在一段连续操作中，每段时间只执行一次，频率较高的事件中使用 来提高性能
 */

function throttle(fn, delay = 100) {
    //首先设定一个变量，在没有执行我们的定时器时为null
    let timer = null;
    return function () {
        //当我们发现这个定时器存在时，则表示定时器已经在运行中，需要返回
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

/**
 * 利用 时间戳来实现函数节流
 * +new Date()将会调用Date.prototype上的valueOf方法，
 * 根据 MDN Date.prototype.value方法等同于 Date.prototype.getTime()
 */
function throttle(fn, wait){
    let last = 0;
    return () => {
        const current_time = +new Date();
        if(current_time - last > wait){
            fn.apply(this, arguments);
            last = +new Date()
        }
    }
}

// 需要被节流的 函数
function scrollHandler (arg) {
    console.log(`${arg}--被执行了`);
}
// 节流限制： 每 1000 毫秒执行一次
const throttleFunc = throttle(scrollHandler, 10000);
let i = 0;
// 模拟 页面滚动事件
setInterval(() => {
    console.log(`${i} --- 进来了，但是不知道有没有执行`);
    throttleFunc(i++);
}, 1000);
