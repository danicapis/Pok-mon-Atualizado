// app.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Roteamento de URL
  if (req.url === '/' || req.url === '/index.html') {
    // Lê o arquivo HTML
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/css/style.css') {
    // Lê o arquivo CSS
    fs.readFile(path.join(__dirname, 'css', 'style.css'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (req.url === '/script.js') {
    // Lê o arquivo JavaScript
    fs.readFile(path.join(__dirname, 'script.js'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/assets/')) {
    // Serve arquivos no diretório assets (imagens)
    const assetPath = path.join(__dirname, req.url);
    const assetStream = fs.createReadStream(assetPath);

    assetStream.on('open', () => {
      res.setHeader('Content-Type', 'image/*');
      assetStream.pipe(res);
    });

    assetStream.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  } else {
    // Página não encontrada
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Porta 8081
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
