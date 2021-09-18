const https = require("https");
const fs = require("fs");

const reader = require("./utils/page-reader")

const options = {
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem"),
    requestCert: true,
    rejectUnauthorized: false
}

const server = https.createServer(options, (req, res) => {
    //Css
    if (req.url.match("\.css$")) {
        const cssFileName = req.url.slice(1, -4);
        const css = reader.getCssFromFile(cssFileName);
        res.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': css.length });
        res.end(css);
        return;
    }
    //Urls
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
console.log("Escuchando localhost:3000");