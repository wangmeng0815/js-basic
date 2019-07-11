function new1(){
    var newObj = Object.create(arguments[0].prototype);
    var resultObj = arguments[0].call(newObj);

    if(resultObj && typeof resultObj === 'object'){
        return resultObj;
    }else{
        return newObj;
    }
}

function Animal(name){
    this.name = name;
    this.value = 1;
}
var cat1 = new1(Animal);
console.log('cat1', cat1.value);

// var cat = new Animal('cat');
// console.log('cat', cat.value);

