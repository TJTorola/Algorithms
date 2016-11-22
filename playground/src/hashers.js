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