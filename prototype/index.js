function Atest(_name) {
    var innerName = 'Atest-inner';	// 私有属性，只有在对象构造函数内使用

    this.name = _name;		// 公有属性， 在对象实例化后调用

    // 公有方法
    this.hello = function () {
        console.log('this.name', this.name);
        console.log('this.msg', this.msg());		// 使用原型方法扩充的 方法 可以在类内部使用
        console.log('this.sex', this.sex);		// 使用原型方法扩充的 属性 可以在类内部使用
        console.log('Atest.age', Atest.age);		// 静态属性调用时 格式为[对象.静态属性]
    }

    function innerFunc(){       // 私有方法

    }
}

// 静态方法 
Atest.Run = function () {
    /**
     * 在静态方法中
     * 私有属性 无法获得
     * 公有静态属性 可以获取 不论是[this.属性] 还是 [对象.属性]
     * 原型对象属性 只有通过 原型对象才可以获得
     */
    console.log(`我是静态方法 Run', Atest.age:${Atest.age}, this.age:${this.age}, Atest.sex:${Atest.sex}, this.sex:${this.sex}, Atest.prototype.sex:${Atest.prototype.sex}`);
}

// 原型对象
Atest.prototype = {
    name: '123',
    msg: function () {
        console.log("我的名字是：" + this.name);		// 如果原型方法当作静态方法直接调用时，this.name 无法被调用
    },
    sex: "男" //当作是类内部的属性使用 【this.原型属性】，也可以当成公有静态属性使用 【对象.prototype.原型属性】
}

// 公有静态属性 在类的外部
Atest.age = 20;					// 公有静态属性不能使用 [this.属性] ， 只能使用 [对象.属性]调用



Atest.Run();					// 类方法也是静态方法，可以直接使用 【对象.静态方法()】
// Atest.hello();                  // ❌ 公有方法直接调用会报错
























// Atest.prototype.msg(); 			// 原型方法当成静态方法使用时 【对象.prototype.方法()】 直接调用是undefined

// console.log('Atest.sex', Atest.sex);		// 原型属性当作静态属性使用时 【对象.prototype.属性】
// console.log('Atest.prototype.sex', Atest.prototype.sex);		// 原型属性当作静态属性使用时 【对象.prototype.属性】

// var a = new Atest("Monkey");	// 对象方法和原型方法 需要实例化对象后才可以使用
// a.hello();						// 对象方法 使用 必须实例化对象
// a.msg();						// 原型方法 使用 必须实例化对象
// console.log('Atest.age', Atest.age);
// console.log('a.age', a.age);    // ❌ 错误 公有静态属性只能使用 【对象.属性】实例对象调用 结果为undefined
// // console.log('a.run', a.run()); // ❌ 错误 公有静态属性只能使用 【对象.属性】调用
//尽量将方法定为原型方法，原型方法避免了每次调用构造函数时对属性或方法的构造，节省空间，创建对象快