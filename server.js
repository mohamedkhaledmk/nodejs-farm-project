//require http module
const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const slugify = require(`slugify`);

const replaceTemplate = require("./modules/replaceTemplate.js");
//top level code(outside call backs are executed only once when the code starts so we put reading file outside the create server function to avoid running it on each request)
//readfile
const read2 = fs.readFileSync(`${__dirname}/data/productsdata.json`, `utf-8`);
const tempOverview = fs.readFileSync(`./templates/overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`./templates/product.html`, "utf-8");
const tempCard = fs.readFileSync(`./templates/cards.html`, "utf-8");

const productData = JSON.parse(read2);

const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// /g means global to replace all repeated ones
//create server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const pathName = pathname;
  //overview
  if (pathName === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    console.log("first", cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    //product page
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    //api page
  } else if (pathName === "/api") {
    // console.log("first:", productData);
    res.writeHead(200, { "content-type": `application/json` });
    res.end(read2);
  } else {
    // status of page 404
    res.writeHead(404, {
      "content-type": `text/html`,
      "my-own-header": `hello-world`,
    });
    //if no match found then send hello message
    res.end(`<h1>Hello from the server !!</h1>`);
  }
});

// listen to server requests
server.listen(
  8000,
  /*optional to give the standard ip for local host*/ `127.0.0.1`,
  () => {
    console.log(`listening on PORT 8000 `);
  }
);
// if not given the standard ip => it would be the same result (default is local host)

//headers are peice of info that we are sending back in our response
//headers must be sent before the res not after

//API ( application programming interface): a service from where we can request data
