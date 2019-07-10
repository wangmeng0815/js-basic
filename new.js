/*
* 手写new 方法实现
*/
function Animal(name){
    this.name = name;
}

Animal.color = 'black';
Animal.prototype.say = function(){
    console.log(`I 'm ${this.name}`);
}
var cat = new Animal('cat');

// new Animal('cat') = {
//     var obj = {};
//     obj.__proto__ = Animal.prototype;
//     var result = Animal.call(obj, 'cat');
//     return typeof result === 'object' ? result : obj;
// }

// 手写思路：
//     1.创建一个空对象
//     2.把空对象的__proto__指向构造函数的原型对象
//     3.在obj对象的执行环境 调用构造函数并传递参数
//     4.观察上一步的结果，如果无返回或者返回一个非对象值，则将 新建的空对象作为返回值；否则将返回值作为新对象返回。

var new1 = function(func){
    var newObj = Object.create(func.prototype);
    var resultObj = func.call(newObj);
    if(typeof resultObj === 'object'){
        return resultObj;
    }else{
        return newObj;
    }
}
