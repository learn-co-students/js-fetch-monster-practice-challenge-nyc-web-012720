
document.addEventListener("DOMContentLoaded", function () {
    const divCreate = document.getElementById("create-monster");
    const divContainer = document.getElementById("monster-container");
    const form = document.getElementById("monster-form");
    let monstersStorage;
    let monsterCount = -1;
    let count = 50;

    divCreate.innerHTML = `
        <form id="monster-form">
            <input id="name" placeholder="name...">
                <input id="age" placeholder="age...">
                    <input id="description" placeholder="description...">
                        <button>Create</button>
                        </form> `;

    fetch("http://localhost:3000/monsters")
        .then(function (response) {
            return response.json();
        })
        .then(function (monsters) {
            monstersStorage = monsters;
            return selectFiftyMonsters();
        });

    document.addEventListener("submit", function (event) {
        event.preventDefault();
        return newMonster(Array.from(event.target.children));
    });

    document.addEventListener("click", function (event) {
        if (event.target.id === "back") {
            if (count < 101) {
                count = 50;
                monsterCount = -1;
                alert("Aint no monsters here");
            } else if (count > 100) {
                count = count - 50;
                monsterCount = monsterCount - 100;
            }

        } else if (event.target.id === "forward") {
            count > monstersStorage.length ? count = monstersStorage.length - 50 : count += 50;
        }
        return selectFiftyMonsters();
    });

    function displayMonsters(monsters) {
        divContainer.innerHTML = ``;
        return monsters.forEach(function (monster) {
            return divContainer.innerHTML += `
                <div><h2 data-number=${monster.id}>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>Bio: ${monster.description}</p>
                </div>
                `;
        });
    };

    function selectFiftyMonsters() {
        let result = monstersStorage.filter(function (monster) {
            if (monster.id <= count && monster.id > monsterCount) {
                return true;
            }
            return false;
        });
        monsterCount = result[result.length - 1].id;
        return displayMonsters(result);
    }

    function newMonster(inputs) {
        const newMonster = {};
        inputs.forEach(function (input) {
            newMonster[input.id] = input.value;
        });

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newMonster)
        });
        document.forms[0].reset();
    }

});