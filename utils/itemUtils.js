import http from "http";
import fs from "fs";
import path from "path";

const itemsPath = path.join(process.cwd(), "items.json");
let items = [];

export const addItems = (items) => {
  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), "utf8");
};

export const fetchItems = () => {
  try {
    const result = fs.readFileSync(itemsPath);
    return JSON.parse(result);
  } catch (error) {
    console.error("Error reading items file: ", error);
    return [];
  }
};
