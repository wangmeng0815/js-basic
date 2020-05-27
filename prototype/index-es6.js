class AtestPrototype{
    constructor(){
        this.name = '123';
        this.sex = '男';
    }
    msg() {
        console.log("我的名字是：" + this.name);		// 如果原型方法当作静态方法直接调用时，this.name 无法被调用
    }
}

class Atest extends AtestPrototype{
    constructor(name){
        super();
        this.name = name;
    }
    static Run(){
        console.log('我是类方法 Run');
    }
    hello(){
        console.log('this.name', this.name);
        console.log('this.msg', this.msg());		// 使用原型方法扩充的 方法 可以在类内部使用
        console.log('this.sex', this.sex);		// 使用原型方法扩充的 属性 可以在类内部使用
        console.log('Atest.age', Atest.age);		// 静态属性调用时 格式为[对象.静态属性]
    }
}
Atest.age = 20;


Atest.Run();					// 类方法也是静态方法，可以直接使用 【对象.静态方法()】
Atest.prototype.msg(); 			// 原型方法当成静态方法使用时 【对象.prototype.方法()】 直接调用是undefined
console.log('Atest.sex', Atest.sex);		// 原型属性当作静态属性使用时 【对象.prototype.属性】

var a = new Atest("Monkey");	// 对象方法和原型方法 需要实例化对象后才可以使用
a.hello();						// 对象方法 使用 必须实例化对象
a.msg();						// 原型方法 使用 必须实例化对象
console.log('Atest.age', Atest.age);
console.log('a.age', a.age);    // ❌ 错误 公有静态属性只能使用 【对象.属性】调用
console.log('a.run', a.Run());