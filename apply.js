/**
 * 手写 apply 
 * 
 * apply和call的唯一区别就是第二个参数的传递方式不同，apply的第二个参数必须是一个数组(或者类数组)，而call允许传递一个参数列表
 * 
 */

 Function.prototype.apply2 = function(context, arr){
     var context = context || window;
     context.fn = this;

     var result;
     if(!arr){
         result = context.fn();
     }else{
         var args = [];
         for(var i = 0, len = arr.length; i < len; i++){
             args.push(`arr[${i}]`);
         }
         result = eval(`context.fn(${args})`);
     }
     delete context.fn;
     return result;
 }