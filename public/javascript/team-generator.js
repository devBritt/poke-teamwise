// random number generator
const memberTiles = document.querySelectorAll('.roster-slot');

async function formEventHandler(event) {
    event.preventDefault();
}

async function rosterEventHandler(event) {
    event.preventDefault();

    // check event target member-lock or member-tile click
    if (event.target.classList.includes('lock-icon')) {
        console.log('lock icon clicked');
    } else if (event.target.classList.includes('member-tile')) {
        console.log('member tile clicked');
    }
}

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

}

// function to pick random pokemon
async function getRandomPokemon(pokeArr) {

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
memberTiles.forEach(element => {
    element.addEventListener('click', rosterEventHandler);
});