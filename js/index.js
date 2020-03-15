document.addEventListener('DOMContentLoaded', () => {
	const forwardButton = document.querySelector('#forward')
	const backButton = document.querySelector('#back')
	let pageIndex = 0

	createMonsterForm()

	document.addEventListener('click', function(event) {
		if (event.target === forwardButton) {
			pageIndex++
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			loadMonsters(pageIndex)
		}

		if (event.target === backButton) {
			pageIndex--
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			deleteMonsters()
			if (pageIndex <= 0) {
				pageIndex = 1
			}

			loadMonsters(pageIndex)
		}
	})

	document
		.querySelector('#new-monster-form')
		.addEventListener('submit', event => {
			event.preventDefault()
			console.log(event.target)

			fetch('http://localhost:3000/monsters', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					name: event.target.name.value,
					age: event.target.age.value,
					description: event.target.description.value
				})
			})
		})
})
function loadMonsters(pageIndex) {
	fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageIndex}`)
		.then(response => response.json())
		.then(result =>
			result.forEach(element => {
				makeMonsterDiv(element)
			})
		)
}

function deleteMonsters() {
	const monsterContainer = document.querySelector('#monster-container')
	monsterContainer.childNodes.forEach(element => {
		element.remove()
	})
}

function makeMonsterDiv(monster) {
	const monsterContainer = document.querySelector('#monster-container')
	const monsterDiv = document.createElement('div')

	monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <h4>${monster.id}</h4>
        <p>${monster.description}</p>`
	monsterContainer.append(monsterDiv)
}

function createMonsterForm() {
	const newForm = document.createElement('form')
	newForm.id = 'new-monster-form'
	newForm.innerHTML = `
          <label>Name:</label>
          <input type="text" name="name" />
          <label>Age:</label>
          <input type="text" name="age" />
          <label>Description:</label>
          <input type="text" name="description" />
          <input type="submit" id="submit"/>`

	document.querySelector('#create-monster').append(newForm)
}
