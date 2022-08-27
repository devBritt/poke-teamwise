const router = require("express").Router();
const { User, Favorites, Team, Member } = require("../../models");

//route to find all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"]},
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    })
});

//route to find a single user by id
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"]},
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Favorites,
                attributes: ['id', 'pokemon_name']
            },
            {
                model: Team,
                attributes: ['id', 'team_name'],
                include: {
                    model: Member,
                    attributes: ['pokemon_name']
                }
            }
        ]
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({message: "There was no user found with this id!"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
});

//route to create new user
router.post("/", (req, res) => {
    //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUserData) => {
        req.session.loggedIn = true;
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            
            res.json(dbUserData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to log in user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbUserData) => {
        if (!dbUserData) {
            res
            .status(404)
            .json({ message: "There was no user found with that email address!" });
            return;
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(404).json({ message: "Incorrect password!" });
            return;
        }
        
        req.session.loggedIn = true;
        
        req.session.save(() => {
            (req.session.user_id = dbUserData.id),
            (req.session.username = dbUserData.username);
            
            res.json({ user: dbUserData, message: "You are now logged in! " });
        });
    });
});

//route to log user out
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//route to update a single user
router.put("/:id", (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "There was no user found with this id!"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to delete single user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res
            .status(404)
            .json({ message: "There was no user found with this id!" });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
