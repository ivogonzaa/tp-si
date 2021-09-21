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

function getCssFromFile(cssFileName) {
    let css = null;
    try {
        css = fs.readFileSync(`./static/${cssFileName}.css`);
    } catch (e) {
        console.log(`[ERROR] > ${cssFileName}.html not found in path "./static/${cssFileName}.html"`);
    }
    return css;
}

module.exports = {
    getHtmlFromFile,
    getCssFromFile
}