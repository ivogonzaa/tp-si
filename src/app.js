const https = require("https");
const fs = require("fs");

const reader = require("./utils/page-reader");
const customPages = require("./utils/custom-pages");
const { getData } = require("./utils/posts");

const options = {
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem"),
    requestCert: true,
    rejectUnauthorized: false
}

const server = https.createServer(options, async (req, res) => {
    console.log(`[REQUEST] > ${req.url}`);

    //Posts' data
    const data = await getData(req);

    //Resource
    if (req.url.match("\/.+\.(mp4|css)")) {
        const resourceFileName = req.url.slice(1);
        const resource = reader.getResourceFromFile(resourceFileName);
        res.end(resource);
        return;
    }
    //Urls
    if (customPages.isCustomPage(req.url)) {
        res.end(customPages.getCustomPageResponse(req, res, data));
        return;
    }

    const htmlFileName = req.url.slice(1);
    const html = reader.getHtmlFromFile(htmlFileName);
    if (html && req.url.match("(\/\w*)+")) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': html.length });
        res.end(html);
        return;
    }
    //Error
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("<h1>Page not found!</h1>");
});

server.listen(3000);
console.log("[SERVER] > Listening localhost:3000");