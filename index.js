const fs = require('fs');
const http = require('http');
const url = require('url');


//Server

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end("This is the OVERVIEW");
    } else if (pathName === '/product') {
        res.end("this is the product")
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header' : 'hello-world'
        });
        res.end('<h1> page not found </h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
});












// // Blocking, Synchronous way

// const textIn = fs.readFileSync('/Users/linamierke/Github/nodeJS/complete-node-bootcamp/1-node-farm/starter/txt/input.txt', 'utf-8');
// console.log(textIn);


// // const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;

// // fs.writeFileSync('/Users/linamierke/Github/nodeJS/complete-node-bootcamp/1-node-farm/starter/txt/output.txt', textOut)

// console.log('file written!');

// //Non-blocking, asynchronous way

// fs.readFile('/Users/linamierke/Github/nodeJS/complete-node-bootcamp/1-node-farm/starter/txt/start.txt', 'utf-8', (err, data) => {
//    console.log(data)

// })