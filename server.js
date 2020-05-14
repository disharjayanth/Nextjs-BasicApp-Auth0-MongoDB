const express = require('express')
const next = require('next')
const axios = require('axios')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//middleware
const serverAuth = require('./serverAuth')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

const User = require('./models/users')

mongoose.connect(process.env.MONGO_SERV, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to DataBase....')
        console.log(process.env.MONGO_SERV)
    }) .catch((err) => {
        console.log(err)
    })
    
const robotsOptions = {
    root: __dirname + '/static/',
    headers: {
        'Content-type': 'text/plain;charset=UTF-8'
    }
}    

app.prepare()
.then(() => {
    const server = express()
    server.use(bodyParser.json())

    server.get('/robots.txt', (req, res) => {
        return res.status(201).sendFile('robots.txt', robotsOptions)
    })

    server.get('/api/v1/usersall', (req, res) => {
        User.find({}, (err, allUsers) => {
            if(err) {
                return res.status(401).send(err)
            }
            return res.json(allUsers)
        })
    })

    server.get('/api/v1/users', (req, res) => {
        User.find({ name: 'John' }, (err, user) => {
            if(err) {
                return res.status(401).send(err)
            }
            return res.send(user)
        })
    })

    server.patch('/api/v1/users/:id', (req, res) => {
        const userId = req.params.id
        const userData = req.body

        User.findById(userId, (err, user) => {
            if(err) {
                return res.status(401).send(err)
            }
            user.set(userData)
            user.save((err, modUser) => {
                if(err) {
                    return res.status(401).send(err)
                }
                return res.send(modUser)
            })
        })
    })

    server.delete('/api/v1/users/:id', (req, res) => {
        const userId = req.params.id

        User.deleteOne({ _id: userId }, (err, user) => {
            if(err) {
                return res.status(401).send(err)
            }
            return res.json({ status: 'Done!' })
        })
    })

    server.post('/api/v1/users', (req, res) => {
        const userData = req.body
        const user = new User(userData) 
        user.save((err, user) => {
            if(err) {
                return res.status(401).send(err)
            }
            return res.json(user)
        })
    })

    server.get('/api/users', serverAuth.authJWT, (req, res) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            return res.json(response.data)
        })
    })

    server.get('/user/profile/:id', (req, res) => {
        const actualPage = '/users/profile'
        const queryParams = { userId: req.params.id }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send({ error: 'Invalid token...'});
        }
      });

    const PORT = process.env.PORT || 3000

    server.listen(PORT, (err) => {
        if(err) console.log(err)
        console.log(`Ready on PORT ${PORT}`)
    })
})
.catch((err) => {
    console.error(err.stack)
    process.exit(1)
})