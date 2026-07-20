import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/tasks.json");

export async function getTasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function saveTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}