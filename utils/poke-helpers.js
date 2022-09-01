const axios = require('axios');
const gamesList = require('./poke-games');

// functions to retrieve pokemon lists
// get a list of pokemon by game
async function pokemonByGame(dexId) {
    // array to store pokemon_entries as objects
    const dexArr = [];

    try {
        // get dex by game
        const response = await axios.get(`https://pokeapi.co/api/v2/pokedex/${dexId}`);

        response.data.pokemon_entries.map(element => {
            dexArr.push(element.pokemon_species.name);
        });
        
        return dexArr;
    } catch(err) {
        console.log(err);
        return;
    };
}

// get a list of pokemon by type
async function pokemonByType(type) {
    const pokemonArr = [];
    
    try {
        // get pokemon by type
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    
        response.data.pokemon.map(element => {
            pokemonArr.push(element.pokemon.name);
        });

        return pokemonArr;
    } catch(err) {
        console.log(err);
        return;
    };
}

// get a list of pokemon by move
async function pokemonByMove(move) {
    // array to store learned_by_pokemon as objects
    const pokemonArr = [];
        
    try {
        // get pokemon by move
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${move.toLowerCase()}`);

        response.data.learned_by_pokemon.map(element => {
            pokemonArr.push(element.name);
        });

        return pokemonArr;
    } catch(err) {
        console.log(err);
        return;
    };
}

// other list functions
// get a list of all types
async function getAllTypes() {
    // array to store type names
    const typeNames = [];

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type?limit=30');
    
        response.data.results.map(element => {
            if (element.name !== 'unknown' && element.name !== 'shadow') {
                typeNames.push(element.name);
            }
        });
    
        return typeNames;
    } catch(err) {
        console.log(err);
        return;
    };
}

// get a list of all moves
async function getAllMoves() {
    // array to store move names
    const moveNames = [];

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/move?limit=1000');
    
        response.data.results.map(element => {
            moveNames.push(element.name);
        });
    
        moveNames.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
    
        return moveNames;
    } catch(err) {
        console.log(err);
        return;
    };
}

// get pokemon details
async function getPokemonDetails(pokemon, gameId, memberNum) {
    const pokemonDetails = {
        name: pokemon,
        memberNum: memberNum
    };
    try {
        // request details from PokeAPI pokemon endpoint
        const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        // request details from PokeAPI pokemon-species endpoint
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
    
        // get pokedex number
        pokemonDetails.dexNum = await getPokemonDexNum(speciesRes.data, Number.parseInt(gameId));
        
        // get pokemon types
        pokemonDetails.types = getPokemonTypes(pokemonRes.data.types);

        // get evolution chain
        // check for evolutions
        if (speciesRes.data.evolution_chain) {
            const evoChainRes = await axios.get(speciesRes.data.evolution_chain.url);
            const chain = evoChainRes.data.chain;
    
            pokemonDetails.evolution_chain = await getEvoChain(chain);
        } 
        // check if pokemon has a base species
        else if (speciesRes.data.evolves_from_species) {
            pokemonDetails.evolution_chain = [
                speciesRes.data.name,
                speciesRes.data.evolves_from_species
            ];
        }
        // otherwise, only include requested pokemon
        else {
            pokemonDetails.evolution_chain = pokemon;
        }

        // get pokemon legendary/mythical status
        pokemonDetails.is_legendary = speciesRes.data.is_legendary;
        pokemonDetails.is_mythical = speciesRes.data.is_mythical;

        // get pokemon's art URLs
        pokemonDetails.art = getArtURLs(pokemonRes.data.sprites);

        // get pokemon's base stats
        pokemonDetails.stats = getStats(pokemonRes.data.stats);
        console.log(pokemonDetails);
        return pokemonDetails;
    } catch(err) {
        console.log(err);
        return;
    };
}

// helper functions DO NOT EXPORT
// get a pokemon's pokedex number from api response
async function getPokemonDexNum(speciesData, gameId) {
    const gameObj = gamesList.find(game => {
        let found = false;
        
        game.dexId.map(dexId => {
            if (dexId === gameId) {
                found = true;
            }
        });
        
        return found;
    });
    
    try {
        
        const promises = gameObj.dexId.map(async dex => {
            const dexRes = axios.get(`https://pokeapi.co/api/v2/pokedex/${dex}`);
            return dexRes;
        });
            
        const dexRes = await Promise.all(promises);

        return await getDexNum(dexRes, speciesData);
    } catch(err) {
        console.log(err);
    }
}

// get a pokemon's type(s) from api response
function getPokemonTypes(typesData) {
    const types = [];

    typesData.forEach(type => {
        types.push(type.type.name);
    });

    return types;
}

// get a pokemon's evolution chain from api response
async function getEvoChain(chain) {
    const evoChain = [];

    // get art url for first evo
    const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
    
    // add base species
    evoChain.push({
        name: chain.species.name,
        art_url: await pokemonRes.data.sprites.other['official-artwork'].front_default
    });

    // add second and third evolutions, including different evolutions (wurmple -> silcoon -> beautifly OR wurmple -> cascoon -> dustox)
    for (let i = 0; i < chain.evolves_to.length; i++) {
        const evo1 = chain.evolves_to[i];
        // get art url for second evo
        const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo1.species.name}`);
        // add second evolution
        evoChain.push({
            name: evo1.species.name,
            art_url: await pokemonRes.data.sprites.other['official-artwork'].front_default
        });
        // add third evolution
        for (let j = 0; j < evo1.evolves_to.length; j++) {
            const evo2 = evo1.evolves_to[j];
            // get art url for second evo
            const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo2.species.name}`);
            // add second evolution
            evoChain.push({
                name: evo2.species.name,
                art_url: await pokemonRes.data.sprites.other['official-artwork'].front_default
            });
        }
    }

    return evoChain;
}

// get a pokemon's sprite and official artwork urls from api response
function getArtURLs(sprites) {
    const art = {
        official: sprites.other['official-artwork'].front_default,
        sprite: sprites.front_default
    };
    
    return art;
}

// get a pokemon's base stats from api response
function getStats(stats) {
    const statsArr = {
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        specAtt: stats[3].base_stat,
        specDef: stats[4].base_stat,
        speed: stats[5].base_stat
    };

    return statsArr;
}

// get a pokemon's pokedex number based on the chosen game
function getDexNum(dexRes, pokemonData) {
    const dexEntries = [];
    dexRes.map(dex => {
        dexEntries.push(...dex.data.pokemon_entries);
    });

    for (let i = 0; i < dexEntries.length; i++) {
        if (dexEntries[i].pokemon_species.name === pokemonData.name) {
            return dexEntries[i].entry_number;
        }
    }
}

module.exports = {
    pokemonByGame,
    pokemonByMove,
    pokemonByType,
    getAllMoves,
    getAllTypes,
    getPokemonDetails
};
