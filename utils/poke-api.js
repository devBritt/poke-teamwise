const axios = require('axios');

// TODO: get list of all games
async function getGames() {
    const response = await axios.get(`https://pokeapi.co/api/v2/version/`);

    // response.data.results.map(element => {
    //     console.log(element.name);
    // });

    console.log(response.data);
}

// TODO: get list of all Pokémon based on selected game
async function getPokedex(gameId) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${gameId}`);

    console.log(response.data);
}

// TODO: get list of Pokémon stats
async function getPokeDetails(pokemon) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);

    console.log(response.data.stats);
}

// TODO: get Pokémon by type
async function getPokeByType(type) {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

    console.log(response.data.pokemon);
}

// TODO: get Pokémon by move
async function getPokeByMove(move) {
    const response = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);

    console.log(response.data.learned_by_pokemon);
}

// TODO: get Pokémon by type and move
async function getPokeFiltered(game, type, move) {
    const games = await getPokedex();
    const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const moveResponse = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);


}

getGames();
// getPokedex(3);
// getPokeDetails('trubbish');
// getPokeByType('fire');
// getPokeByMove('solar-beam');