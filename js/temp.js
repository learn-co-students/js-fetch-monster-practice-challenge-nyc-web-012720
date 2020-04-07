function deleteMonsters() {
	for (const element of document.querySelector('#monster-container')
		.childNodes) {
		element.remove();
	}
}
