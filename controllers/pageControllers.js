import fs from "fs";
import path from "path";

//show index page
export const getIndex = (req, res) => {
  fs.readFile(path.join(process.cwd(), "index.html"), "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Index page unavailable");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

//show response for {random} html page
export const getOtherHtml = (req, res) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
};
