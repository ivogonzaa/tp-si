function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function getData(req) {
    let data = "";
    let endedStream = false;
    req.on("data", function (text) {
        console.log("[SERVER] > Getting data from request...");
        data += text;
    });
    req.on("end", function (text) {
        endedStream = true;
        if (text) data += text;
        if (!data) return;
        console.log("[SERVER] > Data ended from request.");
        console.log(`[DATA] > ${data}`);
    })
    req.on("error", function (err) {
        console.log(err.message)
    })

    //Wait until data is finally loaded.
    while (!endedStream) {
        await sleep(200);
    }
    return data;
}

module.exports = {
    getData
}