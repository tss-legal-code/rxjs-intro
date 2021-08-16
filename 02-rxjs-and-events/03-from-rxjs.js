// watching https://www.youtube.com/watch?v=0kcpMAl-wfE
"use strict";

const {from} = require('rxjs');
const {filter,map, max} = require('rxjs/operators');

const source = from([1,2,3,5,6,7,89,900,0,0,2]);

const destination = source.pipe(
	filter(x => x % 2 === 0),
	map(x => x**2),
	max(),
);

source.subscribe(x => console.dir({x}));

destination.subscribe(res => console.dir({res}));

console.dir({source, destination});

