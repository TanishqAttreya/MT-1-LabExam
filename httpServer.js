const http = require('http');
const fs = require('fs');
const path = require('path');

let vehicles = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Vehicle Management Web Application</h1>');
    } 
    else if (req.method === 'GET' && req.url === '/vehicles') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(vehicles));
    } 
    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h2>About: Vehicle Management Application v1.0</h2><p>Maintains vehicle records.</p>');
    } 
    else if (req.method === 'GET' && req.url === '/info') {
        const filePath = path.join(__dirname, 'public', 'info.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error: Could not read file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    else if (req.method === 'POST' && req.url === '/add-vehicle') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                const { id, vehicleName, vehicleNumber, type, price } = parsedBody;
                
                if (!id || !vehicleName || !vehicleNumber || !type || !price) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Missing required fields' }));
                }
                
                vehicles.push({ id, vehicleName, vehicleNumber, type, price });
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Vehicle added successfully', vehicle: parsedBody }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});