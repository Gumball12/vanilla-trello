require('http').createServer((req, res) => res.end('hello!')).listen(8080, () => console.log('now listen'));