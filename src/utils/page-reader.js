const fs = require("fs");

function getHtmlFromFile(htmlFileName) {
    let html = null;
    try {
        html = fs.readFileSync(`./static/${htmlFileName}.html`);
    } catch (e) {
        console.log(`[ERROR] > ${htmlFileName}.html not found in path "./static/${htmlFileName}.html"`);
    }
    return html;
}

function getResourceFromFile(resourceFileName) {
    let resource = null;
    try {
        resource = fs.readFileSync(`./static/${resourceFileName}`);
    } catch (e) {
        console.log(`[ERROR] > ${resourceFileName} not found in path "./static/${resourceFileName}"`);
    }
    return resource;
}

module.exports = {
    getHtmlFromFile,
    getResourceFromFile
}