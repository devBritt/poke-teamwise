const router = require('express').Router();
const { Team, User, Member } = require('../../models'); 
const withAuth = require('../../utils/auth');

// GET all teams
router.get('/', async (req, res) => {
    Team.findAll({
        attributes: [
            'id',
            'user_id',
            'team_name',
            'game_id'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Member,
                attributes: ['id', 'pokemon_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTeamData => res.json(dbTeamData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET team by id
router.get('/:id', async (req, res) => {
    Team.findAll({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'user_id',
            'team_name',
            'game_id'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Member,
                attributes: ['id', 'pokemon_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTeamData => {
        if (!dbTeamData) {
            console.log('No teams found with that id!');
            res.status(404).json({ message: 'No teams found with that id!'});
            return;
        }

        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// GET team by user
router.get('/by-user/:id', (req, res) => {
    Team.findAll({
        where: {
            user_id: req.params.id
        },
        attributes: [
            'id',
            'user_id',
            'team_name',
            'game_id'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Member,
                attributes: ['id', 'pokemon_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTeamData => {
        if (!dbTeamData) {
            console.log('No teams found for this user!');
            res.status(404).json({ message: 'No teams found for this user!'});
            return;
        }

        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// POST new team
router.post('/', async (req, res) => {
    // expects { user_id: 1, team_name: 'team rocket' }
    Team.create({
        user_id: req.session.user_id,
        team_name: req.body.teamName,
        game_id: req.body.gameId
    }).then((dbTeamData) => {
        res.json(dbTeamData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// PUT update team by id
router.put('/:id', (req, res) => {
    Team.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbTeamData => {
        if (!dbTeamData) {
            console.log('No team found with this id!');
            res.status(404).json({ message: 'No team found with this id!' });
            return;
        }

        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// DELETE team by id
router.delete('/:id', (req, res) => {
    Team.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTeamData => {
        if (!dbTeamData) {
            console.log('No team found with this id!');
            res.status(404).json({ message: 'No team found with this id!' });
            return;
        }

        res.json(dbTeamData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});


module.exports = router;
