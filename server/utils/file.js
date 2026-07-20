// this file conatins utility functions for reading and writing tasks to a JSON file

import fs from "fs/promises";
import path from "path";

const filePath = path.join(__dirname, "../data/tasks.json");

async function getTasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function saveTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { getTasks, saveTasks };