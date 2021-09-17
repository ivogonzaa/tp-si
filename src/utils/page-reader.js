const fs = require("fs");

function getHtmlFromFile(htmlFileName) {
    let html = null;
    try {
        html = fs.readFileSync(`./static/${htmlFileName}.html`);
    } catch (e) {
        console.log(e);
    }
    return html;
}

function getCssFromFile(cssFileName) {
    let css = null;
    try {
        css = fs.readFileSync(`./static/${cssFileName}.css`);
    } catch (e) {
        console.log(e);
    }
    return css;
}

function getHtmlCssFromFile(fileName) {
    try {
        return {
            html: getHtmlFromFile(fileName),
            css: getCssFromFile(fileName)
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getHtmlFromFile,
    getCssFromFile,
    getHtmlCssFromFile
}