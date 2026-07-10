#! /usr/bin/env node
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const SQL = `
DROP TABLE IF EXISTS usernames;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR( 255 ),
  author VARCHAR( 255 ),
  added TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO messages (text, author)
VALUES
  ('Hi there!', 'Amando'),
  ('Hello World!', 'Charles')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost", // or wherever the db is hosted
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
