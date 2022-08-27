const router = require('express').Router();
const { Team, User } = require('../../models'); 
const withAuth = require('../../utils/auth');

// GET team by id
router.get('/:id', async (req, res) => {
    
});

// GET team by user
router.get('/:id', (req, res) => {

});

// POST new team
router.post('/', async (req, res) => {
    
});

// PUT update team by id
router.put('/:id', (req, res) => {

});

// DELETE team by id
router.delete('/:id', (req, res) => {

});


module.exports = router;
