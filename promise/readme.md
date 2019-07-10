# 写promise思路

首先 在构造器中定义 状态 和两个队列 还有一个值属性

其次 定义两个方法 分别异步执行成功和失败（将状态置为成功或者失败 把值付给data属性，且逐个执行回调队列中的回调） 执行Promise的回调函数 参数为定义的两个回调

定义原型方法： 
    1.返回新的Promise 
    2.根据typeof function 对上一个promise的then中回调进行处理，调用当前的promise的resolve方法的。
    3.定义两个新的方法 分别判断onCallBack()是否Promise 如果是则调用ret.then(resovle, reject) 不是则直接resolve。
    4.根据状态 假如pending状态 将回调函数置于两个回调队列中；假如成功或者失败 则分别调用之前定义的方法。