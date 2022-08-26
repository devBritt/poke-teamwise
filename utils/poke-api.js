const axios = require('axios');
// use for generator filters
const _ = require('lodash/intersection');
// list of Pokémon games
const games = require('./poke-games');
// base pokedex URL
const baseDexUrl = 'https://pokeapi.co/api/v2/pokedex/'

// TODO: get list of all Pokémon based on selected game
async function getDexEntries(dexId) {
    const response = await axios.get(baseDexUrl + dexId);

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

getDexEntries(games[games.length - 1].dexId);
// getPokedex(3);
// getPokeDetails('trubbish');
// getPokeByType('fire');
// getPokeByMove('solar-beam');