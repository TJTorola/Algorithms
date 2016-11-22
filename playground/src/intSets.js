const DEFAULT_LENGTH = 20;

const maxSet = max => {
	const store = new Array(max + 1).fill(false);

	return {
		has    : val => store[val],
		add    : val => { store[val] = true },
		remove : val => { store[val] = false }
	}
}

const intSet = (length = DEFAULT_LENGTH) => {
	const store = new Array(length).fill(null).map(_ => []);

	const has = val => {
		const idx = Math.abs(val % length);

		for(let i = 0; i < store[idx].length; i++) {
			if (store[idx][i] === val) {
				return true;
			}
		}

		return false;
	}

	const add = val => {
		if (has(val)) { return null; }
		const idx = Math.abs(val % length);
		store[idx].push(val);

		return val;
	}

	const remove = val => {
		const idx = Math.abs(val % length);

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

const amortizedIntSet = () => {
	let set = intSet(1),
	    count = 0;

	const reset = length => {
		const oldSet = set;
		set = intSet(length);

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

const set = () => {
	
}