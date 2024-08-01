const http = require("http");
const fs = require("fs");
var requests = require("requests");
const { listen } = require("../app");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replacedata = (tempval, orginalval) => {
  let temperature = tempval.replace("{%tempval%}", orginalval.main.temp);
  temperature = temperature.replace("{%tempcity%}", orginalval.name);
  temperature = temperature.replace("{%tempcountry%}", orginalval.sys.country);
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=9769b4424fd6da836ec9c6f9e4d787ec"
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrdata = [objdata];
        // console.log(arrdata[0].main.temp);
        const realtimeData = arrdata
          .map((val) => replacedata(homeFile, val))
          .join("");
        // console.log(val.main);

        res.write(realtimeData);

        // console.log(realtimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
        // console.log("end");
      });
  }
});

server.listen(3000, "127.0.0.1");
