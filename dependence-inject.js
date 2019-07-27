// 依赖注入

Sandbox.modules = {};

Sandbox.modules.dom = function(box){
    box.getElement = function(){}
    box.getStyle = function(){}
    box.foo = 'foo';
}

Sandbox.modules.event = function(box){
    box.attachEvent = function(){}
    box.dettachEvent = function(){}
}

Sandbox.modules.ajax = function(box){
    box.makeRequest = function(){}
    box.getResponse = function(){}
}

Sandbox.prototype = {
    name: 'my Application',
    version: '1.0',
    getName: function(){
        return this.name;
    }
}
function Sandbox() {
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop();
        modules = (args[0] && typeof args[0] === 'string') ? args : args[0];

    if(!(this instanceof Sandbox)){
        return new Sandbox(modules, callback);
    }

    this.a = 'a';
    this.b = 'b';

    if(!modules || modules === '*'){
        modules = [];
        for(let i in Sandbox.modules){  // 这里的sandbox.modules 是模块自带的功能 上文中的属性函数 ajax event等等
            if(Sandbox.modules.hasOwnProperty(i)){
                modules.push(i)
            }
        }
    }

    // key 初始化所有模块
    for(let i = 0; i < modules.length; i++){
        Sandbox.modules[modules[i]](this);
    }

    callback(this);
}

// app.controller(function(){});
Sandbox(function(){
    console.log(this.modules);
})