import http from "http";
import fs from "fs";
import path from "path";
import {
  getAllItems,
  addItem,
  getItem,
  deleteItem,
  updateItem,
} from "./controllers/ItemControllers.js";
import { getIndex, getOtherHtml } from "./controllers/pageControllers.js";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/index.html" && method === "GET") {
    getIndex(req, res);
  } else if (url.endsWith(".html")) {
    getOtherHtml(req, res);
  } else if (url === "/items" && method === "GET") {
    getAllItems(req, res);
  } else if (url === "/items" && method === "POST") {
    addItem(req, res);
  } else if (url.startsWith("/items") && method === "GET") {
    getItem(req, res, url);
  } else if (url.startsWith("/items") && method === "DELETE") {
    deleteItem(req, res, url);
  } else if (url.startsWith("/items") && method === "PUT") {
    updateItem(req, res, url);
  }
});

server.listen(3000, () => {
  console.log("server is up and running");
});
