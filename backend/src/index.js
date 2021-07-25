document.addEventListener('DOMContentLoaded', () => {

    characters = [];
    randomcards = [];
    var contadorCharacters = 1;
    var contadorCards = 1;

    async function getCharacters(force = false) {

        if (localStorage.getItem('db') === null || force) {
            do {

                const res = await fetch('https://rickandmortyapi.com/api/character?page='.concat(a));
                const data = await res.json();
                valor = data.results;
                valor.forEach(a => {
                    characters.push(a);
                });
                localStorage.setItem('db', JSON.stringify(characters));
                a++
            }
            while (contadorCharacters < 35);

        } else {

            characters = JSON.parse(localStorage.getItem('db'));
        }
        return characters;
    }

    getCharacters().then((characters) => console.log(characters))

    do {
        aleatoriedade = characters[Math.floor(Math.random() * characters.length)];
        console.log(aleatoriedade)
        randomcards.push(aleatoriedade);
        contadorCards++
    }
    while (contadorCards < 9);
    console.log(randomcards)

    let tpl = '';
    randomcards.forEach(cards => {
        tpl +=
            `<div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${cards.image}" class=" img-fluid ">
            </div>
            <div class="col-md-8 ">
                <div class="card-body ">
                    <h3 class="card-title ">${cards.name}</h3>
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
});