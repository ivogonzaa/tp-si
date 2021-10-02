const Formatter = require("./data-formatter");
const Sessions = require("./sessions");
const https = require("https")
const { getData } = require("./posts");

const customPages = [
    {
        url: "/",
        callback: (req, res, data) => {
            res.writeHead(302, { location: "https://localhost:3000/login" });
        }
    },
    {
        url: "/data",
        callback: async (req, res, data) => {
            const { username, password } = Formatter.dataToObject(data);
            const authorized = Sessions.loginIsAuthorized(username, password);
            if (authorized) {
                let prendas = await new Promise((rsv, rej) => {
                    https.get("https://localhost:3001", global.options,
                        async r => {
                            const info = await getData(r);
                            rsv(info);
                        })
                })
                prendas = await JSON.parse(prendas);
                return require("../custom-pages/data")(prendas);
            }

            res.writeHead(302, { location: "https://localhost:3000/login" });
            return "";
        }
    }
]

function isCustomPage(url) {
    return customPages.some(p => p.url === url);
}

async function getCustomPageResponse(req, res, data) {
    const page = customPages.find(p => p.url === req.url)
    const response = await page.callback(req, res, data);
    return response;
}

module.exports = {
    isCustomPage,
    getCustomPageResponse
}