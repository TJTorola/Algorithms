const range = (min, max, tail = []) => {
	const next = max - 1
	if (next < min) {
		return tail;
	}

	return range(min, next, [next, ...tail])
}

const all = (arr, func) => {
	const [head, ...tail] = arr;

	if (!func(head)) { return false; }
	if (tail.length === 0) { return true; }

	return all(tail, func);
}

const any = (arr, func) => {
	const [head, ...tail] = arr;

	if (func(head)) { return true; }
	if (tail.length === 0) { return false; }

	return any(tail, func);
}

const fibsIt = n => {
	let fibs = [];

	let len, last, nextLast;
	for (let i = 0; i < n; i++) {
		if (i <= 1) {
			fibs.push(i);
		} else {
			len = fibs.length;
			last = fibs[len - 1];
			nextLast = fibs[len - 2];

			fibs.push(last + nextLast);
		}
	}

	return fibs;
}

const fibsRec = n => {
	if (n < 0) { return undefined; }
	if (n === 0) { return []; }
	if (n === 1) { return [0]; }
	if (n === 2) { return [0, 1]; }

	const seq      = fibsRec(n - 1),
	      last     = seq[seq.length - 1],
	      nextLast = seq[seq.length - 2];

	return [...seq, last + nextLast];
}

const fibs = (n, i = 1, seq = [0, 1]) => {
	if (n < 0) { return undefined; }
	if (n === 0) { return []; }
	if (n === 1) { return [0]; }
	
	if (n === seq.length) {
		return seq;
	}

	const next = seq[i] + seq[i - 1];
	return fibs(n, i + 1, [...seq, next]);
}

const fib = (n, i = 3, twoOff = 0, oneOff = 1) => {
	if (n <= 0) { return undefined; }
	if (n === 1) { return 0; }
	if (n === 2) { return 1; }

	const next = oneOff + twoOff;

	if (i === n) { return next; }
	return fib(n, i + 1, oneOff, next);
}

const palindrome = str => {
	const halve = Math.floor(str.length / 2);
	return all(range(0, halve), idx => {
		return str[idx] === str[str.length - idx - 1];
	});
}

const validRange = range => {
	const int = parseInt(range);

	if (Number.isNaN(int)) {
		return false;
	} else if (0 > int || int > 255) {
		return false;
	}

	return true;
}

const invalidRange = range => {
	return !validRange(range);
}

const validIp = ip => {
	if (ip.length > 15) { return false; }
	const secs = ip.split('.');

	if (secs.length !== 4) { return false; }
	if (any(secs, invalidRange)) { return false; }

	return true;
}