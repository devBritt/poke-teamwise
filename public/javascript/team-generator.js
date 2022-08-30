const memberTiles = document.querySelectorAll('.roster-slot');

async function formEventHandler(event) {
    event.preventDefault();

    // get game, type, move input from elements
    const game = document.querySelector('#game-select').selectedOptions[0].value;
    const type = document.querySelector('#type-select').selectedOptions[0].value;
    const move = document.querySelector('#move-select').selectedOptions[0].value;

    // get filtered results
    const pokemonList = await getPokemonList(game, type, move);

    // get n random pokemon from list
    // TODO: update 6 to be based on unlocked pokemon count
    const randomPicks = getRandomPokemon(pokemonList, 6);

    // update member tiles
    // TODO: implement fillTileDetails()
}   

// async function rosterEventHandler(event) {
//     event.preventDefault();

//     // check event target member-lock or member-tile click
//     if (event.target.classList.includes('lock-icon')) {
//         console.log('lock icon clicked');
//     } else if (event.target.classList.includes('member-tile')) {
//         console.log('member tile clicked');
//     }
// }

// function to lock/unlock member
function toggleMemberLock(element) {

}

// function to get member details
async function getDetails(pokemon) {
    
}

// function to display member details
async function displayDetails(pokemon, element) {

}

// function to add details to member tiles
async function fillTileDetails(pokeArr, elements) {

}

// function to retrieve pokemon list
async function getPokemonList(game, type, move) {
    const response = await fetch('/api/pokemon', {
        method: 'POST',
        body: JSON.stringify({
            dexId: game,
            type: type,
            move: move
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    return response.json();
}

// function to pick random pokemon
function getRandomPokemon(pokemonList, num) {
    const randomPicks = [];
    const pokeArr = Array.from(pokemonList);
    console.log(pokeArr);

    for (let i = 0; i < num; i++) {
        // get random index number
        const randomIndex = Math.floor(Math.random() * (pokeArr.length - 1));

        // add pokemon at random index to randomPicks array
        randomPicks.push(pokeArr[randomIndex]);

        // remove used pokemon from array
        pokeArr.splice(randomIndex, 1);
    }

    return randomPicks;
}

// function to create team
async function buildTeam(game, type, move) {

}

// function to retreive current team members
function getMembers() {

}

// function to save to Team table
async function saveTeam() {

}

document.querySelector('#generator-form').addEventListener('submit', formEventHandler);
// memberTiles.forEach(element => {
//     element.addEventListener('click', rosterEventHandler);
// });