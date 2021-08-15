// watching https://www.youtube.com/watch?v=_bFXuLcXoXg

// watching https://www.youtube.com/watch?v=_bFXuLcXoXg
"use strict";

// renamed variable in merchant way to clarify observer logic


class Seller {  // a.k.a. Observable
	constructor() {
		this.consumers = [];
		this.consumerWishes = [];
		this.name = "0"
	}

	addConsumer(consumer) {          // a.k.a. subscribe
		this.consumers.push(consumer);
		return this;
	}

	addReseller(...extraWishes) {           // a.k.a. pipe
		this.consumerWishes.push(...extraWishes);
		const reseller = new Seller();
		reseller.name = "1";
		this.addConsumer(goodsForSale => reseller.sellGoods(goodsForSale));
		return reseller;
	}

	sellGoods(goodsForSale) {               // a.k.a. notify
		process.stdout.write(`${this.name}`);
		if (this.consumers.length === 0) return;
		for (const wish of this.consumerWishes) {
			if (wish.name === 'sort') {
				if (!wish.fn(goodsForSale)) return;
			}
			if (wish.name === 'change') {
				goodsForSale = wish.fn(goodsForSale);
			}
		}
		for (const consumer of this.consumers) {
			consumer(goodsForSale);
		}
	}
}

const sort = (predicate) => ({name: 'sort', fn: predicate});
const change = (callback) => ({name: 'change', fn: callback});


//usage


const randomGoods = () => {
	return String.fromCharCode(Math.floor((Math.random() * 25) + 97))
};

const seller = new Seller();

const reseller = seller.addReseller(
	sort(goodsForSale => !("aeiou").includes(goodsForSale)),
	change(goodsForSale => goodsForSale.toUpperCase())
);


let count = 0;

const consumer = goodsForSale => {
	process.stdout.write(" "+goodsForSale+" ");
	count++;
	if (count > 15) {
		clearInterval(operationalDay);
		process.stdout.write('\n');
		process.exit(0)

	}
};

// seller.addConsumer(consumer);
reseller.addConsumer(consumer);

const operationalDay = setInterval(() => {
	const goodsForSale = randomGoods();
	seller.sellGoods(goodsForSale);
}, Math.floor(Math.random()*100) );

console.log({consumer});
console.log({seller}, {reseller});


// ORIGINAL CODE
// 'use strict';
//
// class Observable {
// 	constructor() {
// 		this.observers = [];
// 		this.operators = [];
// 	}
//
// 	subscribe(observer) {
// 		this.observers.push(observer);
// 		return this;
// 	}
//
// 	pipe(...args) {
// 		this.operators.push(...args);
// 		const destination = new Observable();
// 		this.subscribe(data => destination.notify(data));
// 		return destination;
// 	}
//
// 	notify(data) {
// 		if (this.observers.length === 0) return;
// 		for (const operator of this.operators) {
// 			if (operator.name === 'filter') {
// 				if (!operator.fn(data)) return;
// 			}
// 			if (operator.name === 'map') {
// 				data = operator.fn(data);
// 			}
// 		}
// 		for (const observer of this.observers) {
// 			observer(data);
// 		}
// 	}
// }
//
// const filter = predicate => ({ name: 'filter', fn: predicate });
// const map = callback => ({ name: 'map', fn: callback });
//
// // Usage
//
// const randomChar = () => String
// 	.fromCharCode(Math.floor((Math.random() * 25) + 97));
//
// const source = new Observable();
//
// const destination = source.pipe(
// 	filter(char => !'aeiou'.includes(char)),
// 	map(char => char.toUpperCase())
// );
//
// let count = 0;
//
// const observer = char => {
// 	process.stdout.write(char);
// 	count++;
// 	if (count > 50) {
// 		process.stdout.write('\n');
// 		process.exit(0);
// 	}
// };
//
// destination.subscribe(observer);
//
// setInterval(() => {
// 	const char = randomChar();
// 	source.notify(char);
// }, 200);
//
// console.dir({ observer, source, destination });