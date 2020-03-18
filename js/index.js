document.addEventListener("DOMContentLoaded", () => {
    let pageNum = 1;

    const nextTen = document.querySelector('#forward');
    const lastTen = document.querySelector('#back');
    const monsters = document.querySelector('#monster-container');

    // FORM //
    const div = document.querySelector('#create-monster');
    const form = document.createElement('form');
    const inputName = document.createElement("input");
    inputName.setAttribute("name", "name");
    inputName.setAttribute("placeholder", "Name");
    const inputAge = document.createElement('input');
    inputAge.setAttribute("name", "age");
    inputAge.setAttribute("placeholder", "Age");
    const inputDesc = document.createElement('input');
    inputDesc.setAttribute("name", "description");
    inputDesc.setAttribute("placeholder", "Description");
    const monsterBtn = document.createElement('button');
    monsterBtn.setAttribute("type", "submit");
    monsterBtn.setAttribute("id", "submit");
    monsterBtn.innerHTML = "Create Monster";
    div.appendChild(form);
    form.appendChild(inputName);
    form.appendChild(inputAge);
    form.appendChild(inputDesc);
    form.appendChild(monsterBtn);

    // GET 
    const getMonsters = (pageNum) => {
        fetch(`http://localhost:3000/monsters?_limit=10&_page=${pageNum}`)
            .then(res => res.json())
            .then(json => {
                json.forEach(monster => {
                    renderMonster(monster);
                })
            })
            .catch(err => console.log(err.message));
    }

    const renderMonster = (monster) => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerText = monster.name;
        const h4 = document.createElement('h4');
        h4.innerText = `Age: ${monster.age}`;
        const p = document.createElement('p');
        p.innerText = `Bio: ${monster.description}`
        monsters.appendChild(div);
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(p);
    };

    const postMonster = (name, age, desc) => {
        fetch()
            .then()
            .then()
            .catch()
    };

    monsterBtn.onsubmit = () => {

    }

    nextTen.onclick = () => {
        pageNum++;
        monsters.innerHTML = ""
        getMonsters(pageNum)
    }

    lastTen.onclick = () => {
        if (pageNum > 1){
            pageNum--
            monsters.innerHTML = ""
            getMonsters(pageNum);
        } else {
            alert("No Monsters here!")
        }
    }

    getMonsters(pageNum);
});