/**
 * 函数防抖
 * 函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现
 */

 /**
  * @param {*} fn   执行的方法
  * @param {*} delay 延迟时间
  */
function Debouce(fn, delay){
    let timer;

    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}
