const body = document.querySelector('body')
const back = document.getElementById('back')
const forward = document.getElementById('forward')
const monsterContainer = document.getElementById('monster-container')
const form = document.createElement('form')
const createButton = document.createElement('button')
let currentPage = 0
let amountOfPages;
let pageNumber = document.createElement('h5')
let inputName = document.createElement('input')
let inputAge = document.createElement('input')
let inputDesc = document.createElement('input')
pageNumber.innerText = `Page: ${currentPage + 1}`
body.append(pageNumber)

function makeFetchGet(monsterBuilder){
    return fetch('http://localhost:3000/monsters')
    .then(response => response.json())
    .then(data => {
        pageTurner(monsterBuilder, data)
    })
}

function makeFetchPost(monsterData) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            Accept: 'application/json'
        }, 
        body: JSON.stringify(monsterData)
    })
    .then(response => response.json())
    .then(data => {
        return data 
    })    
}

function monsterBuilder(monster){
    let monsterDiv = document.createElement('div')
    let monsterName = document.createElement('h2')
    let monsterAge = document.createElement('h5')
    let monsterDescription = document.createElement('p')
    monsterDiv.className = "monster-profile"
    monsterName.innerText = monster.name 
    monsterAge.innerText = monster.age 
    monsterDescription.innerText = monster.description
    monsterContainer.append(monsterDiv)
    monsterDiv.append(monsterName, monsterAge, monsterDescription)
    return monsterDiv
}

function pageTurner(builder, data){
    amountOfPages = data.length / 10
    for (let i=currentPage*10; i<(currentPage*10)+10; i++){
        if (data[i]) {
            builder(data[i])
        }
    }
}

function formBuild() {
    form.append(inputName, inputAge, inputDesc, createButton)
    inputName.placeholder = 'Name...'
    inputAge.placeholder = 'Age...'
    inputDesc.placeholder = 'Description...'
    createButton.innerText = 'Create'
    monsterContainer.prepend(form)
}

document.addEventListener('DOMContentLoaded', function(event) {
    makeFetchGet(monsterBuilder)
    formBuild()
})

createButton.addEventListener('click', function(event) {
    let monsterDetails = {
        name: inputName.value,
        age: inputAge.value,
        description: inputDesc.value
    }
    makeFetchPost(monsterDetails)
})

back.addEventListener('click', function(event) {
    currentPage = currentPage - 1
    if (currentPage < 0) {
        alert("Ain't No Monsters Here")
        currentPage++
    } else {
        monsterContainer.innerText = ""
        makeFetchGet(monsterBuilder)
    }
})

forward.addEventListener('click', function(event) {
    currentPage = currentPage + 1
    if (currentPage > amountOfPages){
        alert("Ain't no monsters here")
        currentPage--
    } else {
        monsterContainer.innerText = ""
        makeFetchGet(monsterBuilder)
    }
    pageNumber.innerText = `Page: ${currentPage + 1}`
})

