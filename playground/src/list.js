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