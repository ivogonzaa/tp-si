const users = require("../../database/users");
const Sessions = {};

Sessions.loginIsAuthorized = (user, pass) => {
    return users.some(u => u.username === user && u.password === pass);
}

module.exports = Sessions;