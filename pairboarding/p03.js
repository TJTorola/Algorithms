const alpha = 'abcdefghijklmnopqrstuvwxyz';

const foldingCypher = str => {
	return str.split('').map(char => {
		const idx = alpha.indexOf(char);
		if (idx < 13) {
			return alpha[25 - idx];
		} else {
			return alpha[-idx + 25];
		}
	}).join('');
}