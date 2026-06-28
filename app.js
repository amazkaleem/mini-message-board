import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import messagesRoute from "./routes/messagesRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use("/", messagesRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is listening at port number ${port}`);
});
