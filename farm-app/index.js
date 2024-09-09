const { json } = require("express");
const fs = require("fs");

const http = require("http");
const { type } = require("os");

// let op = fs.readFileSync("txt/append.txt", "utf-8");

// const txtout = `my name is saurav saha ${op}`;
// fs.writeFileSync("./txt/output.txt", txtout);

// console.log("file system");

// fs.readFile("./txt/test.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// console.log("my name is kittu");

// non blocking asynchronous code------------------
/*
fs.readFile("./txt/append.txt", "utf-8", (err, data1) => {
  // if (err) return console.log("error");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile("./txt/output.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/hit.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("your file has been written");
      });
    });
  });
});
*/
// server
const replceTemplate = function (temp, data) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, data.productName);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%FROM%}/g, data.from);
  output = output.replace(/{%NUTRIENTSNAME%}/g, data.nutrients);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%ID%}/g, data.id);
  if (!data.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const templateCard = fs.readFileSync("./template/template-card.html", "utf-8");
const templateOverview = fs.readFileSync(
  "./template/template-overview.html",
  "utf-8"
);
const templateProduct = fs.readFileSync(
  "./template/template-product.html",
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const createserveR = http.createServer((req, res) => {
  let path = req.url;
  // over-view page
  if (path === "/" || path === "/home") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardHtml = dataObj
      .map((el) => replceTemplate(templateCard, el))
      .join("");
    // console.log(cardHtml);
    const replaceTemplate = templateOverview.replace(
      /{%PRODUCT_CARDS%}/g,
      cardHtml
    );
    res.end(replaceTemplate);
  }

  //this is product page
  else if (path === "/product") {
    res.end("this is product page");
  }
  //api page
  else if (path === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
  // not found page
  else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>this page can't be found</h1>");
  }
});

createserveR.listen("3000", "127.0.0.1", () => {
  console.log("server listen 80000");
});
