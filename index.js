const fs = require("fs");
const http = require("http");
const url = require("url");

//Server
const replaceTemplate = (temp, product) => {
    let output = temp.replace('{%PRODUCTNAME%}', product.productName);
    output = output.replace('{%IMAGE%}', product.image);
    output = output.replace('{%PRICE%}', product.price);
    output = output.replace('{%FROM%}', product.from);
    output = output.replace('{%NUTRIENTS%}', product.nutrients);
    output = output.replace('{%QUANTITY%}', product.quantity);
    output = output.replace('{%DESCRIPTION%}', product.description);
    output = output.replace('{%ID%}', product.id);

    if (!product.organic)
        output = output.replace('{%NOT_ORGANIC%}', "not-organic");
    return output;
};
const tempProduct = fs.readFileSync(
    "1-node-farm/starter/templates/template-product.html",
    "utf-8"
);
const tempCard = fs.readFileSync(
    "1-node-farm/starter/templates/template-card.html",
    "utf-8"
);
const tempOverview = fs.readFileSync(
    "1-node-farm/starter/templates/template-overview.html",
    "utf-8"
);

const data = fs.readFileSync("1-node-farm/starter/dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const {query, pathname } = url.parse(req.url, true);

    //Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });

        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        // console.log(cardsHtml);
        res.end(output);

        //Product page
    } else if (pathname === "/product") {
        console.log(query);
        res.end("This is the product");

        //Api page
    } else if (pathname === "/api") {
        // fs.readFile('1-node-farm/starter/dev-data/data.json', "utf-8", (err, data) => {
        //     const productData = JSON.parse(data);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);

        //Not found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h1> page not found </h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("listening on port 8000");
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
