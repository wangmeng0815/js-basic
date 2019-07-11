class Foo{
	constructor(who){
		this.me = who;
	}
	identify(){
		return `I am ${this.me}.`;
	}
}

class Bar extends Foo{
	constructor(who){
		super(who);
	}
	speak(){
		alert(`Hello, ${this.identify()}.`);
	}
}

var b1 = new Bar('b1');
var b2 = new Bar('b2');

b1.speak();
b2.speak();