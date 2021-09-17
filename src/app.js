/*
Creo que hay que cambiar el modulo "http" por el de "https" 
para lo de la vulnerabilidad
*/

const http = require("http");

const reader = require("./utils/page-reader")

const server = http.createServer((req, res) => {
    if (req.url.match("\.css$")) {
        const cssFileName = req.url.slice(1, -4);
        const css = reader.getCssFromFile(cssFileName);
        res.end(css);
    }
    if (req.url === "/login") {
        const html = reader.getHtmlFromFile("login");
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': html.length });
        res.end(html);
    }
});

server.listen(3000);
console.log("Escuchando localhost:3000");