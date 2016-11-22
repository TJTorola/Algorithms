const hash = require('./hashers.js');

const DEFAULT_LENGTH = 20;

const preSet = (length = DEFAULT_LENGTH) => {
	const store = new Array(length).fill(null).map(_ => []);

	const toIdx = val => Math.abs(hash(val) % length);

	const has = val => {
		const idx = toIdx(val);

		for(let i = 0; i < store[idx].length; i++) {
			if (store[idx][i] === val) {
				return true;
			}
		}

		return false;
	}

	const add = val => {
		if (has(val)) { return null; }

		store[toIdx(val)].push(val);
		return val;
	}

	const remove = val => {
		const idx = toIdx(val);

		for(let i = 0; i < store[idx].length; i++) {
			if (store[idx][i] === val) {
				return store[idx].splice(i, 1);
			}
		}

		return null;
	}

	const forEach = func => {
		for(let i = 0; i < length; i++) {
			for(let j = 0; j < store[i].length; j++) {
				func(store[i][j]);
			}
		}
	}

	const print = () => {
		let str = "{ ";

		forEach(val => {
			str += `${ val } `;
		});

		str += "}";
		console.log(str);
	}

	return {
		has,
		add,
		remove,
		forEach,
		length,
		print
	}
}

const set = () => {
	let set = preSet(1),
	    count = 0;

	const reset = length => {
		const oldSet = set;
		set = preSet(length);

		oldSet.forEach(val => set.add(val));
	}

	const double = () => reset(count * 2);
	const halve = () => reset(Math.floor(count / 2));

	const add = val => {
		if (set.add(val) === null) {
			return null;
		}

		count += 1;
		if (count === set.length) {
			double();
		}

		return val;
	}

	const remove = val => {
		if (set.remove(val) === null) {
			return null;
		}

		count -= 1;
		if (count === Math.floor(set.length / 4)) {
			halve();
		}
		return val;
	}

	const has = val => set.has(val);
	const length = () => set.length;
	const forEach = func => set.forEach(func);
	const print = () => set.print();

	return {
		forEach,
		length,
		remove,
		print,
		add,
		has,
	}
}

module.exports = set;