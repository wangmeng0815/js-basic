/**
 * 函数防抖
 * 函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现
 * 思路：首次运行时把定时器赋值给一个变量，第二次执行时，如果间隔没超过定时器设定的时间则会清除掉定时器，重新设定定时器，依次反复，当我们停止下来时，没有执行清除定时器，超过一定时间后触发回调函数。
 */

/**
 * @param {*} fn   执行的方法
 * @param {*} delay 延迟时间
 */
function debounce(fn, delay = 200) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    }
}
