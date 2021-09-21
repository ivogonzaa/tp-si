module.exports.dataToObject = (data) => {
    const dataObj = {};
    let prevStr = ""
    let currStr = "";
    for (const c of data) {
        if (c === "&") {
            dataObj[prevStr] = currStr;
            currStr = "";
            continue;
        }
        if (c === "=") {
            dataObj[currStr] = "";
            prevStr = currStr;
            currStr = "";
            continue;
        }
        currStr += c;
    }
    dataObj[prevStr] = currStr;

    return dataObj;
}