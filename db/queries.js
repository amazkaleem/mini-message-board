import { pool } from "./pool.js";

export async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

export async function getMessageDetails(messageText) {
  const { rows } = await pool.query(
    "SELECT text, author, added FROM messages WHERE text = ($1)",
    [messageText],
  );
  return rows;
}

export async function insertMessage(messageText, authorName) {
  await pool.query(
    "INSERT INTO messages (text, author) VALUES ($1, $2)",
    [messageText, authorName],
  );
}
