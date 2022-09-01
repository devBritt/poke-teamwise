const router = require('express').Router();
const { Team, Member, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET members by team_id
router.get('/by-team/:id', (req, res) => {
    Member.findAll({
        where: {
            team_id: req.params.id
        },
        attributes: ['id', 'team_id', 'pokemon_name'],
        include: [
            {
                model: Team,
                attributes: ['id', 'user_id', 'team_name'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbMemberData => {
        if (!dbMemberData) {
            console.log('No team found with this id!');
            res.status(404).json({ message: 'No team found with this id!'});
            return;
        }

        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// GET member by id
router.get('/:id', (req, res) => {
    Member.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'team_id', 'pokemon_name'],
        include: [
            {
                model: Team,
                attributes: ['id', 'user_id', 'team_name'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbMemberData => {
        if (!dbMemberData) {
            console.log('No member found with this id!');
            res.status(404).json({ message: 'No member found with this id!'});
            return;
        }

        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// POST new member
router.post('/', withAuth, (req, res) => {
    // expects { team_id: 1, pokemon_name: 'goodra' }
    Member.create({
        team_id: req.body.teamId,
        pokemon_name: req.body.memberName
    })
    .then(dbMemberData => res.json(dbMemberData))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// PUT update member by id
router.put('/:id', withAuth, (req, res) => {
    Member.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbMemberData => {
        if (!dbMemberData) {
            console.log('No member found with that id!');
            res.status(404).json({ message: 'No member found with that id!' });
            return;
        }

        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});

// DELETE member by id
router.delete('/:id', withAuth, (req, res) => {
    Member.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbMemberData => {
        if (!dbMemberData) {
            console.log('No member found with that id!');
            res.status(404).json({ message: 'No member found with that id!' });
            return;
        }

        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: err });
    });
});


module.exports = router;

