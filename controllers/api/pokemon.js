const router = require('express').Router();
const {
    pokemonByGame,
    pokemonByMove,
    pokemonByType,
    getAllMoves,
    getAllTypes,
    getPokemonDetails
} = require('../../utils/poke-helpers');
// use for generator filters
const intersection = require('lodash/intersection');

// route to get pokemon list
router.post('/', async (req, res) => {
    const dexRes = await pokemonByGame(req.body.dexId);
    let typeRes;
    let moveRes;

    // check for type and move selections
    if (req.body.type && req.body.move) {
        typeRes = await pokemonByType(req.body.type);
        moveRes = await pokemonByMove(req.body.move);

        const filteredResults = intersection(dexRes, typeRes, moveRes);
        
        res.send(filteredResults);
    } else if (req.body.type) {
        typeRes = await pokemonByType(req.body.type);

        const filteredResults = intersection(dexRes, typeRes);

        res.send(filteredResults);
    } else if (req.body.move) {
        moveRes = await pokemonByMove(req.body.move);

        const filteredResults = intersection(dexRes, moveRes);

        res.send(filteredResults);
    } else {
        res.send(dexRes);
    }
});

// route to get all types
router.post('/types', async (req, res) => {
    console.log('inside /api/types');
    res.send(await getAllTypes());
});

// route to get all moves
router.post('/moves', async (req, res) => {
    res.send(await getAllMoves());
});

// route to get details for a single pokemon
router.post('/:pokemon', async (req, res) => {
    res.send(await getPokemonDetails(req.params.pokemon, req.body.game));
});

module.exports = router;
