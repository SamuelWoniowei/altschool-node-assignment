import fs from "fs";
import path from "path";
import { fetchItems, addItems } from "../utils/itemUtils.js";

//get all items
export const getAllItems = (req, res) => {
  const items = fetchItems();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(items));
};

//get one item
export const getItem = (req, res, url) => {
  const id = parseInt(url.split("/")[2]);
  const items = fetchItems();
  const item = items.find((item) => item.id === id);
  if (item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Item not found" }));
  }
};

// add new item
export const addItem = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const formData = new URLSearchParams(body);
    const newItem = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      size: formData.get("size"),
    };

    if (!newItem.name || typeof newItem.name !== "string") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item name" }));
      return;
    }

    if (typeof newItem.price !== "number" || newItem.price < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item price" }));
      return;
    }

    const validSizes = ["s", "m", "l"];
    if (!newItem.size || !validSizes.includes(newItem.size)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item size" }));
      return;
    }

    const items = fetchItems();
    newItem.id = items.length + 1;
    items.push(newItem);
    addItems(items);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  });
};

//update Item
export const updateItem = (req, res, url) => {
  const id = parseInt(url.split("/")[2]);
  let items = fetchItems();
  let itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Item not found" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const formData = new URLSearchParams(body);

    const updateData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      size: formData.get("size"),
    };

    if (!updateData.name || typeof updateData.name !== "string") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item name" }));
      return;
    }

    if (typeof updateData.price !== "number" || updateData.price < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item price" }));
      return;
    }

    const validSizes = ["s", "m", "l"];
    if (!updateData.size || !validSizes.includes(updateData.size)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid item size" }));
      return;
    }

    console.log(itemIndex);

    items[itemIndex].name = updateData.name;
    items[itemIndex].price = updateData.price;

    addItems(items);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  });
};

//delete Item
export const deleteItem = (req, res, url) => {
  const id = parseInt(url.split("/")[2]);
  const items = fetchItems();

  const item = items.find((item) => item.id === id);

  if (item) {
    const filteredItems = items.filter((item) => item.id !== id);
    addItems(filteredItems);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Item deleted successfully" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `Item with ID ${id} not found.` }));
  }
};
