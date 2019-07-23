/**
 * 函数节流的定义 
 * 在一段连续操作中，每段时间只执行一次，频率较高的事件中使用 来提高性能
 */

/**
 * 利用settimeout来实现 函数节流
 * @param {*} func 执行的方法
 * @param {*} wait 间隔的时间
 */
function basicThrottle(fn, wait){
    let timer;
    return () => {
        if(timer) return;
        timer = setTimeout( () =>{
            fn();
            timer = null;
        }, wait);
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
