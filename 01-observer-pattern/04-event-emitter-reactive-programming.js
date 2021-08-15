// watching https://www.youtube.com/watch?v=_bFXuLcXoXg
"use strict";

//base classes

const {EventEmitter} = require("events");

const randomChar = () => {
	return String.fromCharCode(Math.floor((Math.random() * 25) + 97))
};

// usage

class CharStream {
	constructor(ee) {
		this.timer = setInterval(() => {
			const char = randomChar();
			ee.emit('char', char)
		}, 10)
	}

	complete() {
		clearInterval(this.timer)
	}
}

const ee = new EventEmitter();
const observable = new CharStream(ee);

let count = 0;

const observer = char => {
	process.stdout.write(char);
	count++;
	if (count > 100) {
		process.stdout.write('\n');
		ee.emit("stop!");
		process.exit(0)
	}
};

ee.on('char', observer);

ee.on("stop!", ()=>{observable.complete; console.log("emission stopped")});

console.dir({observable, observer});