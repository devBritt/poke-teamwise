const axios = require('axios');
// use for generator filters
const intersection = require('lodash/intersection');
// base pokedex URL
const baseDexUrl = 'https://pokeapi.co/api/v2/pokedex/'

const PokeAPI = {
    // POKEMON STATS
    // get pokemon details by name
    getPokeDetails: async (pokemon) => {
        const pokemonDetails = { name: pokemon};
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);

        // get pokemon types
        pokemonDetails.types = await PokeAPI.getPokeTypes(pokemon);
        // get pokemon evolution chain
        pokemonDetails.evolution_chain = await PokeAPI.getPokeEvoChain(response.data);
        // get pokemon flavor text
        pokemonDetails.flavor_text = response.data.flavor_text_entries[
            response.data.flavor_text_entries.length - 1
        ].flavor_text;
        // get pokemon legendary/mythical status
        pokemonDetails.is_legendary = response.data.is_legendary;
        pokemonDetails.is_mythical = response.data.is_mythical;
        // get pokemon's official art
        pokemonDetails.art = await PokeAPI.getPokeArt(pokemon);
        // get pokemon's stats
        pokemonDetails.stats = await PokeAPI.getPokeStats(pokemon);

        return pokemonDetails;
    },

    // get pokemon types
    getPokeTypes: async (pokemon) => {
        const types = [];
        // TODO: Move api call to getPokeDetails and pass in response
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        response.data.types.forEach(type => {
            types.push(type);
        });
        
        return types;
    },
    
    // get pokemon evolution chain
    getPokeEvoChain: async (evoDetails) => {
        const evoChain = [];

        // check for evolutions
        if (evoDetails.evolution_chain) {
            // get evolution chain details
            const response = await axios.get(evoDetails.evolution_chain.url);
            const chain = response.data.chain;

            // add base species
            evoChain.push(chain.species.name);

            // add second and third evolutions with possible differences (wurple -> silcoon -> beautifly OR wurmple -> cascoon -> beautifly)
            for (let i = 0; i < chain.evolves_to.length; i++) {
                const pokemon = chain.evolves_to[i];
                // add second evolution
                evoChain.push(pokemon.species.name);
                // add third evolution
                for (let j = 0; j < pokemon.evolves_to.length; j++) {
                    const pokemon2 = pokemon.evolves_to[j];
                    evoChain.push(pokemon2.species.name);
                }
            };

            return evoChain;
        } else if (evoDetails.evolves_from_species) {
            pokemonDetails.evolution_chain = [evoDetails.name, evoDetails.evolves_from_species.name];
            return evoChain;
        } else {
            evoChain.push(evoDetails.name);
            return evoChain;
        }
    },

    // get pokemon official art
    getPokeArt: async (pokemon) => {
        // TODO: Move api call to getPokeDetails and pass in response
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        const art = {
            official: response.data.sprites.other['official-artwork'].front_default,
            sprite: response.data.sprites.front_default
        };
        
        return art;
    },

    // get pokemon stats
    getPokeStats: async (pokemon) => {
        const stats = {};
        // TODO: Move api call to getPokeDetails and pass in response
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        stats.hp = response.data.stats[0].base_stat;
        stats.attack = response.data.stats[1].base_stat;
        stats.defense = response.data.stats[2].base_stat;
        stats.specAtt = response.data.stats[3].base_stat;
        stats.specDef = response.data.stats[4].base_stat;
        stats.speed = response.data.stats[5].base_stat;

        return stats;
    },

    // POKEMON LISTS
    // get list of all pokemon from chosen game (by pokedex id)
    getDexEntries: async (dexId) => {
        // array to store pokemon_entries as objects
        const dexArr = [];

        // get dex by game
        const response = await axios.get(baseDexUrl + dexId);

        response.data.pokemon_entries.map(element => {
            dexArr.push(element.pokemon_species.name);
        });

        return dexArr;
    },

    // request list of all pokemon with chosen type
    getPokeByType: async (type) => {
        const pokeByTypeArr = [];
        // TODO: Move api call to getPokeDetails and pass in response
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        
        response.data.pokemon.map(element => {
            pokeByTypeArr.push(element.pokemon.name);
        });

        return pokeByTypeArr;
    },

    // request list of all pokemon that can learn chosen move
    getPokeByMove: async (move) => {
        // array to store learned_by_pokemon as objects
        const pokeByMoveArr = [];
        
        // get pokemon by move
        // TODO: Move api call to getPokeDetails and pass in response
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);

        response.data.learned_by_pokemon.map(element => {
            pokeByMoveArr.push(element.name);
        });

        return pokeByMoveArr;
    },

    // filter list of pokemon by chosen options
    getPokeFiltered: async (dexId, type, move) => {
        const dexResponse = await PokeAPI.getDexEntries(dexId);
        let typeResponse;
        let moveResponse;

        // check for type and move requests
        if (type && move) {
            typeResponse = await PokeAPI.getPokeByType(type);
            moveResponse = await PokeAPI.getPokeByMove(move);

            const filteredResults = intersection(dexResponse, typeResponse, moveResponse);
            
            console.log(filteredResults);
            return;
        } else if (type) {
            typeResponse = await PokeAPI.getPokeByType(type);

            const filteredResults = intersection(dexResponse, typeResponse);
            
            console.log(filteredResults);
            return;
        } else if (move) {
            moveResponse = await PokeAPI.getPokeByMove(move);

            const filteredResults = intersection(dexResponse, moveResponse);

            return filteredResults;
        }
    },

    // OTHER LISTS
    // get list of all types
    getAllTypes: async () => {
        // array to store type names
        const typeNames = [];

        const response = await axios.get('https://pokeapi.co/api/v2/type?limit=30');

        response.data.results.map(element => {
            if (element.name !== 'unknown' && element.name !== 'shadow') {
                typeNames.push(element.name);
            }
        });

        return typeNames;
    },
    // get list of all move names
    getAllMoves: async () => {
        // array to store move names
        const moveNames = [];

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
    }
}

module.exports = PokeAPI;
