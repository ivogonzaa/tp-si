module.exports = (prendas) => {
    let prendasHtml = ""
    prendas.forEach(p => prendasHtml += `
    <div class="card">
        <h2>${p.name}</h2>
        <img src="${p.imgUrl}">
        <span>$${p.price}</span>
        <button>Comprar</button>
    </div>
    `)

    const html = `
    <html>
    <head>
        <navbar>
            <span class="app-title">🔓 sApp</span>
        </navbar>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="navbar.css">
        <link rel="stylesheet" href="data.css">
        <title>sApp! - Data</title>
    </head>
        <body>
            <div id="card-container">
                ${prendasHtml}  
            </div>
            <video autoplay muted loop id="bg-video">
                <source src="background.mp4" type="video/mp4">
            </video>
        </body>
    </html>
    `
    return html;
}