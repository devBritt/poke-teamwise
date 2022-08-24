const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const app = express ();
const port = 3001;

app.use(session({secret:'Keep it secret'
,name:'uniqueSessionID'
,saveUninitialized: false}))

app.get ('/', (req, res) => {
    if(req.session.loggedIn)
    res.redirect('/dashboard')
    else res.sendFile('homepage.html', {root:path.join(__dirname, 'public')})
})

app.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.setHeader('Content-Type', 'text/html')
        res.write ('Welcome ' + req.session.username+' to your dashboard')
        res.write('<a href="/logout">Logout</a>')
        res.end ()
    }
    else res.redirect('/login')
})

app.get ('/login', (req, res) => {
    res.sendFile('login.html',{root:path.join(__dirname,'public')})
})

app.post('/authenticate'
,bodyParser.urlencoded()
,(req,res,next) => {
    if (req.body.username == 'foo'&&req.body.password=='bar') 
    {
        res.locals.username = req.body.username
        next ()
    }
    else res.sendStatus (401)
    }
    , (req, res) => {
        req.session.destroy((err) => {})
        res.send ('Thank you!')
    })

app.listen(port, () => {console.log('Website is running')})