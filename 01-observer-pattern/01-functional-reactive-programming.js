// watching https://www.youtube.com/watch?v=_bFXuLcXoXg

"use strict";

const randomChar = () => String.fromCharCode(Math.floor((Math.random() * 25) + 97));

const subscribe = (observer) => {
	const observable = {observer};
	setInterval(() => {
		const char = randomChar();
		observer(char);
	}, 15);
	return observable
};

// // other emit example from https://nodejs.org/api/events.html#events_events
// const EventEmitter = require('events');
//
// class MyEmitter extends EventEmitter {}
//
// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
// 	console.log('an event occurred!');
// });
// myEmitter.emit('event');

let count = 0;

const observer = char => {
	process.stdout.write(char);
	count++;
	if (count > 100) {
		process.stdout.write('\n');
		process.exit(0)
	}
};

// // on processes from https://nodejs.org/api/process.html#process_process
// process.on('exit', (code) => {
// 	console.log('Process exit event with code: ', code);
// });

const observable = subscribe(observer);

console.dir({observable, observer});