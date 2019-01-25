const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('../_helpers/authorize')
const Role = require('../_helpers/role');

// routes
router.post('/authenticate', authenticate);
router.get('/list/:name', authorize(Role.Admin), getAllPoliciesByName);
router.get('/:id', authorize(), getById);
router.get('/name/:name', authorize(), getByUsername);
router.get('/get-user-policie/:id', authorize(Role.Admin), getUserFromPolicie)

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body.name)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getByUsername(req, res, next) {
    userService.getByUsername(req.params.name)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllPoliciesByName(req, res, next) {
    userService.getAllPoliciesByName(req.params.name)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function getUserFromPolicie(req, res, next) {
    userService.getUserFromPolicie(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}