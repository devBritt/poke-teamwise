const axios = require('axios');
const { filter } = require('lodash');
// use for generator filters
const intersection = require('lodash/intersection');
// list of Pokémon games
const games = require('./poke-games');
// base pokedex URL
const baseDexUrl = 'https://pokeapi.co/api/v2/pokedex/'

// get pokemon stats by name
async function getPokeDetails(pokemon) {
    const stats = {};
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    
    stats.hp = response.data.stats[0].base_stat;
    stats.attack = response.data.stats[1].base_stat;
    stats.defense = response.data.stats[2].base_stat;
    stats.special_att = response.data.stats[3].base_stat;
    stats.special_def = response.data.stats[4].base_stat;
    stats.speed = response.data.stats[5].base_stat;
    console.log(stats);
}

// POKEMON LISTS
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

// filter list of pokemon by chosen options
async function getPokeFiltered(dexId, type, move) {
    const dexResponse = await getDexEntries(dexId);
    let typeResponse;
    let moveResponse;

    // check for type and move requests
    if (type && move) {
        typeResponse = await getPokeByType(type);
        moveResponse = await getPokeByMove(move);

        const filteredResults = intersection(dexResponse, typeResponse, moveResponse);
        
        console.log(filteredResults);
        return;
    } else if (type) {
        typeResponse = await getPokeByType(type);

        const filteredResults = intersection(dexResponse, typeResponse);
        
        console.log(filteredResults);
        return;
    } else if (move) {
        moveResponse = await getPokeByMove(move);

        const filteredResults = intersection(dexResponse, moveResponse);

        console.log(filteredResults);
        return;
    }
}

// OTHER LISTS
// get list of all move names
async function getAllMoves() {
    // array to store move names
    const moveNames = [];

    const response = await axios.get('https://pokeapi.co/api/v2/move?limit=1000');

    response.data.results.map(element => {
        moveNames.push(element.name);
    });

    return moveNames;
}

// get list of moves by type
async function getMovesByType(type) {
    // array to store move names
    const moveNames = [];

    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

    response.data.moves.map(element => {
        moveNames.push(element.name);
    });

    return moveNames;
}

// get list of all types
async function getAllTypes() {
    // array to store type names
    const typeNames = [];

    const response = await axios.get('https://pokeapi.co/api/v2/type?limit=30');

    response.data.results.map(element => {
        typeNames.push(element.name);
    });

    console.log(typeNames);
}
