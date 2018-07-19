module.exports.parse = obj => Object.entries(obj)
	.reduce(
		(accumulator, [key, value]) => [...accumulator, `<strong>${key}</strong>: ${value}`],
		[]
	).join('<br>');
