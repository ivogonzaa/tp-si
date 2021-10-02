const https = require("https");
const fs = require("fs");

const reader = require("./utils/page-reader");
const customPages = require("./utils/custom-pages");
const { getData } = require("./utils/posts");

const options = {
    key: fs.readFileSync("./cert/db/key.pem"),
    cert: fs.readFileSync("./cert/db/cert.pem"),
    requestCert: true,
    rejectUnauthorized: false
}

const server = https.createServer(options, async (req, res) => {
    if (req.method != "GET") return;
    console.log(`[DB] GET en ${req.url}`)
    const data = JSON.stringify(require("../database/prendas"));

    res.end(data)
});

server.listen(3001);
console.log("[DB] > Listening localhost:3001");