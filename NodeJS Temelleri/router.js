var fs = require("fs");


const routerHandler = (req, res) => {
  /*   res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.statusMessage = "OK";
  
    res.write("<h2>Merhaba Dünya</h2>"); */

  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("anasayfa.html", (err, data) => {
      res.write(data);
      res.end();
    });
  } else if (req.url == "/blogs") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("blogs.html", (err, data) => {
      res.write(data);
      res.end();
    });
  } else if (req.url == "/create.html" && req.method == "POST") {
    const data = [];

    req.on("data", (chunk) => {
      data.append(chunk);
    });
    req.on("end", () => {
      const result = Buffer.concat(data).toString();
      const parsedData = result.split("=")[1];
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.appendFile("blogs.txt", parsedData, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        }
      });
    });
  } else if (req.url == "/create") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("create.html", (err, data) => {
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.readFile("404.html", (err, data) => {
      res.write(data);
      res.end();
    });
  }
};
module.exports = routerHandler