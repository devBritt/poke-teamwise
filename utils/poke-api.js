const axios = require('axios');
// use for generator filters
const intersection = require('lodash/intersection');
// list of Pokémon games
const games = require('./poke-games');
// base pokedex URL
const baseDexUrl = 'https://pokeapi.co/api/v2/pokedex/'

// TODO: get list of Pokémon stats
async function getPokeDetails(pokemon) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);

    console.log(response.data.stats);
}

// get list of all pokemon from chosen game (by pokedex id)
async function getDexEntries(dexId) {
    // array to store pokemon_entries as objects
    const dexArr = [];

    // get dex by game
    const response = await axios.get(baseDexUrl + dexId);

    response.data.pokemon_entries.map(element => {
        dexArr.push(element.pokemon_species.name);
    });

    return dexArr;
}

// request list of all pokemon with chosen type
async function getPokeByType(type) {
    const pokeByTypeArr = [];
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    
    response.data.pokemon.map(element => {
        pokeByTypeArr.push(element.pokemon.name);
    });

    return pokeByTypeArr;
}

// request list of all pokemon that can learn chosen move
async function getPokeByMove(move) {
    // array to store learned_by_pokemon as objects
    const pokeByMoveArr = [];
    
    // get pokemon by move
    const response = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);

    response.data.learned_by_pokemon.map(element => {
        pokeByMoveArr.push(element.name);
    });

    return pokeByMoveArr;
}

// TODO: get Pokémon by type and move
async function getPokeFiltered(dexId, type, move) {
    const dexResponse = await getDexEntries(dexId);
    const typeResponse = await getPokeByType(type);
    const moveResponse = await getPokeByMove(move);

    const filteredResults = intersection(dexResponse, typeResponse, moveResponse);
    console.log(filteredResults);
}

getPokeFiltered(games[games.length - 1].dexId[0], 'dragon', 'iron-tail');
// getDexEntries(games[games.length - 1].dexId[0]);
// console.log(games[games.length - 1].dexId[0]);