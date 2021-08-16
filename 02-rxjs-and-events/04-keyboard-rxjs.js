// watching https://www.youtube.com/watch?v=0kcpMAl-wfE
"use strict";


const {Observable, from} = require('rxjs');
const {filter, map, take, reduce, debounceTime, throttleTime} = require('rxjs/operators');

process.stdin.setRawMode(true);

// keyboard stream
const keyboard = new Observable(subscriber => {
	process.stdin.on('data', (data) => {
		subscriber.next(data)
	});
});

keyboard.subscribe( data => {
	console.log('---');
	console.dir({keyboard: data})
});

// cursors

const arrows = {
	65: "^ (up)",
	66: "v (down)",
	67: "--> (right)",
	68: "<-- (left)",
};

const cursors = keyboard.pipe(
	filter(buffer => (buffer[0] === 27) && (buffer[1] === 91) ),
	map(buffer => buffer[2]),
	map(key => arrows[key]),
	// throttleTime(1000),
	debounceTime(2000)
);

cursors.subscribe(cursor => {
	console.dir({cursor});
});

// keypress

const keypress  = keyboard.pipe(
	map(buffer => buffer[0])
);


keypress.subscribe( key => {
	console.dir({key});
});

// take first 5 chars

const takeFirst = keypress.pipe(
	take(5),
	map(key => String.fromCharCode(key)),
	reduce((accumulator, char) => accumulator + char, "")
);

takeFirst.subscribe( s => {
	console.dir({takeFirst: s})
});

//esc , ctrl + c

keypress
	.pipe(filter(key => key === 3))
	.subscribe(process.exit.bind(null, 0));

//30:23