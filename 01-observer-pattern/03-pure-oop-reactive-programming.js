// watching https://www.youtube.com/watch?v=_bFXuLcXoXg
"use strict";

//base classes

class Observable {
	constructor() {
		this.observers = [];
	}

	subscribe(observer) {
		observer.observable = this;
		this.observers.push(observer);
		return this
	}

	notify(message) {
		if (this.observers.length === 0) return;
		for (const observer of this.observers) {
			observer.update(message)
		}
	}

	complete() {
		throw new Error("method 'Observable.comlete()' is not yet implemented, but it should be")
	}

}

class Observer {
	update() {
		throw new Error("method 'Observer.update()' is not yet implemented, but it should be")
	}
}


// usage

class CharStream extends Observable {
	constructor() {
		super();
		this.timer = setInterval(() => {
			const char = this.randomChar();
			this.notify(char)
		}, 10)
	}

	randomChar() {
		return String.fromCharCode(Math.floor((Math.random() * 25) + 97))
	}

	complete() {
		clearInterval(this.timer)
	}
}

class CharStreamObserver extends Observer{
	constructor(){
		super();
		this.count = 0;
		this.observable = null;
	}

	update(char){
		process.stdout.write(char);
		this.count++;
		if (this.count > 100) {
			this.observable.complete();
			process.stdout.write('\n');
			process.exit(0)

		}
	}
}

const observer = new CharStreamObserver();
const observable = new CharStream().subscribe(observer);

console.dir({observable, observer});