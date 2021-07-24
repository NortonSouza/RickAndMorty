characters = [];

async function getCharacters(force = false) {

    if (localStorage.getItem('db') === null || JSON.parse(localStorage.getItem('counter')) > 9 || force) {

        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        characters = data.results;

        localStorage.setItem('db', JSON.stringify(characters));
        localStorage.setItem('counter', 0);

    } else {
        characters = JSON.parse(localStorage.getItem('db'));
        let counter = JSON.parse(localStorage.getItem('counter'));
        localStorage.setItem('counter', counter + 1);
    }
    return characters;
}

getCharacters().then((characters) => console.log(characters))

let tpl = '';
characters.forEach(cards => {
    tpl +=
        `<div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${cards.image}" class=" img-fluid rounded-start ">
            </div>
            <div class="col-md-8 ">
                <div class="card-body ">
                    <h2 class="card-title ">${cards.name}</h2>
                    <span>${cards.status} - ${cards.species}</span>
                    <h5>Last known location:</h5>
                    <span>${cards.location.name}</span>
                    <h5>First seen in:</h5>
                    <span>${cards.origin.name}</span>
                </div>
            </div>
        </div>
    </div>`
});
document.getElementById('cards').innerHTML = tpl;