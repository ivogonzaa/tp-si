const Formatter = require("./data-formatter");
const Sessions = require("./sessions");

const customPages = [
    {
        url: "/",
        callback: (req, res, data) => {
            res.writeHead(302, { location: "https://localhost:3000/login" });
        }
    },
    {
        url: "/data",
        callback: (req, res, data) => {
            const { username, password } = Formatter.dataToObject(data);
            const authorized = Sessions.loginIsAuthorized(username, password);
            if (authorized)
                return JSON.stringify(require("../../database/users"))

            res.writeHead(302, { location: "https://localhost:3000/login" });
            return "";
        }
    }
]

function isCustomPage(url) {
    return customPages.some(p => p.url === url);
}

function getCustomPageResponse(req, res, data) {
    const page = customPages.find(p => p.url === req.url)
    const response = page.callback(req, res, data);
    return response;
}

module.exports = {
    isCustomPage,
    getCustomPageResponse
}