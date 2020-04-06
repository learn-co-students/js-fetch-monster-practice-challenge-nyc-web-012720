console.log("Movie Theater Style")
let page = 1

document.addEventListener("DOMContentLoaded", function() {
    fetchMonsters(page)
    addMonster()
    pageButton(page)
})

function fetchMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(json => renderMonsters(json))
}

function renderMonsters(json) {
    let monsterContainer = document.getElementById('monster-container')
    json.forEach(monster =>{
        const monsterDiv = document.createElement('div')
        monsterDiv.innerHTML = `
        <h2>ID: ${monster.id}</h2>
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>`
        monsterContainer.appendChild(monsterDiv)
    });
}

function addMonster() {
    const createContainer = document.getElementById('create-monster')
    const newMonsterForm = document.createElement('form')
    newMonsterForm.className = "new-monster"
    newMonsterForm.innerHTML = `
    <input type="text" name="name" placeholder="Monster Name"/> 
    <input type="number" name="age" placeholder="Monster Age"/> 
    <input type="textarea" name="description" placeholder="Monster Bio"/> 
    <input type="submit" value="Add Monster"/>`
    createContainer.appendChild(newMonsterForm)

    newMonsterForm.addEventListener('submit', function(event){
        event.preventDefault()
        
        let userInput = document.getElementsByClassName('new-monster')[0]
        fetch('http://localhost:3000/monsters',
        {
            method: "POST",
            headers: 
                {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify(
                {
                "name": `${userInput[0].value}`,
                "age" : `${userInput[1].value}`,
                "description": `${userInput[2].value}`
                }
            )
        })
        newMonsterForm.reset()
    })
}

function pageButton(page) {
    const backPage = document.getElementById("back")
    const forwardPage = document.getElementById("forward")
    let monsterContainer = document.getElementById('monster-container')

    backPage.addEventListener('click', function(event) {
        page--
        monsterContainer.innerHTML = ""
        fetchMonsters(page)
    })
    forwardPage.addEventListener('click', function (event) {
        page++
        monsterContainer.innerHTML = ""
        fetchMonsters(page)
    })
}