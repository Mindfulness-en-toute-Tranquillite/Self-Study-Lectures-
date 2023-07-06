import { createServer } from 'http' ;

const server = createServer((req, res) => {
    res.writeHead(200, { 'Constent-Type': 'text/plain' });
    res.write('Hello node.js');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
}); 