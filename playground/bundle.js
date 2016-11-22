/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.newSet = __webpack_require__(1);
	window.newList = __webpack_require__(3);
	window.newCache = __webpack_require__(4);

	window.cache = newCache();
	window.cache.insert('t1', 'foo');
	window.cache.insert('t2', 'bar');
	window.cache.insert('t3', 'baz');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const hash = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	// The value 31 was chosen because it is an odd prime.
	// If it were even and the multiplication overflowed,
	// information would be lost, as multiplication by 2
	// is equivalent to shifting.
	const PRIME = 31;

	const hash = variable => {
		if (typeof variable === 'string') {
			return strHash(variable);
		} else if (typeof variable === 'number') {
			return variable;
		} else if (Array.isArray(variable)) {
			return arrHash(variable);
		} else if (variable === null) {
			return 0;
		} else if (variable === undefined) {
			return 1;
		} else if (typeof variable === 'object') {
			return objHash(variable);
		}
	}

	const strHash = str => {
		return str.split('').reduce((hash, char) => {
			return hash * PRIME + char.charCodeAt(0);
		}, 0);
	}

	const arrHash = arr => {
		return arr.reduce((sum, el) => {
			return sum * PRIME + hash(el);
		}, 0);
	}

	const objHash = obj => {
		return Object.keys(obj).sort().reduce((sum, key) => {
			return sum * PRIME + (hash(key) * hash(obj[key]));
		}, 0);
	}

	module.exports = hash;

/***/ },
/* 3 */
/***/ function(module, exports) {

	const node = (val, next = null, prev = null) => {
		const getNext = () => next;
		const setNext = newNext => next = newNext;

		const getPrev = () => prev;
		const setPrev = newPrev => prev = newPrev;

		const getVal = () => val;
		const setVal = newVal => val = newVal;

		return {
			getVal,
			setVal,
			getNext,
			setNext,
			getPrev,
			setPrev
		}
	}

	const list = () => {
		let head = null;
		let tail = null;

		const firstNode = () => head;
		const lastNode = () => tail;

		const prepend = val => {
			head = node(val, head);

			const next = head.getNext();

			if (next !== null) {
				next.setPrev(head);
			} else {
				tail = head;
			}

			return head;
		}

		const append = val => {
			tail = node(val, null, tail);

			const prev = tail.getPrev();

			if (prev !== null) {
				prev.setNext(tail);
			} else {
				head = tail;
			}

			return tail;
		}

		const shift = () => {
			if (head === null) {
				return undefined;
			}

			const val  = head.getVal(),
			      next = head.getNext();

			head = next;

			if (head !== null) {
				head.setPrev(null);
			} else {
				tail = null;
			}

			return val;
		}

		const pop = () => {
			if (tail === null) {
				return undefined;
			}

			const val  = tail.getVal(),
			      prev = tail.getPrev();

			tail = prev;

			if (tail !== null) {
				tail.setNext(null);
			} else {
				head = null;
			}

			return val;
		}

		const forEach = (func, node = head) => {
			if (node === null) { return; }

			func(node.getVal());
			return forEach(func, node.getNext());
		}

		const print = () => {
			let str = "";
			forEach(val => {
				str += `-> ${val} `;
			});

			console.log(str);
		}

		const yank = node => {
			const next = node.getNext(),
			      prev = node.getPrev(),
			      val = node.getVal();

			if (next !== null) {
				next.setPrev(prev);
			} else {
				tail = prev;
			}

			if (prev !== null) {
				prev.setNext(next);
			} else {
				head = next;
			}

			return val;
		}

		return {
			forEach,
			prepend,
			append,
			shift,
			print,
			yank,
			pop
		}
	}

	module.exports = list;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const newList = __webpack_require__(3);

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

/***/ }
/******/ ]);