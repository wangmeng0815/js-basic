/**
 * 手写 call 实现
 */
var bar = {
    value: 1
}
function foo(){
    console.log(this.value);
}
foo.call(bar);
// >>>
// var foo = {
//     value: 1,
//     bar: function(){
//         console.log(this.value);
//     }
// }

// 手写思路：
//     1.将函数设为对象的属性
//     2.执行该函数
//     3.删除该函数

Function.prototype.call2 = function(context){
    var context = context || window;
    context.fn = this;

    var args = [];
    // 第二个参数开始才是参数， 第一个参数是对象
    for(var i = 1, len = arguments.length; i < len; i++){
        args.push(`arguments[${i}]`);
    }
    var result = eval(`context.fn(${args})`);
    delete context.fn;
    return result;
}


