const range = (min, max, tail = []) => {
	const next = max - 1
	if (next < min) {
		return tail;
	}
	
	return range(min, next, [next, ...tail])
}



const digitalRoot = (num, sum = 0) => {
	if (num === 0) { return sum; }
	return digitalRoot(Math.floor(num / 10), sum + (num % 10));
}

// largest common substring
const lcssBrute = (left, right) => {
	const less = (left.length <= right.length) ? left : right,
	      more = (left.length <= right.length) ? right : left;

	return commonSubstring(less, more, less.length + 1);
}

const commonSubstring = (less, more, range, idx = 0) => {
	if (range === 0) { return null; }

	if (idx + range > less.length) {
		return commonSubstring(less, more, range - 1);
	}

	const substring = less.slice(idx, idx + range);
	if (more.includes(substring)) {
		return substring;
	} else {
		return commonSubstring(less, more, range, idx + 1);
	}
}

const sum = (nums, total = 0) => {
	if (nums.length === 0) {
		return total;
	}

	const [head, ...tail] = nums;
	return sum(tail, total + head);
}

const sumNotOptimized = nums => {
	if (nums.length === 0) {
		return 0;
	}

	const [head, ...tail] = nums;
	return head + sum(tail);
}