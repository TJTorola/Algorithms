const newList = require('./list.js');

const cache = (size = 3) => {
	const map = {},
	      list = newList();

	let count = 0;

	const eject = () => {
		while (count > size) {
			delete map[list.pop()];
			count -= 1;
		}
	};

	const insert = (key, val) => {
		if (map[key]) {
			list.yank(map[key].node);
			count -= 1;
		}

		map[key] = {
			node: list.prepend(key),
			val
		};
		count += 1;

		eject();
		return val;
	};

	const find = key => {
		if (!map[key]) {
			return undefined;
		}

		const { node, val } = map[key];
		list.yank(node);
		map[key] = {
			node: list.prepend(key),
			val
		};

		return val;
	};

	const forEach = func => {
		list.forEach(key => {
			const val = map[key].val;
			func(val);
		});
	};

	const print = () => {
		console.log(`CAPACITY : ${size}`);
		console.log(`TAKEN    : ${count}`);
		console.log('');

		list.forEach(key => {
			console.log(`${key}: ${map[key].val}`);
		});
	};

	return {
		forEach,
		insert,
		print,
		find
	};
}

module.exports = cache;