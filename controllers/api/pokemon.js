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
router.get('/', async (req, res) => {
    const dexRes = await pokemonByGame(req.body.dexId);
    let typeRes;
    let moveRes;

    // check for type and move selections
    if (req.body.type && req.body.move) {
        typeRes = await pokemonByType(req.body.type);
        moveRes = await pokemonByMove(req.body.move);

        const filteredResults = intersection(dexRes, typeRes, moveRes);

        res.json(filteredResults);
    } else if (req.body.type) {
        typeRes = await pokemonByType(req.body.type);

        const filteredResults = intersection(dexRes, typeRes);

        res.json(filteredResults);
    } else if (req.body.move) {
        moveRes = await pokemonByMove(req.body.move);

        const filteredResults = intersection(dexRes, moveRes);

        res.json(filteredResults);
    } else {
        res.json(dexRes);
    }
});

// route to get all types
router.get('/types', async (req, res) => {
    console.log('inside /api/types');
    res.json(await getAllTypes());
});

// route to get all moves
router.get('/moves', async (req, res) => {
    res.json(await getAllMoves());
});

// route to get details for a single pokemon
router.get('/:pokemon', async (req, res) => {
    res.json(await getPokemonDetails(req.params.pokemon, req.body.game));
});

module.exports = router;
