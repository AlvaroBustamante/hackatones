var http = require('http');
var url = require('url');
var querystring = require('querystring');

let listaCompra = [];

http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;

  if (path === '/crear-lista' && req.method === 'POST') {
    crearLista(req, res);
  } else if (path === '/pendientes' && req.method === 'GET') {
    pendientes(req, res);
  } else if (path === '/completados' && req.method === 'GET') {
    completados(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('No encontrado.');
  }
}).listen(8080);

console.log('Server is listening on port 8080');

function crearLista(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { nombre, descripcion, fecha, esCompletado } = querystring.parse(body);

    const item = {
      nombre,
      descripcion,
      fecha,
      esCompletado: esCompletado === 'true'
    };

    listaCompra.push(item);

    console.log('Nuevo item agregado:', item); // Depuración: Verificar ítem agregado
    console.log('Lista de compra:', listaCompra); // Depuración: Verificar lista actual

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Item agregado exitosamente', item: item }));
  });
}

function pendientes(req, res) {
  const itemsPendientes = listaCompra.filter(item => !item.esCompletado);

  console.log('Items pendientes:', itemsPendientes); // Depuración: Verificar ítems pendientes

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(itemsPendientes));
}

function completados(req, res) {
  const itemsCompletados = listaCompra.filter(item => item.esCompletado);

  console.log('Items completados:', itemsCompletados); // Depuración: Verificar ítems completados

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(itemsCompletados));
}
