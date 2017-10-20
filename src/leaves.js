const inputArray = ['#fff', '#904bdb', '#33f04c', '#e3e352', '#eb9c34', '#d94747', '#3751b8']

function attr(attr, value) {
	el.setAttributeNS(null, attr, value)
}
for (var l = 1; l <= 70; l++) {
	var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle') //to create a circle. for rectangle use "rectangle"

	attr('cx', Math.random() * 300 + l * 50 + '%')
	attr('cy', Math.random() * 200 + l * 50 + '%')
	attr('r', (Math.random() + 1) * 20 + '%')
	attr('fill-opacity', '.1')
	attr('fill', inputArray[Math.floor(Math.random() * 6 + 1)])
	attr('stroke', 'none')

	document.getElementById('svg').appendChild(el)
}
