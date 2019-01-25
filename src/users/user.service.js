const config = require('../secret.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const clients = require('../clients');
const policies = require('../policies');



module.exports = {
    authenticate,
    getAllPoliciesByName,
    getById,
    getByUsername,
    getUserFromPolicie
};

// Authentication method
async function authenticate(name) {
    const user = clients.clients.find(u => u.name === name );
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            user,
            token
        };
    }
}

// Get user data filtered by user id
async function getById(id) {
    const user = clients.clients.find(u => u.id === id);
    return user;
}

// Get user data filtered by user name
async function getByUsername(name) {
    const user = clients.clients.find(u => u.name === name );
    return user;
}

// Get the list of policies linked to a user name
async function getAllPoliciesByName(name) {
    const user = clients.clients.find(u => u.name === name );
    const policiesList =  policies.policies.find(p => p.clientId === user.id);
    if (!policiesList) return "This user don't have policies";
    return policiesList;
}

//Get the user linked to a policy numbe
async function getUserFromPolicie(policieId) {
    const policie = policies.policies.find(p => p.id === policieId);
    const user = clients.clients.find(u => u.id === policie.clientId );
    return user;
}