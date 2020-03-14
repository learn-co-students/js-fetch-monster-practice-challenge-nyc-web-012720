const monsterContainer = document.getElementById('monster-container')
const formContainer = document.getElementById('create-monster')
const forwardButton = document.getElementById("forward")
const backButton = document.getElementById("back")

document.addEventListener("DOMContentLoaded", function(){
    let page = 20
    fetchAndRenderMonsters(page)
    renderNewMonsterForm()
    activateButtonListeners(page)
})

function fetchAndRenderMonsters(pageNumber){
    monsterContainer.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(resp => resp.json())
    .then(json => json.forEach(monsterInfo => renderMonster(monsterInfo)))
}

function renderMonster(monsterInfoInJson){
    let monsterDiv = document.createElement('div')
    monsterDiv.innerHTML = `
    <h2>${monsterInfoInJson.name}</h2>
    <h4>Age: ${monsterInfoInJson.age}</h4>
    <p>${monsterInfoInJson.description}</p>
    `
    monsterContainer.append(monsterDiv)
}

function renderNewMonsterForm(){
    let newMonsterForm = document.createElement('form')
    newMonsterForm.innerHTML = `
    <input type="text" name="name" placeholder="name">
    <input type="text" name="age" placeholder="age">
    <input type="text" name="description" placeholder="description">
    <input type="submit" value="Create Monster">
    `
    formContainer.append(newMonsterForm)
    activateFormListener(newMonsterForm)
}

function activateFormListener(formElement){
    formElement.addEventListener("submit", function(event){
        event.preventDefault()
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                age: event.target.age.value,
                description: event.target.description.value
            })
        })
    formElement.reset()
    })
}

function activateButtonListeners(page){
    document.addEventListener("click", function(event){
        if (event.target === forwardButton){
            page++
            fetch("http://localhost:3000/monsters")
            .then(resp => resp.json())
            .then(json => {
                if (page > Math.ceil(json.length/50)){
                    page = Math.ceil(json.length/50)
                    alert("aint no monsters here!")
                }
                fetchAndRenderMonsters(page)
            })
        }
        if (event.target === backButton){
            page--
            if (page < 1){
                alert("aint no monsters here!")
                page = 1
            }
            fetchAndRenderMonsters(page)
        }
    })
}