console.log("Inicio de la aplicacion");
var http = require('http');
const axios = require('axios');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(req.url)
    var q = url.parse(req.url, true).query;
    console.log(q.sol);
    console.log(q.pathname);
    const sol = q.sol;
    if (sol) {
        try {
            const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
                params: {
                    sol: sol,
                    api_key: 'DEMO_KEY' 
                }
            });
            res.write(JSON.stringify(response.data));
        } catch (error) {
            console.log("Hubo un error en la aplicacion")
                console.log(error);
            }
    } else {
        res.write(JSON.stringify({ data: "se requiere el parametro" }));
        res.end();
    }
    res.end();
}).listen(8080);
//http://localhost:8080/?sol=1000